import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { generateWorkoutPlan } from '../services/geminiService';
import { Wand2, Loader2, AlertCircle } from 'lucide-react';
import { SubscriptionGate } from '../components/SubscriptionGate';

export const Generate = () => {
  const { user, setWorkoutPlan } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const plan = await generateWorkoutPlan(user);
      if (plan) {
        setWorkoutPlan(plan);
        navigate('/dashboard');
      } else {
        setError('Não foi possível gerar o treino agora. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubscriptionGate>
    <div className="min-h-screen p-6 flex flex-col justify-center items-center text-center bg-primary">
      <div className="w-24 h-24 bg-gradient-to-tr from-accent to-blue-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(163,230,53,0.4)]">
        <Wand2 size={40} className="text-primary" />
      </div>

      <h1 className="text-3xl font-bold mb-4">Criar Novo Plano</h1>
      <p className="text-slate-400 mb-8 max-w-xs mx-auto">
        O sistema analisará seu perfil atualizado e criará uma rotina perfeita para os próximos 7 dias.
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl mb-6 flex items-center gap-2">
            <AlertCircle size={20} /> {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full max-w-xs bg-white text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            Gerando...
          </>
        ) : (
          <>
            <Wand2 size={24} />
            Gerar Plano
          </>
        )}
      </button>

      {!loading && (
        <button 
            onClick={() => navigate('/setup')}
            className="mt-6 text-slate-400 text-sm underline"
        >
            Atualizar minhas preferências antes
        </button>
      )}
    </div>
    </SubscriptionGate>
  );
};