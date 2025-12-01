import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Brain, Activity, Zap } from 'lucide-react';

const steps = [
  {
    icon: <Brain size={64} className="text-accent" />,
    title: "IA Personalizada",
    description: "Nossa IA analisa seu perfil e cria treinos únicos adaptados aos seus objetivos e limites."
  },
  {
    icon: <Activity size={64} className="text-accent" />,
    title: "Acompanhamento Real",
    description: "Monitore sua evolução com gráficos inteligentes e ajuste a intensidade automaticamente."
  },
  {
    icon: <Zap size={64} className="text-accent" />,
    title: "Resultados Rápidos",
    description: "Planos otimizados para eficiência máxima, seja na academia ou na sala de casa."
  }
];

export const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="h-screen flex flex-col p-6 relative">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div className="animate-bounce-slow">
            {steps[currentStep].icon}
        </div>
        <div>
            <h2 className="text-3xl font-bold mb-4">{steps[currentStep].title}</h2>
            <p className="text-slate-400 text-lg leading-relaxed">{steps[currentStep].description}</p>
        </div>
      </div>

      <div className="flex justify-center space-x-2 mb-8">
        {steps.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-accent' : 'w-2 bg-slate-700'}`}
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-white text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 mb-6"
      >
        {currentStep === steps.length - 1 ? "Começar Agora" : "Próximo"} <ChevronRight size={20} />
      </button>
    </div>
  );
};
