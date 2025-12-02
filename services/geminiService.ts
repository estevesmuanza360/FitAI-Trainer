import { UserProfile, WorkoutPlan } from "../types";

export const generateWorkoutPlan = async (user: UserProfile): Promise<WorkoutPlan | null> => {
  // Generate workout plan based on user rules
  await new Promise((resolve) => setTimeout(resolve, 800)); // Minimal delay for UX

  const goalTitle = {
    weight_loss: 'Perda de Peso',
    muscle_gain: 'Hipertrofia',
    endurance: 'Resistência',
    maintenance: 'Manutenção'
  }[user.goal];

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    explanation: `Este plano foi elaborado focando em ${goalTitle?.toLowerCase() || 'seus objetivos'}, considerando seu nível ${user.experienceLevel === 'beginner' ? 'iniciante' : user.experienceLevel === 'intermediate' ? 'intermediário' : 'avançado'} e equipamentos disponíveis. A consistência é a chave para o sucesso.`,
    days: Array.from({ length: 7 }).map((_, i) => ({
      day: i + 1,
      title: `Dia ${i + 1}: ${i % 2 === 0 ? 'Treino Principal' : 'Recuperação Ativa / Cardio'}`,
      focus: i % 2 === 0 ? (user.goal === 'muscle_gain' ? 'Força' : 'Metabólico') : 'Mobilidade',
      estimatedDuration: user.availableTime,
      caloriesBurn: user.goal === 'weight_loss' ? 400 : 300,
      exercises: [
        {
          name: i % 2 === 0 ? "Agachamento Livre" : "Caminhada Rápida",
          sets: 3,
          reps: i % 2 === 0 ? "12" : "20 min",
          rest: 60,
          notes: "Mantenha o ritmo constante e a respiração controlada."
        },
        {
          name: i % 2 === 0 ? "Flexão de Braço" : "Alongamento Geral",
          sets: 3,
          reps: i % 2 === 0 ? "10-12" : "10 min",
          rest: 45,
          notes: "Foque na técnica e amplitude do movimento."
        },
        {
            name: "Abdominal Supra",
            sets: 3,
            reps: "15",
            rest: 30,
            notes: "Contraia bem o abdômen ao subir."
        }
      ]
    })),
  };
};

export const generateNutritionTips = async (user: UserProfile): Promise<any> => {
    // Generate nutrition plan
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic calculation simulation
    const baseCalories = user.gender === 'male' ? 2000 : 1600;
    const goalModifier = user.goal === 'weight_loss' ? -300 : user.goal === 'muscle_gain' ? 500 : 0;
    const targetCalories = baseCalories + goalModifier;

    return {
        dailyCalories: targetCalories,
        macros: {
            protein: Math.round(user.weight * 2), // ~2g per kg
            carbs: Math.round(targetCalories * 0.4 / 4),
            fat: Math.round(targetCalories * 0.3 / 9)
        },
        meals: [
            {
                name: "Café da Manhã Energético",
                suggestion: "Ovos mexidos com espinafre e torrada integral",
                calories: Math.round(targetCalories * 0.25)
            },
            {
                name: "Almoço Equilibrado",
                suggestion: "Peito de frango grelhado, arroz integral e brócolis",
                calories: Math.round(targetCalories * 0.35)
            },
            {
                name: "Jantar Leve",
                suggestion: "Filé de peixe assado com mix de legumes",
                calories: Math.round(targetCalories * 0.25)
            }
        ]
    };
}