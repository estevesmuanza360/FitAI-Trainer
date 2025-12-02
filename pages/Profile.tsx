import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LogOut, 
  Settings, 
  Camera, 
  Save, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Bell, 
  Globe, 
  Dumbbell, 
  User as UserIcon,
  Ruler,
  Target,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';

export const Profile = () => {
  const { user, updateUser, logout } = useApp();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<string | null>('personal');
  const [successMsg, setSuccessMsg] = useState('');

  // Local state for editing to avoid immediate global updates before save
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: user?.name || '',
    username: user?.username || '',
    age: user?.age || 0,
    weight: user?.weight || 0,
    height: user?.height || 0,
    experienceLevel: user?.experienceLevel || 'beginner',
    equipment: user?.equipment || [],
    goal: user?.goal || 'weight_loss',
    notifications: user?.notifications ?? true,
    language: user?.language || 'pt-BR',
  });

  const [passwordData, setPasswordData] = useState({ old: '', new: '' });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = (section: string) => {
    updateUser(formData);
    setSuccessMsg(`Dados de ${section} atualizados!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const allEquipments = ['Halteres', 'Barra Fixa', 'Elásticos', 'Kettlebell', 'Banco', 'Corda', 'Esteira', 'Bicicleta', 'Máquinas de Musculação'];

  const toggleEquipment = (item: string) => {
    const current = formData.equipment || [];
    const updated = current.includes(item) 
      ? current.filter(e => e !== item)
      : [...current, item];
    setFormData({...formData, equipment: updated});
  };

  const SectionHeader = ({ icon: Icon, title, id }: { icon: any, title: string, id: string }) => (
    <button 
      onClick={() => toggleSection(id)}
      className={`w-full flex items-center justify-between p-4 bg-secondary border border-slate-700 ${openSection === id ? 'rounded-t-xl border-b-0' : 'rounded-xl hover:bg-slate-700'} transition-all`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-accent" />
        <span className="font-bold">{title}</span>
      </div>
      {openSection === id ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
    </button>
  );

  const SectionContent = ({ children, onSave, id }: { children?: React.ReactNode, onSave?: () => void, id: string }) => {
     if (openSection !== id) return null;
     return (
        <div className="p-4 bg-secondary/50 border border-t-0 border-slate-700 rounded-b-xl mb-4 animate-fade-in">
           {children}
           {onSave && (
               <button 
                onClick={onSave}
                className="w-full mt-4 bg-accent text-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-accentHover"
               >
                   <Save size={18} /> Salvar Alterações
               </button>
           )}
        </div>
     );
  };

  return (
    <div className="min-h-screen p-6 pb-24 bg-primary overflow-y-auto no-scrollbar">
      {/* Toast Notification */}
      {successMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-accent text-primary px-6 py-3 rounded-full font-bold shadow-lg animate-fade-in flex items-center gap-2">
           <Check size={18} /> {successMsg}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>
      
      {/* 1. Foto de Perfil */}
      <div className="bg-secondary p-6 rounded-2xl border border-slate-700 mb-6 flex flex-col items-center">
         <div className="relative mb-4 group">
            <div className="w-28 h-28 rounded-full bg-slate-800 border-4 border-accent overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=334155&color=fff&size=200`} alt="Profile" className="w-full h-full object-cover"/>
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white text-primary rounded-full shadow-lg hover:bg-gray-200 transition-colors">
                <Camera size={18} />
            </button>
         </div>
         <h2 className="text-lg font-bold">Foto de Perfil</h2>
         <p className="text-slate-400 text-sm text-center max-w-[200px] mb-3">
             Adicione ou atualize a sua foto para personalizar sua experiência.
         </p>
         <button className="text-accent text-sm font-bold underline">Alterar Foto</button>
      </div>

      <div className="space-y-2">
          {/* 2. Dados Pessoais & 3. Username */}
          <SectionHeader icon={UserIcon} title="Dados Pessoais" id="personal" />
          <SectionContent id="personal" onSave={() => handleSave('Dados Pessoais')}>
              <p className="text-sm text-slate-400 mb-4">Revise e atualize suas informações básicas para garantir treinos mais precisos.</p>
              
              <div className="space-y-4">
                  <div>
                      <label className="text-xs text-slate-400 mb-1 block uppercase font-bold">Nome Completo</label>
                      <input 
                          type="text" 
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-accent outline-none"
                      />
                  </div>
                  <div>
                      <label className="text-xs text-slate-400 mb-1 block uppercase font-bold">Nome de Usuário</label>
                      <input 
                          type="text" 
                          value={formData.username} 
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-accent outline-none"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">Este é o nome pelo qual você será identificado no app.</p>
                  </div>
                  <div>
                      <label className="text-xs text-slate-400 mb-1 block uppercase font-bold">Idade</label>
                      <input 
                          type="number" 
                          value={formData.age} 
                          onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-accent outline-none"
                      />
                  </div>
              </div>
          </SectionContent>

          {/* 4. Editar Informações (Stats) */}
          <SectionHeader icon={Ruler} title="Informações Físicas" id="stats" />
          <SectionContent id="stats" onSave={() => handleSave('Medidas')}>
              <p className="text-sm text-slate-400 mb-4">Mantenha seu peso e altura atualizados para cálculos de calorias e IMC.</p>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-xs text-slate-400 mb-1 block uppercase font-bold">Peso (kg)</label>
                      <input 
                          type="number" 
                          value={formData.weight} 
                          onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-accent outline-none"
                      />
                  </div>
                  <div>
                      <label className="text-xs text-slate-400 mb-1 block uppercase font-bold">Altura (cm)</label>
                      <input 
                          type="number" 
                          value={formData.height} 
                          onChange={(e) => setFormData({...formData, height: Number(e.target.value)})}
                          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-accent outline-none"
                      />
                  </div>
              </div>
              <div className="mt-4">
                   <label className="text-xs text-slate-400 mb-1 block uppercase font-bold">Nível de Experiência</label>
                   <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-600">
                       {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                           <button
                             key={lvl}
                             onClick={() => setFormData({...formData, experienceLevel: lvl as any})}
                             className={`flex-1 py-2 rounded capitalize text-sm font-medium transition-all ${formData.experienceLevel === lvl ? 'bg-accent text-primary shadow-sm' : 'text-slate-400 hover:text-white'}`}
                           >
                               {lvl === 'beginner' ? 'Iniciante' : lvl === 'intermediate' ? 'Intermed.' : 'Avançado'}
                           </button>
                       ))}
                   </div>
              </div>
          </SectionContent>

          {/* 5. Equipamentos */}
          <SectionHeader icon={Dumbbell} title="Equipamentos" id="equip" />
          <SectionContent id="equip" onSave={() => handleSave('Equipamentos')}>
              <p className="text-sm text-slate-400 mb-4">Selecione o que você tem disponível. O sistema usará isso para criar seus treinos.</p>
              <div className="grid grid-cols-2 gap-2">
                  {allEquipments.map(item => (
                      <div 
                        key={item}
                        onClick={() => toggleEquipment(item)}
                        className={`p-3 rounded-lg border text-sm cursor-pointer flex items-center gap-2 ${formData.equipment?.includes(item) ? 'bg-accent/10 border-accent text-accent' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                      >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.equipment?.includes(item) ? 'bg-accent border-accent' : 'border-slate-500'}`}>
                             {formData.equipment?.includes(item) && <Check size={10} className="text-primary" strokeWidth={4} />}
                          </div>
                          {item}
                      </div>
                  ))}
              </div>
          </SectionContent>

          {/* 6. Objetivos */}
          <SectionHeader icon={Target} title="Objetivo Principal" id="goals" />
          <SectionContent id="goals" onSave={() => handleSave('Objetivo')}>
               <p className="text-sm text-slate-400 mb-4">Escolha seu foco atual. Isso muda completamente a estrutura do plano de treino.</p>
               <div className="space-y-2">
                   {[
                       { id: 'weight_loss', label: 'Perder Peso', desc: 'Foco em queima calórica e metabolismo.' },
                       { id: 'muscle_gain', label: 'Ganhar Massa', desc: 'Foco em hipertrofia e força.' },
                       { id: 'endurance', label: 'Performance', desc: 'Resistência cardiovascular e atlética.' },
                       { id: 'maintenance', label: 'Manter a Forma', desc: 'Saúde geral e tonificação.' }
                   ].map(goal => (
                       <div 
                         key={goal.id}
                         onClick={() => setFormData({...formData, goal: goal.id as any})}
                         className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.goal === goal.id ? 'bg-accent/10 border-accent' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
                       >
                           <div className="flex items-center justify-between mb-1">
                               <span className={`font-bold ${formData.goal === goal.id ? 'text-accent' : 'text-white'}`}>{goal.label}</span>
                               {formData.goal === goal.id && <Check size={18} className="text-accent" />}
                           </div>
                           <p className="text-xs text-slate-400">{goal.desc}</p>
                       </div>
                   ))}
               </div>
          </SectionContent>

          {/* 7. Alterar Senha & 8. Notificações & 9. Idioma */}
          <SectionHeader icon={Settings} title="Conta e Segurança" id="settings" />
          <SectionContent id="settings" onSave={() => handleSave('Configurações')}>
              
              {/* Notificações */}
              <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                          <Bell size={18} className="text-slate-400" />
                          <span className="font-bold text-sm">Notificações</span>
                      </div>
                      <div 
                        onClick={() => setFormData({...formData, notifications: !formData.notifications})}
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${formData.notifications ? 'bg-accent' : 'bg-slate-700'}`}
                      >
                          <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.notifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                  </div>
                  <p className="text-xs text-slate-400">Receba lembretes de treino e dicas de progresso.</p>
              </div>

              {/* Idioma */}
              <div className="mb-6">
                   <div className="flex items-center gap-2 mb-2">
                       <Globe size={18} className="text-slate-400" />
                       <span className="font-bold text-sm">Idioma</span>
                   </div>
                   <select 
                     value={formData.language}
                     onChange={(e) => setFormData({...formData, language: e.target.value})}
                     className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-accent"
                   >
                       <option value="pt-BR">Português (Brasil)</option>
                       <option value="en-US">English (US)</option>
                       <option value="es-ES">Español</option>
                   </select>
              </div>

              {/* Senha */}
              <div className="border-t border-slate-700 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                      <Lock size={18} className="text-slate-400" />
                      <span className="font-bold text-sm">Alterar Senha</span>
                  </div>
                  <input 
                      type="password" 
                      placeholder="Senha Atual"
                      value={passwordData.old}
                      onChange={(e) => setPasswordData({...passwordData, old: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 mb-3 text-white outline-none focus:border-accent text-sm"
                  />
                  <input 
                      type="password" 
                      placeholder="Nova Senha"
                      value={passwordData.new}
                      onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white outline-none focus:border-accent text-sm"
                  />
              </div>
          </SectionContent>
      </div>

      <button 
        onClick={handleLogout}
        className="w-full bg-red-500/10 p-4 rounded-xl border border-red-500/30 flex items-center justify-center gap-2 hover:bg-red-500/20 text-red-500 mt-8 font-bold transition-all"
      >
          <LogOut size={20} />
          Sair da Conta
      </button>
      
      <div className="text-center mt-6 text-xs text-slate-500">
          Fit Trainer v1.0.3
      </div>
    </div>
  );
};