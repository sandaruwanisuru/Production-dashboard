import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Utility function to check if the user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null && token !== ''; // Ensure token is not empty
  };

  // If not authenticated, navigate to the login page
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Render the children (protected content) if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
