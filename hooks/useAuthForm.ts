import { useState, useCallback, useEffect } from 'react';
import { type LoginResult, type RegisterResult, type RegisterUserData } from '../lib/types';
import { useAppContext } from '../context/AppContext';

export const useAuthForm = () => {
  const { login, register, currentUser } = useAppContext();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Resetear mensajes cuando el usuario cambia
  useEffect(() => {
    if (currentUser) {
      setSuccessMessage('');
      setError(null);
    }
  }, [currentUser]);

  const handleLogin = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      const result = await login(email, password);
      if (result.success) {
        setSuccessMessage('¡Bienvenido de nuevo! 🎉');
      } else {
        setError(result.error || 'Error en el login');
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de conexión';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const handleRegister = useCallback(async (userData: RegisterUserData): Promise<RegisterResult> => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      const result = await register(userData);
      if (result.success) {
        setSuccessMessage('¡Cuenta creada exitosamente! 🎊');
      } else {
        setError(result.error || 'Error en el registro');
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de conexión';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [register]);

  const handleToggleMode = useCallback((): void => {
    setError(null);
    setSuccessMessage('');
    setMode(prev => prev === 'login' ? 'register' : 'login');
  }, []);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  const clearSuccess = useCallback((): void => {
    setSuccessMessage('');
  }, []);

  return {
    mode,
    isLoading,
    error,
    successMessage,
    handleLogin,
    handleRegister,
    handleToggleMode,
    clearError,
    clearSuccess,
    setMode
  };
};