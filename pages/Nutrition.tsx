import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateNutritionTips } from '../services/geminiService';
import { Plus, Droplets, Utensils } from 'lucide-react';
import { SubscriptionGate } from '../components/SubscriptionGate';

export const Nutrition = () => {
  const { user, waterIntake, addWater } = useApp();
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNutrition = async () => {
        if (user && !nutritionData) {
            const data = await generateNutritionTips(user);
            setNutritionData(data);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };
    fetchNutrition();
  }, [user]);

  return (
    <SubscriptionGate>
    <div className="min-h-screen p-6 pb-24 overflow-y-auto no-scrollbar bg-primary">
      <h1 className="text-2xl font-bold mb-6">Nutrição & Hidratação</h1>

      {/* Water Tracker */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-blue-400">
                    <Droplets size={24} />
                    <span className="font-bold">Hidratação</span>
                </div>
                <div className="text-2xl font-bold text-white">{waterIntake} / 2500 ml</div>
            </div>
            
            <div className="h-4 bg-slate-800 rounded-full overflow-hidden mb-6">
                <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${Math.min((waterIntake / 2500) * 100, 100)}%` }}
                ></div>
            </div>

            <button 
                onClick={addWater}
                className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
            >
                <Plus size={20} /> Beber Água (+250ml)
            </button>
          </div>
      </div>

      {/* Macros */}
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Utensils size={20} className="text-accent" /> Metas Diárias
      </h2>
      
      {loading ? (
          <div className="text-center p-8 text-slate-400 animate-pulse">Carregando sugestões...</div>
      ) : nutritionData ? (
          <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                  <div className="bg-secondary p-3 rounded-xl border border-slate-700 text-center">
                      <div className="text-xs text-slate-400 mb-1">Proteína</div>
                      <div className="font-bold text-accent">{nutritionData.macros?.protein || 150}g</div>
                  </div>
                  <div className="bg-secondary p-3 rounded-xl border border-slate-700 text-center">
                      <div className="text-xs text-slate-400 mb-1">Carboidrato</div>
                      <div className="font-bold text-accent">{nutritionData.macros?.carbs || 200}g</div>
                  </div>
                  <div className="bg-secondary p-3 rounded-xl border border-slate-700 text-center">
                      <div className="text-xs text-slate-400 mb-1">Gordura</div>
                      <div className="font-bold text-accent">{nutritionData.macros?.fat || 60}g</div>
                  </div>
              </div>

              <div className="space-y-3">
                  <h3 className="font-bold text-slate-300">Sugestões de Refeições</h3>
                  {nutritionData.meals?.map((meal: any, idx: number) => (
                      <div key={idx} className="bg-secondary p-4 rounded-xl border border-slate-700">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-bold text-white">{meal.name || `Refeição ${idx+1}`}</div>
                            <div className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">{meal.calories} kcal</div>
                          </div>
                          <p className="text-sm text-slate-400">{meal.suggestion}</p>
                      </div>
                  ))}
              </div>
          </div>
      ) : (
          <div className="text-slate-400">Não foi possível carregar os dados.</div>
      )}
    </div>
    </SubscriptionGate>
  );
};