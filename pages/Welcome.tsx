import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, ArrowRight } from 'lucide-react';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary via-slate-900 to-slate-800">
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
          <Dumbbell size={48} className="text-accent" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">FitAI<span className="text-accent">.Trainer</span></h1>
        <p className="text-slate-400 text-center max-w-[250px]">
          A revolução fitness impulsionada por tecnologia inteligente.
        </p>
      </div>

      <div className="w-full space-y-4 mb-8">
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-accent hover:bg-accentHover text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95"
        >
          Entrar
        </button>
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all"
        >
          Criar Conta
        </button>
      </div>
    </div>
  );
};