import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';

// Pages
import { Welcome } from './pages/Welcome';
import { Auth } from './pages/Auth';
import { Onboarding } from './pages/Onboarding';
import { Setup } from './pages/Setup';
import { Dashboard } from './pages/Dashboard';
import { WorkoutSession } from './pages/WorkoutSession';
import { Generate } from './pages/Generate';
import { Nutrition } from './pages/Nutrition';
import { Progress } from './pages/Progress';
import { Profile } from './pages/Profile';
import { Subscribe } from './pages/Subscribe';
import { Checkout } from './pages/Checkout';

const RequireAuth = ({ children }: React.PropsWithChildren<{}>) => {
  const { isAuthenticated, isLoading } = useApp();
  if (isLoading) return null; // Or a spinner
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Protected Routes */}
        <Route path="/setup" element={<RequireAuth><Setup /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/workout" element={<RequireAuth><WorkoutSession /></RequireAuth>} />
        <Route path="/generate" element={<RequireAuth><Generate /></RequireAuth>} />
        <Route path="/nutrition" element={<RequireAuth><Nutrition /></RequireAuth>} />
        <Route path="/progress" element={<RequireAuth><Progress /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/subscribe" element={<RequireAuth><Subscribe /></RequireAuth>} />
        <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
      </Routes>
    </Layout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
}