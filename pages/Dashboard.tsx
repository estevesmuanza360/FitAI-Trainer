import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Calendar, Flame, Clock, Play, Info } from 'lucide-react';
import { SubscriptionGate } from '../components/SubscriptionGate';

export const Dashboard = () => {
  const { user, trialStatus, workoutPlan } = useApp();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  
  // Just take the first day for demo purposes if plan exists
  const todaysWorkout = workoutPlan?.days?.[0];

  return (
    <SubscriptionGate>
    <div className="min-h-screen p-6 pb-24 overflow-y-auto no-scrollbar bg-primary">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
            <h1 className="text-2xl font-bold">Olá, {user?.name?.split(' ')[0] || 'Atleta'}!</h1>
            <p className="text-slate-400 capitalize">{today}</p>
        </div>
        <div 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border-2 border-slate-600 cursor-pointer"
        >
            <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=334155&color=fff`} alt="Profile" />
        </div>
      </div>

      {/* Trial Banner */}
      {!user?.isSubscribed && (
          <div className={`mb-6 p-4 rounded-xl flex justify-between items-center ${trialStatus.daysRemaining <= 1 ? 'bg-red-500/20 border border-red-500' : 'bg-blue-500/20 border border-blue-500'}`}>
             <div>
                 <div className="font-bold text-sm">Teste Gratuito Ativo</div>
                 <div className="text-xs opacity-80">{trialStatus.daysRemaining} dias restantes</div>
             </div>
             <button onClick={() => navigate('/subscribe')} className="px-3 py-1 bg-white text-primary text-xs font-bold rounded-lg">
                 Assinar
             </button>
          </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-secondary p-4 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
                <Flame size={18} className="text-orange-500" />
                <span className="text-xs">Calorias</span>
            </div>
            <div className="text-xl font-bold">1,240 <span className="text-xs font-normal text-slate-500">kcal</span></div>
        </div>
        <div className="bg-secondary p-4 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
                <Clock size={18} className="text-blue-500" />
                <span className="text-xs">Treino</span>
            </div>
            <div className="text-xl font-bold">45 <span className="text-xs font-normal text-slate-500">min</span></div>
        </div>
      </div>

      {/* Coach Note / System Explanation */}
      {workoutPlan?.explanation && (
          <div className="mb-6 bg-accent/10 border border-accent/20 p-4 rounded-xl">
             <div className="flex items-center gap-2 mb-2 text-accent font-bold text-sm">
                <Info size={16} /> Nota do Treinador
             </div>
             <p className="text-slate-300 text-sm leading-relaxed italic">
                "{workoutPlan.explanation}"
             </p>
          </div>
      )}

      {/* Today's Workout Card */}
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <Calendar size={20} className="text-accent"/> Treino de Hoje
      </h2>
      
      {todaysWorkout ? (
        <div className="bg-gradient-to-br from-secondary to-slate-800 p-5 rounded-2xl border border-slate-700 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <DumbbellIcon size={100} />
            </div>
            
            <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold mb-3">
                    {todaysWorkout.focus}
                </span>
                <h3 className="text-2xl font-bold mb-1">{todaysWorkout.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                    <span>{todaysWorkout.exercises.length} Exercícios</span>
                    <span>•</span>
                    <span>{todaysWorkout.estimatedDuration} min</span>
                    <span>•</span>
                    <span>{todaysWorkout.caloriesBurn} kcal</span>
                </div>

                <button 
                    onClick={() => navigate('/workout', { state: { workout: todaysWorkout } })}
                    className="w-full bg-accent hover:bg-accentHover text-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                    <Play size={20} fill="currentColor" /> Iniciar Treino
                </button>
            </div>
        </div>
      ) : (
          <div className="bg-secondary p-6 rounded-2xl border border-slate-700 text-center">
              <p className="text-slate-400 mb-4">Você ainda não tem um plano de treino ativo.</p>
              <button 
                onClick={() => navigate('/generate')}
                className="bg-accent text-primary px-6 py-2 rounded-xl font-bold"
              >
                  Gerar Plano
              </button>
          </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mt-6">
          <button onClick={() => navigate('/nutrition')} className="bg-secondary p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2 hover:bg-slate-700">
             <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <span className="font-bold">H2O</span>
             </div>
             <span className="text-sm font-medium">Hidratação</span>
          </button>
          <button onClick={() => navigate('/progress')} className="bg-secondary p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center gap-2 hover:bg-slate-700">
             <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Flame size={20} />
             </div>
             <span className="text-sm font-medium">Progresso</span>
          </button>
      </div>
    </div>
    </SubscriptionGate>
  );
};

const DumbbellIcon = ({ size }: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6.5 6.5 11 11"/>
        <path d="m21 21-1-1"/>
        <path d="m3 3 1 1"/>
        <path d="m18 22 4-4"/>
        <path d="m2 6 4-4"/>
        <path d="m3 10 7.9-7.9a2.12 2.12 0 1 1 3 3L6 13a2.12 2.12 0 1 1-3-3Z"/>
        <path d="m14 11 7.9-7.9a2.12 2.12 0 1 1 3 3L17 14a2.12 2.12 0 1 1-3-3Z"/>
    </svg>
)