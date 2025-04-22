import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiClient.get('/api/auth/token'); // Coba refresh token
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Event listener untuk mendeteksi perubahan accessToken di localStorage
    const handleStorageChange = (event) => {
      if (event.key === 'accessToken' && !event.newValue) {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (isAuthenticated === null) return null; // Bisa diganti loading spinner

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
