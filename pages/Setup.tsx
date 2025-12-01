import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ChevronRight, Check } from 'lucide-react';
import { UserProfile } from '../types';

export const Setup = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    goal: 'weight_loss',
    experienceLevel: 'beginner',
    location: 'home',
    equipment: [],
    gender: 'male',
    age: 25,
    height: 170,
    weight: 70,
    availableTime: 45
  });

  const handleNext = () => {
    if (step < 5) {
      setStep(s => s + 1);
    } else {
      updateUser({ ...formData, onboardingComplete: true });
      navigate('/dashboard');
    }
  };

  const SelectionCard = ({ selected, onClick, label, sub }: { selected: boolean, onClick: () => void, label: string, sub?: string }) => (
    <div 
        onClick={onClick}
        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${selected ? 'border-accent bg-accent/10' : 'border-slate-700 bg-secondary'}`}
    >
        <div>
            <div className={`font-bold ${selected ? 'text-accent' : 'text-white'}`}>{label}</div>
            {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
        </div>
        {selected && <div className="bg-accent text-primary rounded-full p-1"><Check size={12} strokeWidth={4}/></div>}
    </div>
  );

  return (
    <div className="h-screen flex flex-col p-6">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <div className="mb-6">
            <span className="text-accent text-sm font-bold uppercase tracking-wider">Passo {step} de 5</span>
            <div className="h-1 bg-slate-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-accent transition-all duration-500" style={{ width: `${step * 20}%` }}></div>
            </div>
        </div>

        {step === 1 && (
            <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold">Qual é o seu objetivo principal?</h2>
                <SelectionCard 
                    label="Perder Peso" 
                    sub="Queimar gordura e definir"
                    selected={formData.goal === 'weight_loss'} 
                    onClick={() => setFormData({...formData, goal: 'weight_loss'})} 
                />
                <SelectionCard 
                    label="Ganhar Massa" 
                    sub="Hipertrofia e força"
                    selected={formData.goal === 'muscle_gain'} 
                    onClick={() => setFormData({...formData, goal: 'muscle_gain'})} 
                />
                <SelectionCard 
                    label="Performance" 
                    sub="Resistência atlética e cardio"
                    selected={formData.goal === 'endurance'} 
                    onClick={() => setFormData({...formData, goal: 'endurance'})} 
                />
            </div>
        )}

        {step === 2 && (
            <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold">Seus dados corporais</h2>
                
                <div>
                    <label className="text-sm text-slate-400 mb-1 block">Idade</label>
                    <input 
                        type="number" value={formData.age} onChange={e => setFormData({...formData, age: Number(e.target.value)})}
                        className="w-full bg-secondary p-4 rounded-xl text-white outline-none border border-slate-700 focus:border-accent"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="text-sm text-slate-400 mb-1 block">Peso (kg)</label>
                        <input 
                            type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: Number(e.target.value)})}
                            className="w-full bg-secondary p-4 rounded-xl text-white outline-none border border-slate-700 focus:border-accent"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-sm text-slate-400 mb-1 block">Altura (cm)</label>
                        <input 
                            type="number" value={formData.height} onChange={e => setFormData({...formData, height: Number(e.target.value)})}
                            className="w-full bg-secondary p-4 rounded-xl text-white outline-none border border-slate-700 focus:border-accent"
                        />
                    </div>
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold">Onde você vai treinar?</h2>
                <SelectionCard 
                    label="Em Casa" 
                    sub="Pouco espaço, peso do corpo"
                    selected={formData.location === 'home'} 
                    onClick={() => setFormData({...formData, location: 'home'})} 
                />
                <SelectionCard 
                    label="Academia" 
                    sub="Acesso a máquinas e pesos"
                    selected={formData.location === 'gym'} 
                    onClick={() => setFormData({...formData, location: 'gym'})} 
                />
                <SelectionCard 
                    label="Ao Ar Livre" 
                    sub="Parques e barras fixas"
                    selected={formData.location === 'outdoor'} 
                    onClick={() => setFormData({...formData, location: 'outdoor'})} 
                />
            </div>
        )}

        {step === 4 && (
             <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold">Experiência e Tempo</h2>
                <div className="space-y-2">
                    <label className="text-slate-400">Nível de experiência</label>
                    <div className="flex gap-2">
                         {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                             <button
                                key={lvl}
                                onClick={() => setFormData({...formData, experienceLevel: lvl as any})}
                                className={`flex-1 py-3 rounded-xl border capitalize ${formData.experienceLevel === lvl ? 'bg-accent border-accent text-primary font-bold' : 'border-slate-700 text-slate-400'}`}
                             >
                                 {lvl === 'beginner' ? 'Iniciante' : lvl === 'intermediate' ? 'Intermed.' : 'Avançado'}
                             </button>
                         ))}
                    </div>
                </div>
                <div>
                     <label className="text-slate-400 block mb-2">Minutos por dia: {formData.availableTime} min</label>
                     <input 
                        type="range" min="15" max="120" step="5"
                        value={formData.availableTime}
                        onChange={(e) => setFormData({...formData, availableTime: Number(e.target.value)})}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent"
                     />
                </div>
             </div>
        )}

        {step === 5 && (
            <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-bold">Equipamentos Disponíveis</h2>
                <p className="text-slate-400 text-sm">Selecione o que você tem acesso.</p>
                <div className="grid grid-cols-2 gap-3">
                    {['Halteres', 'Barra Fixa', 'Elásticos', 'Kettlebell', 'Banco', 'Corda', 'Esteira'].map(item => {
                        const hasIt = formData.equipment?.includes(item);
                        return (
                            <div 
                                key={item}
                                onClick={() => {
                                    const newEq = hasIt 
                                        ? formData.equipment?.filter(e => e !== item)
                                        : [...(formData.equipment || []), item];
                                    setFormData({...formData, equipment: newEq});
                                }}
                                className={`p-3 rounded-lg border text-center text-sm transition-all cursor-pointer ${hasIt ? 'bg-accent border-accent text-primary font-bold' : 'border-slate-700 bg-secondary'}`}
                            >
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
        )}
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-white hover:bg-slate-200 text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2"
      >
        {step === 5 ? "Gerar Meu Plano" : "Continuar"} <ChevronRight size={20} />
      </button>
    </div>
  );
};
