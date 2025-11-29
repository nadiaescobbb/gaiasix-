"use client";

import AuthPage from '../../components/auth/AuthPage';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useAuthForm } from '../../hooks/useAuthForm';

export default function AuthRoute() {
  const {
    mode,
    isLoading,
    error,
    handleLogin,
    handleRegister,
    handleToggleMode
  } = useAuthForm();

  if (isLoading) {
    return <LoadingSpinner message="Procesando..." />;
  }

  return (
    <AuthPage 
      mode={mode}
      onLogin={handleLogin}
      onRegister={handleRegister}
      onToggleMode={handleToggleMode}
      error={error || undefined}
    />
  );
}