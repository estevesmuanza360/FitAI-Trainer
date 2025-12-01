import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Dumbbell, Utensils, TrendingUp, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  const hideNavRoutes = ['/', '/login', '/register', '/onboarding', '/setup', '/subscribe', '/workout'];
  const showNav = isAuthenticated && !hideNavRoutes.some(path => location.pathname === path || location.pathname.startsWith('/workout'));

  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/dashboard' },
    { icon: <Dumbbell size={24} />, label: 'Treino', path: '/generate' },
    { icon: <Utensils size={24} />, label: 'Nutri', path: '/nutrition' },
    { icon: <TrendingUp size={24} />, label: 'Evolução', path: '/progress' },
    { icon: <User size={24} />, label: 'Perfil', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-primary text-white pb-20 font-sans">
      <main className="max-w-md mx-auto min-h-screen relative overflow-hidden shadow-2xl bg-primary">
        {children}
      </main>

      {showNav && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <div className="max-w-md mx-auto bg-secondary/90 backdrop-blur-md border-t border-slate-700 px-4 py-3 flex justify-between items-center">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  location.pathname === item.path ? 'text-accent' : 'text-slate-400'
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};