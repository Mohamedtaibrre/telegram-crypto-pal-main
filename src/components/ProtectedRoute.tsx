
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

// List of admin Telegram IDs
const ADMIN_TELEGRAM_IDS = ['6393055430']; // Admin Telegram ID

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  // Show loading while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-crypto-dark text-white">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p>جاري التحميل...</p>
      </div>
    </div>;
  }
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Additional check for admin routes
  if (adminOnly && user && !ADMIN_TELEGRAM_IDS.includes(user.telegramId)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
