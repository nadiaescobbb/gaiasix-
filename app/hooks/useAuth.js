import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setLoading(true);
    const result = await authService.getCurrentUser();
    if (result.success) {
      setUser(result.user);
    }
    setLoading(false);
  };

  const register = async (userData) => {
    const result = await authService.register(userData);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const logout = async () => {
    const result = await authService.logout();
    if (result.success) {
      setUser(null);
    }
    return result;
  };

  const updateUser = async (updatedData) => {
    if (!user) return { success: false, error: 'No user logged in' };
    
    const result = await authService.updateUser(user.email, updatedData);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateUser,
  };
};