"use client";

import AuthPage from '../../components/auth/AuthPage';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useAuthForm } from '../../hooks/useAuthForm';

export default function AuthRoute() {
  const {
    mode,
    isLoading,
    error,
    successMessage,
    handleLogin,
    handleRegister,
    handleToggleMode,
    clearError,
    clearSuccess
  } = useAuthForm();

  // Mostrar spinner mientras se inicializa
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gaia-white">
        <LoadingSpinner message="Preparando tu experiencia..." />
      </div>
    );
  }

  return (
    <AuthPage 
      mode={mode}
      onLogin={handleLogin}
      onRegister={handleRegister}
      onToggleMode={handleToggleMode}
      error={error || undefined}
      successMessage={successMessage || undefined}
      onClearError={clearError}
      onClearSuccess={clearSuccess}
    />
  );
}