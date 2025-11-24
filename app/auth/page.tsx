// app/auth/page.tsx
"use client";

import { useState } from 'react';
import AuthPage from '../../components/auth/AuthPage';
import { type LoginResult, type RegisterResult, type RegisterUserData } from '../../lib/types';
import { useAppContext } from '../../context/AppContext';

export default function AuthRoute() {
  const { login, register } = useAppContext();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleLogin = async (email: string, password: string): Promise<LoginResult> => {
    return await login(email, password);
  };

  const handleRegister = async (userData: RegisterUserData): Promise<RegisterResult> => {
    return await register(userData);
  };

  const handleToggleMode = (): void => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
  };

  return (
    <AuthPage 
      mode={mode}
      onLogin={handleLogin}
      onRegister={handleRegister}
      onToggleMode={handleToggleMode}
    />
  );
}