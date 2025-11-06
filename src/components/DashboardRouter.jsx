import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardRouter = () => {
  const { user } = useAuth();

  // Redirect based on user role
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'farmer':
      return <Navigate to="/dashboard/farmer" replace />;
    case 'buyer':
      return <Navigate to="/dashboard/buyer" replace />;
    case 'transport':
      return <Navigate to="/dashboard/transport" replace />;
    case 'storage':
      return <Navigate to="/dashboard/storage" replace />;
    default:
      return <Navigate to="/dashboard/buyer" replace />;
  }
};

export default DashboardRouter;