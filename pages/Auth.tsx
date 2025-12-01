import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Lock, Mail, User } from 'lucide-react';

export const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = location.pathname === '/register';
  const { login } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    // If registering, go to setup. If login, go to dashboard.
    navigate(isRegister ? '/setup' : '/dashboard');
  };

  return (
    <div className="h-screen flex flex-col justify-center p-6">
      <h2 className="text-3xl font-bold mb-2">{isRegister ? 'Criar Conta' : 'Bem-vindo de volta'}</h2>
      <p className="text-slate-400 mb-8">{isRegister ? 'Inicie sua jornada fitness hoje.' : 'Entre para acessar seus treinos.'}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
            <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                    type="text" 
                    placeholder="Seu nome"
                    className="w-full bg-secondary border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:border-accent focus:outline-none"
                />
            </div>
        )}
        <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
                type="email" 
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-secondary border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:border-accent focus:outline-none"
            />
        </div>
        <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
                type="password" 
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-secondary border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:border-accent focus:outline-none"
            />
        </div>

        <button 
            type="submit"
            className="w-full bg-accent hover:bg-accentHover text-primary font-bold py-4 rounded-xl mt-6 shadow-lg shadow-accent/20 transition-all"
        >
            {isRegister ? 'Criar Conta e Começar' : 'Entrar'}
        </button>
      </form>

      <p className="mt-6 text-center text-slate-400 text-sm">
        {isRegister ? 'Já tem uma conta?' : 'Não tem conta?'}
        <span 
            onClick={() => navigate(isRegister ? '/login' : '/register')}
            className="text-accent font-bold cursor-pointer ml-1"
        >
            {isRegister ? 'Entrar' : 'Cadastre-se'}
        </span>
      </p>
    </div>
  );
};
