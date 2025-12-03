import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, ExternalLink } from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const plan = location.state?.plan;

  useEffect(() => {
    if (!plan) {
      navigate('/subscribe');
    }
  }, [plan, navigate]);

  if (!plan) return null;

  return (
    <div className="min-h-screen bg-primary pb-20 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="p-6 pb-2">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-slate-400 hover:text-white mb-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold mb-2">Checkout Seguro</h1>
        <p className="text-slate-400 text-sm">
          Finalize sua assinatura para liberar acesso total.
        </p>
      </div>

      <div className="p-6">
        {/* Selected Plan Summary */}
        <div className="bg-gradient-to-br from-secondary to-slate-800 rounded-2xl p-6 border border-slate-700 mb-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-5">
             <ShieldCheck size={100} />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-1">Plano Selecionado</p>
                  <h2 className="text-2xl font-bold text-white">{plan.title}</h2>
               </div>
            </div>
            
            <div className="flex items-baseline gap-1 mb-4">
               <span className="text-3xl font-bold text-white">R$ {plan.price}</span>
               <span className="text-slate-400">/{plan.period}</span>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 flex items-start gap-3">
               <div className="mt-1 w-2 h-2 rounded-full bg-accent"></div>
               <p className="text-sm text-slate-300">
                 <span className="text-accent font-bold">Acesso Imediato</span> a todas as funcionalidades premium.
               </p>
            </div>
          </div>
        </div>

        {/* Direct Link Action */}
        <div className="bg-secondary p-6 rounded-xl border border-slate-700 mb-6 flex flex-col items-center justify-center animate-fade-in">
             <p className="text-slate-300 text-center mb-6 text-sm">
                Para sua segurança, o pagamento é processado diretamente pelo PayPal. Clique abaixo para continuar.
             </p>
             
             <a
                href="https://www.paypal.com/ncp/payment/SGQLGNCSDTNKL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-accent hover:bg-accentHover text-primary font-bold py-4 rounded-xl shadow-lg shadow-accent/20 transition-all transform active:scale-95 text-lg flex items-center justify-center gap-2"
             >
                ASSINAR AGORA
                <ExternalLink size={20} />
             </a>

             <div className="mt-6 flex flex-col items-center gap-3">
                 <div className="flex gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
                     <div className="h-6 w-10 bg-white rounded flex items-center justify-center">
                         <span className="text-[#003087] font-bold text-[10px]">PayPal</span>
                     </div>
                     <div className="h-6 w-10 bg-white rounded flex items-center justify-center">
                         <span className="text-[#1A1F71] font-bold text-[8px]">VISA</span>
                     </div>
                     <div className="h-6 w-10 bg-white rounded flex items-center justify-center relative overflow-hidden">
                        <div className="w-3 h-3 bg-[#EB001B] rounded-full absolute left-2 opacity-80"></div>
                        <div className="w-3 h-3 bg-[#F79E1B] rounded-full absolute right-2 opacity-80"></div>
                     </div>
                 </div>
             </div>
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-slate-500 text-xs text-center mt-6">
            <ShieldCheck size={14} className="text-accent"/>
            <span>Ambiente 100% seguro e criptografado.</span>
        </div>
      </div>
    </div>
  );
};