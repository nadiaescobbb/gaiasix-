"use client";

import { useState, ChangeEvent, FormEvent, useCallback, useMemo, useEffect } from 'react';
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { type LoginResult, type RegisterResult, type RegisterUserData } from '../../lib/types';

interface AuthPageProps {
  mode: 'login' | 'register';
  onLogin: (email: string, password: string) => Promise<LoginResult>;
  onRegister: (userData: RegisterUserData) => Promise<RegisterResult>; 
  onToggleMode: () => void;
  error?: string;
  successMessage?: string;
  onClearError?: () => void;
  onClearSuccess?: () => void;
}

interface FormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  confirmPassword?: string;
}

// Validaciones simplificadas y optimizadas
const validateEmail = (email: string): string => {
  if (!email.trim()) return 'El email es requerido';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? '' : 'Email inválido';
};

const validatePassword = (password: string): string => {
  if (!password) return 'La contraseña es requerida';
  if (password.length < 6) return 'Mínimo 6 caracteres';
  return '';
};

const validateName = (name: string): string => {
  if (!name.trim()) return 'El nombre es requerido';
  if (name.trim().length < 2) return 'Mínimo 2 caracteres';
  return '';
};

const validatePhone = (phone: string): string => {
  if (!phone.trim()) return 'El teléfono es requerido';
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 8 && cleaned.length <= 15 ? '' : 'Teléfono inválido';
};

const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) return 'Confirma tu contraseña';
  return password === confirmPassword ? '' : 'Las contraseñas no coinciden';
};

export default function AuthPage({ 
  mode, 
  onLogin, 
  onRegister, 
  onToggleMode, 
  error,
  successMessage,
  onClearError,
  onClearSuccess
}: AuthPageProps) {
  const [formData, setFormData] = useState<FormData>({ 
    email: '', 
    password: '', 
    name: '', 
    phone: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Auto-limpiar mensaje de éxito después de 5 segundos
  useEffect(() => {
    if (successMessage && onClearSuccess) {
      const timer = setTimeout(() => {
        onClearSuccess();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage, onClearSuccess]);

  // Validaciones en tiempo real optimizadas
  const errors = useMemo(() => {
    const newErrors: Record<string, string> = {};
    
    if (formData.email) newErrors.email = validateEmail(formData.email);
    if (formData.password) newErrors.password = validatePassword(formData.password);
    
    if (mode === 'register') {
      if (formData.name) newErrors.name = validateName(formData.name);
      if (formData.phone) newErrors.phone = validatePhone(formData.phone);
      if (formData.confirmPassword) {
        newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
      }
    }
    
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });
    
    return { ...localErrors, ...newErrors };
  }, [formData, mode, localErrors]);

  const handleChange = useCallback((field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (localErrors[field]) {
      setLocalErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    if (error && onClearError) {
      onClearError();
    }
  }, [error, localErrors, onClearError]);

  const validateForm = (): boolean => {
    const submitErrors: Record<string, string> = {};
    
    submitErrors.email = validateEmail(formData.email);
    submitErrors.password = validatePassword(formData.password);
    
    if (mode === 'register') {
      submitErrors.name = validateName(formData.name);
      submitErrors.phone = validatePhone(formData.phone);
      submitErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword || '');
    }
    
    const hasErrors = Object.values(submitErrors).some(error => error !== '');
    
    if (hasErrors) {
      const filteredErrors: Record<string, string> = {};
      Object.keys(submitErrors).forEach(key => {
        if (submitErrors[key]) filteredErrors[key] = submitErrors[key];
      });
      
      setLocalErrors(filteredErrors);
      return false;
    }
    
    setLocalErrors({});
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (onClearError) onClearError();
    if (onClearSuccess) onClearSuccess();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await onLogin(formData.email, formData.password);
      } else {
        const { confirmPassword, ...userData } = formData;
        await onRegister(userData);
        
        if (!error) {
          setFormData({ email: '', password: '', name: '', phone: '', confirmPassword: '' });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleMode = (): void => {
    setFormData({ email: '', password: '', name: '', phone: '', confirmPassword: '' });
    setLocalErrors({});
    if (onClearError) onClearError();
    if (onClearSuccess) onClearSuccess();
    onToggleMode();
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(prev => !prev);
  };

  const canSubmit = mode === 'login' 
    ? formData.email && formData.password && !errors.email && !errors.password
    : formData.email && formData.password && formData.name && formData.phone && formData.confirmPassword &&
      !errors.email && !errors.password && !errors.name && !errors.phone && !errors.confirmPassword;

  return (
    <div className="min-h-screen bg-gaia-white flex items-center justify-center px-6 py-12 pt-24">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="logo-gaia text-3xl mb-4">
            GAIA<span className="text-gaia-crimson">SIX</span>
          </div>
          <h2 className="text-2xl font-light font-display">
            {mode === 'login' ? 'Acceder' : 'Unirse'}
          </h2>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-red-800 font-body">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm flex items-start gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-green-800 font-body">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <>
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gaia-silver" size={18} />
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                    className={`input-gaia pl-12 ${errors.name ? 'border-red-500' : ''}`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-xs text-red-600 font-body">{errors.name}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gaia-silver" size={18} />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
                    className={`input-gaia pl-12 ${errors.phone ? 'border-red-500' : ''}`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-xs text-red-600 font-body">{errors.phone}</p>
                )}
              </div>
            </>
          )}
          
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gaia-silver" size={18} />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                className={`input-gaia pl-12 ${errors.email ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-xs text-red-600 font-body">{errors.email}</p>
            )}
          </div>
          
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gaia-silver" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
                className={`input-gaia pl-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gaia-silver hover:text-gaia-black transition-colors"
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-xs text-red-600 font-body">{errors.password}</p>
            )}
          </div>

          {mode === 'register' && (
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gaia-silver" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('confirmPassword', e.target.value)}
                  className={`input-gaia pl-12 pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-3 text-gaia-silver hover:text-gaia-black transition-colors"
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-red-600 font-body">{errors.confirmPassword}</p>
              )}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting || !canSubmit}
            className="btn-gaia-primary w-full disabled:bg-gaia-silver disabled:cursor-not-allowed mt-8"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="spinner-gaia w-4 h-4 border-2 border-gaia-white border-t-transparent" />
                {mode === 'login' ? 'Accediendo...' : 'Creando cuenta...'}
              </div>
            ) : (
              mode === 'login' ? 'Acceder' : 'Crear cuenta'
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center pt-6 border-t border-gaia-border">
          <button
            onClick={handleToggleMode}
            disabled={isSubmitting}
            className="text-sm text-gaia-silver hover:text-gaia-black transition-colors font-body disabled:opacity-50"
          >
            {mode === 'login' ? '¿Nuevo en Gaia Six? Crear cuenta' : '¿Ya tienes cuenta? Acceder'}
          </button>
        </div>
      </div>
    </div>
  );
}