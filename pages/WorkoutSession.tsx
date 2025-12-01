import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WorkoutDay } from '../types';
import { X, Play, Pause, CheckCircle2, RotateCcw, ChevronRight } from 'lucide-react';
import { SubscriptionGate } from '../components/SubscriptionGate';

export const WorkoutSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const workout = location.state?.workout as WorkoutDay;

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Validate state
  useEffect(() => {
      if (!workout) navigate('/dashboard');
  }, [workout, navigate]);

  if (!workout) return null;

  const currentExercise = workout.exercises[currentExerciseIndex];

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Handle Resting Logic with effect to auto-switch if needed or just countdown
  useEffect(() => {
      if (isResting && timer > 0 && isActive) {
         // Count down for rest if we implemented a countdown timer
      }
  }, [isResting, timer, isActive]);

  const toggleTimer = () => setIsActive(!isActive);

  const handleNext = () => {
    setIsActive(false);
    setTimer(0);
    
    if (currentExerciseIndex < workout.exercises.length - 1) {
      if (!isResting) {
          setIsResting(true);
          // Auto start rest timer could go here
      } else {
          setIsResting(false);
          setCurrentExerciseIndex(prev => prev + 1);
      }
    } else {
      setCompleted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (completed) {
      return (
          <div className="h-screen flex flex-col items-center justify-center bg-primary p-6 text-center animate-fade-in">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Treino Concluído!</h1>
              <p className="text-slate-400 mb-8">Ótimo trabalho. Você queimou aproximadamente {workout.caloriesBurn} kcal.</p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full bg-white text-primary font-bold py-4 rounded-xl"
              >
                  Voltar ao Início
              </button>
          </div>
      )
  }

  return (
    <SubscriptionGate>
    <div className="h-screen flex flex-col bg-slate-900 relative">
      {/* Header */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
        <button onClick={() => navigate('/dashboard')} className="p-2 bg-black/40 rounded-full text-white backdrop-blur-sm">
            <X size={20} />
        </button>
        <div className="px-3 py-1 bg-black/40 rounded-full backdrop-blur-sm text-xs font-bold">
            {currentExerciseIndex + 1} / {workout.exercises.length}
        </div>
      </div>

      {/* Video Placeholder */}
      <div className="h-[45vh] bg-slate-800 relative flex items-center justify-center">
          <img 
            src={`https://picsum.photos/800/800?random=${currentExerciseIndex}`} 
            className="w-full h-full object-cover opacity-60"
            alt="Exercise demo"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             {!isActive && <Play size={48} className="text-white opacity-80" />}
          </div>
          {isResting && (
              <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center">
                  <h2 className="text-accent text-4xl font-bold mb-2">DESCANSO</h2>
                  <p className="text-white">Respire fundo...</p>
              </div>
          )}
      </div>

      {/* Controls Area */}
      <div className="flex-1 bg-primary -mt-6 rounded-t-3xl p-6 relative z-20 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold max-w-[70%]">{isResting ? 'Próximo:' : ''} {isResting ? workout.exercises[currentExerciseIndex + 1]?.name : currentExercise.name}</h2>
                {!isResting && (
                    <div className="text-right">
                        <div className="text-3xl font-mono font-bold text-accent">{formatTime(timer)}</div>
                    </div>
                )}
            </div>

            {!isResting && (
                <div className="flex gap-4 mb-6">
                    <div className="bg-secondary px-4 py-2 rounded-lg border border-slate-700">
                        <span className="block text-xs text-slate-400">Séries</span>
                        <span className="font-bold">{currentExercise.sets}</span>
                    </div>
                    <div className="bg-secondary px-4 py-2 rounded-lg border border-slate-700">
                        <span className="block text-xs text-slate-400">Reps</span>
                        <span className="font-bold">{currentExercise.reps}</span>
                    </div>
                    <div className="bg-secondary px-4 py-2 rounded-lg border border-slate-700">
                        <span className="block text-xs text-slate-400">Descanso</span>
                        <span className="font-bold">{currentExercise.rest}s</span>
                    </div>
                </div>
            )}
            
            <p className="text-slate-400 text-sm leading-relaxed">
                {currentExercise.notes || "Mantenha a postura correta e controle a respiração durante todo o movimento."}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-6">
             <button 
                onClick={toggleTimer}
                className="w-16 h-16 rounded-full bg-secondary border border-slate-700 flex items-center justify-center text-white"
             >
                 {isActive ? <Pause /> : <Play />}
             </button>
             <button 
                onClick={handleNext}
                className="flex-1 h-16 bg-accent hover:bg-accentHover text-primary font-bold rounded-2xl flex items-center justify-center gap-2 text-lg"
             >
                 {isResting ? 'Começar Série' : 'Concluir'} <ChevronRight />
             </button>
          </div>
      </div>
    </div>
    </SubscriptionGate>
  );
};