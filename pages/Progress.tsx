import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SubscriptionGate } from '../components/SubscriptionGate';

const data = [
  { name: 'Sem 1', peso: 70 },
  { name: 'Sem 2', peso: 69.5 },
  { name: 'Sem 3', peso: 68.8 },
  { name: 'Sem 4', peso: 68.2 },
  { name: 'Sem 5', peso: 67.5 },
];

export const Progress = () => {
  return (
    <SubscriptionGate>
    <div className="min-h-screen p-6 pb-24 overflow-y-auto no-scrollbar bg-primary">
      <h1 className="text-2xl font-bold mb-6">Seu Progresso</h1>

      <div className="bg-secondary p-4 rounded-2xl border border-slate-700 mb-6">
        <h2 className="text-lg font-bold mb-4">Histórico de Peso</h2>
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="peso" stroke="#a3e635" strokeWidth={3} dot={{ r: 4, fill: '#a3e635' }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary p-4 rounded-2xl border border-slate-700 text-center">
             <div className="text-3xl font-bold text-white mb-1">12</div>
             <div className="text-xs text-slate-400">Treinos Concluídos</div>
          </div>
          <div className="bg-secondary p-4 rounded-2xl border border-slate-700 text-center">
             <div className="text-3xl font-bold text-white mb-1">2.5kg</div>
             <div className="text-xs text-slate-400">Peso Perdido</div>
          </div>
      </div>
      
      <div className="mt-8 p-6 bg-slate-800 rounded-2xl text-center border border-dashed border-slate-600 opacity-70">
          <p className="text-slate-400 mb-2">Fotos de Antes e Depois</p>
          <button className="text-accent text-sm font-bold">+ Adicionar Foto</button>
      </div>
    </div>
    </SubscriptionGate>
  );
};
