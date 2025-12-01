import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Smartphone, Zap, ArrowRight } from 'lucide-react';

export const Subscribe = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('annual');

  const plans = [
    {
      id: 'monthly',
      title: 'Mensal',
      price: '10,90',
      period: 'mês',
      details: null,
      badge: null
    },
    {
      id: 'quarterly',
      title: 'Trimestral',
      price: '30,90',
      period: 'trimestre',
      details: 'Cobrado a cada 3 meses',
      badge: '20% OFF'
    },
    {
      id: 'annual',
      title: 'Anual',
      price: '199,90',
      period: 'ano',
      details: 'Cobrado anualmente',
      badge: '40% OFF'
    }
  ];

  const handleProceed = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    navigate('/checkout', { state: { plan } });
  };

  return (
    <div className="min-h-screen bg-slate-900 pb-24 overflow-y-auto no-scrollbar relative">
       {/* Visual Header */}
       <div className="relative h-64 overflow-hidden bg-primary">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
          {/* Abstract Tech/Fitness Background */}
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full mb-3 shadow-[0_0_15px_rgba(163,230,53,0.5)]">
                 <Zap size={12} fill="currentColor" />
                 Experimente grátis por 3 dias
              </div>
              <h1 className="text-2xl font-bold leading-tight mb-2 text-white shadow-sm">
                Assine e desbloqueie treinos 100% personalizados
              </h1>
              <p className="text-slate-300 text-sm font-medium">
                Receba planos criados por IA, acompanhamento diário e resultados reais.
              </p>
          </div>
       </div>

       <div className="p-6 pt-2">
          {/* Benefits */}
          <div className="bg-slate-800/50 rounded-xl p-4 mb-8 border border-slate-700">
             <div className="grid grid-cols-1 gap-3">
                 {[
                   'Treinos personalizados automaticamente',
                   'Acompanhamento da evolução',
                   'Acesso a todos os planos',
                   'Suporte dentro do app',
                   'Exercícios com vídeos',
                   'IA ajusta o treino conforme performance'
                 ].map((benefit, i) => (
                   <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 min-w-[16px]">
                        <Check size={16} className="text-accent" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-300 leading-tight">{benefit}</span>
                   </div>
                 ))}
             </div>
          </div>

          {/* Plans Selection */}
          <div className="space-y-4 mb-8">
             {plans.map(plan => (
               <div 
                 key={plan.id}
                 onClick={() => setSelectedPlan(plan.id)}
                 className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group ${
                    selectedPlan === plan.id 
                    ? 'border-accent bg-accent/5 shadow-[0_0_20px_rgba(163,230,53,0.1)]' 
                    : 'border-slate-700 bg-secondary hover:border-slate-600'
                 }`}
               >
                  {plan.badge && (
                    <div className="absolute -top-3 right-4 bg-accent text-primary text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      {plan.badge}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? 'border-accent' : 'border-slate-500'}`}>
                          {selectedPlan === plan.id && <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>}
                      </div>
                      <div>
                        <h3 className={`font-bold ${selectedPlan === plan.id ? 'text-white' : 'text-slate-300'}`}>Plano {plan.title}</h3>
                        {plan.details && <p className="text-[10px] text-slate-400">{plan.details}</p>}
                      </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-lg text-white">R$ {plan.price}</div>
                    <div className="text-xs text-slate-400">/{plan.period}</div>
                  </div>
               </div>
             ))}
          </div>

          <div className="text-center mb-6">
              <p className="text-sm text-slate-300 font-medium">
                 Experimente grátis por 3 dias — cancele quando quiser.
              </p>
          </div>

          {/* CTA */}
          <button 
              onClick={handleProceed}
              className="w-full bg-accent hover:bg-accentHover text-primary font-bold py-4 rounded-xl shadow-[0_4px_14px_rgba(163,230,53,0.4)] transition-all transform active:scale-95 mb-6 text-lg flex items-center justify-center gap-2"
          >
              Selecionar Plano <ArrowRight size={20} />
          </button>

          {/* Footer / Payment Methods */}
          <div className="border-t border-slate-800 pt-6">
              <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#003087]"></span> PayPal</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#1A1F71]"></span> Visa</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#EB001B]"></span> Mastercard</span>
                  <span className="flex items-center gap-1"><Smartphone size={10}/> Cartão Virtual</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-slate-500 text-xs bg-slate-800/50 py-2 rounded-lg">
                  <ShieldCheck size={14} className="text-accent"/>
                  <span>Pagamento 100% seguro e criptografado.</span>
              </div>
          </div>
       </div>
    </div>
  );
};