import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, WorkoutPlan } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

const workoutSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    explanation: { type: Type.STRING },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          title: { type: Type.STRING },
          focus: { type: Type.STRING },
          estimatedDuration: { type: Type.INTEGER },
          caloriesBurn: { type: Type.INTEGER },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sets: { type: Type.INTEGER },
                reps: { type: Type.STRING },
                rest: { type: Type.INTEGER },
                notes: { type: Type.STRING },
              },
              required: ["name", "sets", "reps", "rest"],
            },
          },
        },
        required: ["day", "title", "focus", "exercises", "estimatedDuration", "caloriesBurn"],
      },
    },
  },
  required: ["days", "explanation"],
};

export const generateWorkoutPlan = async (user: UserProfile): Promise<WorkoutPlan | null> => {
  try {
    const prompt = `
      Crie um plano de treino de 7 dias personalizado para o seguinte usuário:
      - Idade: ${user.age}
      - Peso: ${user.weight}kg
      - Altura: ${user.height}cm
      - Objetivo: ${user.goal}
      - Experiência: ${user.experienceLevel}
      - Local: ${user.location}
      - Equipamento: ${user.equipment.join(', ') || 'Nenhum'}
      - Tempo disponível: ${user.availableTime} minutos por dia.

      Retorne APENAS um objeto JSON seguindo estritamente o esquema fornecido.
      O plano deve ser equilibrado, incluir dias de descanso se necessário (como exercícios leves ou alongamento).
      
      Campo 'explanation': Inclua um parágrafo motivacional curto explicando a estratégia usada para montar este treino específico para o perfil dele.
      
      As descrições e títulos devem ser em Português.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: workoutSchema,
        temperature: 0.7,
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        explanation: data.explanation || "Seu plano personalizado para atingir seus objetivos.",
        days: data.days,
      };
    }
    return null;
  } catch (error) {
    console.error("Erro ao gerar treino:", error);
    throw error;
  }
};

export const generateNutritionTips = async (user: UserProfile): Promise<any> => {
    // Simplified schema for nutrition
    const nutritionSchema: Schema = {
        type: Type.OBJECT,
        properties: {
            dailyCalories: { type: Type.INTEGER },
            macros: {
                type: Type.OBJECT,
                properties: {
                    protein: { type: Type.INTEGER },
                    carbs: { type: Type.INTEGER },
                    fat: { type: Type.INTEGER }
                }
            },
            meals: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        suggestion: { type: Type.STRING },
                        calories: { type: Type.INTEGER }
                    }
                }
            }
        }
    };

    const prompt = `Gere metas de macronutrientes e 3 sugestões de refeições para um usuário com objetivo ${user.goal}, peso ${user.weight}kg. Responda em Português.`;

    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: nutritionSchema
            }
        });
        return response.text ? JSON.parse(response.text) : null;
    } catch (e) {
        console.error(e);
        return null;
    }
}