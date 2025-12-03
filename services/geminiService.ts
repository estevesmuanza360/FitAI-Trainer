import { UserProfile, WorkoutPlan } from "../types";

export const generateWorkoutPlan = async (user: UserProfile): Promise<WorkoutPlan | null> => {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const goalTitle = {
    weight_loss: 'Perda de Peso Acelerada',
    muscle_gain: 'Hipertrofia Máxima',
    endurance: 'Resistência Atlética',
    maintenance: 'Manutenção e Saúde'
  }[user.goal];

  const isWeightLoss = user.goal === 'weight_loss';

  // Define specific exercises based on goal
  const getDailyExercises = (dayIndex: number) => {
    // Logic for Weight Loss (HIIT, Cardio, Metabolic)
    if (isWeightLoss) {
        if (dayIndex % 2 === 0) { // Active Days (HIIT/Circuit)
            return [
                {
                    name: "Polichinelos",
                    sets: 4,
                    reps: "45 seg",
                    rest: 30,
                    notes: "Mantenha o ritmo acelerado para elevar a frequência cardíaca."
                },
                {
                    name: "Burpees Adaptados",
                    sets: 3,
                    reps: "12-15",
                    rest: 45,
                    notes: "Explosão na subida, controle na descida."
                },
                {
                    name: "Agachamento com Salto",
                    sets: 3,
                    reps: "15",
                    rest: 45,
                    notes: "Amorteça a queda suavemente."
                },
                {
                    name: "Mountain Climbers",
                    sets: 3,
                    reps: "30 seg",
                    rest: 30,
                    notes: "Contraia o abdômen e traga os joelhos ao peito."
                },
                {
                    name: "Prancha Abdominal",
                    sets: 3,
                    reps: "40 seg",
                    rest: 30,
                    notes: "Corpo alinhado, não deixe o quadril cair."
                }
            ];
        } else { // Cardio Days
            return [
                {
                    name: "Caminhada Rápida / Trote",
                    sets: 1,
                    reps: "30-40 min",
                    rest: 0,
                    notes: "Mantenha uma intensidade onde fica difícil conversar."
                },
                {
                    name: "Abdominal Infra",
                    sets: 3,
                    reps: "15",
                    rest: 45,
                    notes: "Controle as pernas na descida."
                },
                {
                    name: "Alongamento Dinâmico",
                    sets: 1,
                    reps: "10 min",
                    rest: 0,
                    notes: "Foque em mobilidade de quadril e ombros."
                }
            ];
        }
    } 
    
    // Logic for Muscle Gain / General (Strength focused)
    else {
        if (dayIndex % 2 === 0) {
            return [
                {
                  name: "Agachamento Livre",
                  sets: 4,
                  reps: "8-12",
                  rest: 90,
                  notes: "Foque na amplitude máxima do movimento."
                },
                {
                  name: "Flexão de Braço",
                  sets: 4,
                  reps: "10-12",
                  rest: 60,
                  notes: "Cotovelos próximos ao corpo."
                },
                {
                  name: "Afundo Estático",
                  sets: 3,
                  reps: "12 cada",
                  rest: 60,
                  notes: "Mantenha o tronco ereto."
                },
                {
                    name: "Abdominal Supra",
                    sets: 3,
                    reps: "15",
                    rest: 45,
                    notes: "Contraia bem o abdômen ao subir."
                }
            ];
        } else {
             return [
                {
                    name: "Cardio Leve",
                    sets: 1,
                    reps: "20 min",
                    rest: 0,
                    notes: "Recuperação ativa."
                },
                {
                    name: "Alongamento Geral",
                    sets: 1,
                    reps: "15 min",
                    rest: 0,
                    notes: "Relaxe a musculatura."
                }
            ];
        }
    }
  };

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    explanation: isWeightLoss 
        ? `Plano focado em queima de gordura e aceleração metabólica. Alternamos treinos de alta intensidade (HIIT) com cardio moderado para otimizar o déficit calórico.`
        : `Este plano foi elaborado focando em ${goalTitle?.toLowerCase() || 'seus objetivos'}, considerando seu nível ${user.experienceLevel === 'beginner' ? 'iniciante' : user.experienceLevel === 'intermediate' ? 'intermediário' : 'avançado'}.`,
    days: Array.from({ length: 7 }).map((_, i) => ({
      day: i + 1,
      title: `Dia ${i + 1}: ${isWeightLoss ? (i % 2 === 0 ? 'Queima Calórica (HIIT)' : 'Cardio & Core') : (i % 2 === 0 ? 'Treino de Força' : 'Recuperação Ativa')}`,
      focus: isWeightLoss ? 'Perda de Gordura' : (i % 2 === 0 ? 'Força' : 'Mobilidade'),
      estimatedDuration: user.availableTime,
      caloriesBurn: isWeightLoss ? (i % 2 === 0 ? 550 : 350) : (i % 2 === 0 ? 300 : 150),
      exercises: getDailyExercises(i)
    })),
  };
};

export const generateNutritionTips = async (user: UserProfile): Promise<any> => {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const isWeightLoss = user.goal === 'weight_loss';

    // Basic calculation simulation
    const baseCalories = user.gender === 'male' ? 2000 : 1600;
    const goalModifier = isWeightLoss ? -400 : user.goal === 'muscle_gain' ? 400 : 0;
    const targetCalories = baseCalories + goalModifier;

    // Weight Loss Specific Meals
    const weightLossMeals = [
        {
            name: "Café da Manhã Low Carb",
            suggestion: "Omelete de 2 ovos com espinafre e queijo branco + Café preto sem açúcar",
            calories: 250
        },
        {
            name: "Almoço Leve",
            suggestion: "150g de peito de frango grelhado + Salada de folhas verdes à vontade + 1 colher de azeite",
            calories: 350
        },
        {
            name: "Lanche da Tarde",
            suggestion: "Iogurte natural desnatado com 5 morangos",
            calories: 120
        },
        {
            name: "Jantar Detox",
            suggestion: "Filé de tilápia assado + Abobrinha refogada + Salada de tomate",
            calories: 280
        }
    ];

    // Standard/Gain Specific Meals
    const standardMeals = [
        {
            name: "Café da Manhã Energético",
            suggestion: "Pão integral com ovos mexidos e uma fruta",
            calories: 400
        },
        {
            name: "Almoço Completo",
            suggestion: "Arroz integral, feijão, carne magra e legumes cozidos",
            calories: 600
        },
        {
            name: "Lanche Pré-Treino",
            suggestion: "Banana com aveia e mel",
            calories: 250
        },
        {
            name: "Jantar Recuperativo",
            suggestion: "Batata doce, frango desfiado e brócolis",
            calories: 450
        }
    ];

    return {
        dailyCalories: targetCalories,
        macros: {
            protein: isWeightLoss ? Math.round(user.weight * 2.2) : Math.round(user.weight * 1.8), // Higher protein for weight loss to keep muscle
            carbs: isWeightLoss ? Math.round(targetCalories * 0.3 / 4) : Math.round(targetCalories * 0.5 / 4), // Lower carb for weight loss
            fat: Math.round(targetCalories * 0.3 / 9)
        },
        meals: isWeightLoss ? weightLossMeals : standardMeals
    };
}