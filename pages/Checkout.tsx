import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Loader2, ArrowLeft, CheckCircle2, CreditCard as CardIcon, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subscribe } = useApp();
  
  const plan = location.state?.plan;
  const [method, setMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form States
  const [paypalEmail, setPaypalEmail] = useState('');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    if (!plan) {
      navigate('/subscribe');
    }
  }, [plan, navigate]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!method) return;
    
    setLoading(true);
    
    // Simulate API processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      subscribe();
      
      // Redirect after success animation
      setTimeout(() => {
        navigate('/dashboard');
      }, 2500);
    }, 2000);
  };

  if (!plan) return null;

  if (success) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
          <CheckCircle2 size={48} className="text-accent" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Pagamento Confirmado!</h1>
        <p className="text-slate-400 text-center mb-8">Sua assinatura premium está ativa. <br/>Bem-vindo à elite.</p>
        <p className="text-sm text-slate-500">Redirecionando...</p>
      </div>
    );
  }

  const isCard = method === 'visa' || method === 'mastercard';

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
        <h1 className="text-3xl font-bold mb-2">Começar Agora</h1>
        <p className="text-slate-400 text-sm">
          Finalize sua assinatura e desbloqueie todos os treinos personalizados.
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
               {plan.badge && (
                  <span className="bg-accent text-primary text-xs font-bold px-2 py-1 rounded">
                    {plan.badge}
                  </span>
               )}
            </div>
            
            <div className="flex items-baseline gap-1 mb-4">
               <span className="text-3xl font-bold text-white">R$ {plan.price}</span>
               <span className="text-slate-400">/{plan.period}</span>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 flex items-start gap-3">
               <div className="mt-1 w-2 h-2 rounded-full bg-accent"></div>
               <p className="text-sm text-slate-300">
                 <span className="text-accent font-bold">3 dias grátis</span> de teste antes de ser cobrado. Cancele a qualquer momento.
               </p>
            </div>
          </div>
        </div>

        {/* Payment Methods Selector */}
        <h3 className="text-lg font-bold mb-4">Forma de Pagamento</h3>
        
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button
            onClick={() => setMethod('paypal')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
              method === 'paypal' ? 'border-[#003087] bg-[#003087]/10' : 'border-slate-700 bg-secondary opacity-60 hover:opacity-100'
            }`}
          >
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1">
                 <span className="text-[#003087] font-bold italic text-[10px]">P</span>
                 <span className="text-[#009cde] font-bold italic text-[10px]">P</span>
             </div>
             <span className="text-[10px] font-bold">PayPal</span>
          </button>

          <button
            onClick={() => setMethod('visa')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
              method === 'visa' ? 'border-[#1A1F71] bg-[#1A1F71]/10' : 'border-slate-700 bg-secondary opacity-60 hover:opacity-100'
            }`}
          >
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1">
                 <span className="text-[#1A1F71] font-bold text-[8px] uppercase tracking-tighter">Visa</span>
             </div>
             <span className="text-[10px] font-bold">Visa</span>
          </button>

          <button
            onClick={() => setMethod('mastercard')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
              method === 'mastercard' ? 'border-[#EB001B] bg-[#EB001B]/10' : 'border-slate-700 bg-secondary opacity-60 hover:opacity-100'
            }`}
          >
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-1 relative overflow-hidden">
                <div className="w-3 h-3 bg-[#EB001B] rounded-full absolute left-1.5 opacity-80"></div>
                <div className="w-3 h-3 bg-[#F79E1B] rounded-full absolute right-1.5 opacity-80"></div>
             </div>
             <span className="text-[10px] font-bold">Mastercard</span>
          </button>
        </div>

        {/* Dynamic Forms */}
        {method && (
            <form onSubmit={handlePayment} className="animate-fade-in">
                {method === 'paypal' ? (
                    <div className="bg-secondary p-4 rounded-xl border border-slate-700 mb-6">
                        <label className="text-xs text-slate-400 mb-1 block uppercase font-bold">Email do PayPal</label>
                        <input 
                            type="email" 
                            required
                            placeholder="seu.email@exemplo.com"
                            value={paypalEmail}
                            onChange={e => setPaypalEmail(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-[#009cde]"
                        />
                    </div>
                ) : (
                    <div className="bg-secondary p-4 rounded-xl border border-slate-700 mb-6 space-y-4">
                        <div>
                            <label className="text-xs text-slate-400 mb-1 block uppercase font-bold">Número do Cartão</label>
                            <div className="relative">
                                <CardIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    type="text" 
                                    required
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                    value={cardData.number}
                                    onChange={e => setCardData({...cardData, number: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 pl-10 text-white outline-none focus:border-accent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 mb-1 block uppercase font-bold">Nome no Cartão</label>
                            <input 
                                type="text" 
                                required
                                placeholder="COMO NO CARTÃO"
                                value={cardData.name}
                                onChange={e => setCardData({...cardData, name: e.target.value.toUpperCase()})}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-accent"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-xs text-slate-400 mb-1 block uppercase font-bold">Validade</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="MM/AA"
                                    maxLength={5}
                                    value={cardData.expiry}
                                    onChange={e => setCardData({...cardData, expiry: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-accent"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-slate-400 mb-1 block uppercase font-bold">CVV</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="123"
                                        maxLength={4}
                                        value={cardData.cvv}
                                        onChange={e => setCardData({...cardData, cvv: e.target.value})}
                                        className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 pl-8 text-white outline-none focus:border-accent"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-2">
                             <input type="checkbox" id="saveCard" className="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-accent" />
                             <label htmlFor="saveCard" className="text-xs text-slate-400">Salvar cartão para próximas compras</label>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-95 mb-4 text-lg flex items-center justify-center gap-2 ${
                    method === 'paypal' 
                    ? 'bg-[#003087] hover:bg-[#00256b] text-white shadow-[#003087]/20' 
                    : 'bg-accent hover:bg-accentHover text-primary shadow-accent/20'
                }`}
                >
                {loading ? (
                    <>
                    <Loader2 className="animate-spin" /> Processando...
                    </>
                ) : (
                    <>
                        {method === 'paypal' ? 'Pagar com PayPal' : 'Confirmar Pagamento'}
                    </>
                )}
                </button>
            </form>
        )}

        {!method && (
            <div className="text-center p-8 text-slate-500 bg-secondary/30 rounded-xl border border-dashed border-slate-700">
                Selecione uma forma de pagamento acima para continuar.
            </div>
        )}

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-slate-500 text-xs text-center mt-6">
            <ShieldCheck size={14} className="text-accent"/>
            <span>Pagamento 100% seguro e criptografado.</span>
        </div>
      </div>
    </div>
  );
};
