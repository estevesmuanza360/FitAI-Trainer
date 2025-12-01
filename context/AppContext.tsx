import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, WorkoutPlan } from '../types';

interface AppContextType {
  user: UserProfile | null;
  workoutPlan: WorkoutPlan | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  trialStatus: {
    isActive: boolean;
    daysRemaining: number;
    isExpired: boolean;
  };
  login: (email: string) => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  setWorkoutPlan: (plan: WorkoutPlan) => void;
  subscribe: () => void;
  waterIntake: number;
  addWater: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const TRIAL_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

export const AppProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [workoutPlan, setWorkoutPlanState] = useState<WorkoutPlan | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('fitai_user');
    const storedPlan = localStorage.getItem('fitai_plan');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    if (storedPlan) {
      setWorkoutPlanState(JSON.parse(storedPlan));
    }
    setIsLoading(false);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (user) localStorage.setItem('fitai_user', JSON.stringify(user));
    else localStorage.removeItem('fitai_user');
  }, [user]);

  useEffect(() => {
    if (workoutPlan) localStorage.setItem('fitai_plan', JSON.stringify(workoutPlan));
  }, [workoutPlan]);

  const login = (email: string) => {
    // Mock login - checks if user exists, else creates partial
    if (!user) {
       const newUser: UserProfile = {
        id: 'user_123',
        name: 'Usuário',
        username: 'atleta_fit',
        email,
        onboardingComplete: false,
        trialStartDate: new Date().toISOString(),
        isSubscribed: false,
        age: 25,
        weight: 70,
        height: 175,
        gender: 'male',
        goal: 'weight_loss',
        experienceLevel: 'beginner',
        location: 'home',
        availableTime: 30,
        equipment: [],
        notifications: true,
        language: 'pt-BR'
      };
      setUser(newUser);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setWorkoutPlanState(null);
    setIsAuthenticated(false);
    localStorage.clear();
  };

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  const setWorkoutPlan = (plan: WorkoutPlan) => {
    setWorkoutPlanState(plan);
  };

  const subscribe = () => {
    if (user) {
      updateUser({ isSubscribed: true });
    }
  };

  const addWater = () => setWaterIntake(prev => prev + 250);

  // Trial Logic
  const getTrialStatus = () => {
    if (!user) return { isActive: false, daysRemaining: 0, isExpired: false };
    if (user.isSubscribed) return { isActive: true, daysRemaining: 999, isExpired: false };

    const start = new Date(user.trialStartDate).getTime();
    const now = new Date().getTime();
    const elapsed = now - start;
    const remaining = Math.max(0, Math.ceil((TRIAL_DURATION_MS - elapsed) / (1000 * 60 * 60 * 24)));
    
    return {
      isActive: elapsed < TRIAL_DURATION_MS,
      daysRemaining: remaining,
      isExpired: elapsed >= TRIAL_DURATION_MS
    };
  };

  return (
    <AppContext.Provider
      value={{
        user,
        workoutPlan,
        isAuthenticated,
        isLoading,
        trialStatus: getTrialStatus(),
        login,
        logout,
        updateUser,
        setWorkoutPlan,
        subscribe,
        waterIntake,
        addWater
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};