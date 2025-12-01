export interface UserProfile {
  id: string;
  name: string;
  username?: string;
  email: string;
  onboardingComplete: boolean;
  trialStartDate: string; // ISO Date string
  isSubscribed: boolean;
  
  // Physical Stats
  age: number;
  weight: number; // kg
  height: number; // cm
  gender: 'male' | 'female' | 'other';
  
  // Goals & Preferences
  goal: 'weight_loss' | 'muscle_gain' | 'endurance' | 'maintenance';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  location: 'gym' | 'home' | 'outdoor';
  availableTime: number; // minutes
  equipment: string[];

  // Settings
  notifications?: boolean;
  language?: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  duration?: number; // seconds (optional)
  rest: number; // seconds
  notes?: string;
}

export interface WorkoutDay {
  day: number;
  title: string;
  focus: string;
  exercises: Exercise[];
  estimatedDuration: number; // minutes
  caloriesBurn: number;
}

export interface WorkoutPlan {
  id: string;
  createdAt: string;
  explanation: string;
  days: WorkoutDay[];
}

export interface NutritionTip {
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export enum AppRoute {
  WELCOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  ONBOARDING = '/onboarding',
  SETUP = '/setup',
  DASHBOARD = '/dashboard',
  WORKOUT = '/workout',
  NUTRITION = '/nutrition',
  PROGRESS = '/progress',
  PROFILE = '/profile',
  SUBSCRIBE = '/subscribe',
  GENERATE = '/generate',
}