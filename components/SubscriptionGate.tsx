import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const SubscriptionGate = ({ children }: React.PropsWithChildren<{}>) => {
  const { trialStatus, isLoading } = useApp();

  if (isLoading) return null;

  if (trialStatus.isExpired) {
    return <Navigate to="/subscribe" replace />;
  }

  return <>{children}</>;
};