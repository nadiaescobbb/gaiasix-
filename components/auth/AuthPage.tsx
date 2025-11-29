"use client";

import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { type LoginResult, type RegisterResult, type RegisterUserData } from '../../lib/types';

interface AuthPageProps {
  mode: 'login' | 'register';
  onLogin: (email: string, password: string) => Promise<LoginResult>;
  onRegister: (userData: RegisterUserData) => Promise<RegisterResult>; 
  onToggleMode: () => void;
  error?: string;
}

interface FormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  confirmPassword?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  confirmPassword?: string;
  submit?: string;
}

// Validaciones mejoradas
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 8 && cleaned.length <= 15 && /^[0-9]+$/.test(cleaned);
};

const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (password.length < 6) {
    return { valid: false, error: 'Mínimo 6 caracteres' };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { valid: false, error: 'Al menos una minúscula' };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { valid: false, error: 'Al menos una mayúscula' };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { valid: false, error: 'Al menos un número' };
  }
  return { valid: true };
};

export default function AuthPage({ mode, onLogin, onRegister, onToggleMode, error }: AuthPageProps) {
  const [formData, setFormData] = useState<FormData>({ 
    email: '', 
    password: '', 
    name: '', 
    phone: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Debounce para mejor performance
  const debouncedSetFormData = useDebouncedCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, 300);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validación de email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.error;
      }
    }

    // Validaciones específicas de registro
    if (mode === 'register') {
      if (!formData.name.trim()) {
        newErrors.name = 'El nombre es requerido';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Mínimo 2 caracteres';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'El teléfono es requerido';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Teléfono inválido (8-15 dígitos)';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let result: LoginResult | RegisterResult;

      if (mode === 'login') {
        result = await onLogin(formData.email, formData.password);
        if (result.success) {
          setSuccessMessage('¡Bienvenida de nuevo! 👋');
          setFormData({ email: '', password: '', name: '', phone: '', confirmPassword: '' });
        } else {
          setErrors({ submit: result.error });
        }
      } else {
        const { confirmPassword, ...userData } = formData;
        result = await onRegister(userData);
        
        if (result.success) {
          setSuccessMessage('¡Cuenta creada exitosamente! 🎊');
          setFormData({ email: '', password: '', name: '', phone: '', confirmPassword: '' });
        } else {
          setErrors({ submit: result.error });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({ submit: 'Error de conexión. Intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback((field: keyof FormData, value: string): void => {
    debouncedSetFormData(field, value);
    
    // Limpiar error específico inmediatamente
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Limpiar error general al modificar cualquier campo
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  }, [errors, debouncedSetFormData]);

  const handleToggleMode = (): void => {
    setErrors({});
    setSuccessMessage('');
    setFormData({ email: '', password: '', name: '', phone: '', confirmPassword: '' });
    onToggleMode();
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-light text-center mb-12">
          {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
        </h2>
        
        {/* Mensaje de error general */}
        {(errors.submit || error) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start gap-3 animate-fade-in">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-red-800">{errors.submit || error}</p>
          </div>
        )}

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded flex items-start gap-3 animate-fade-in">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <>
              {/* Campo Nombre */}
              <div>
                <div className="relative">
                  <User className="absolute left-0 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                    className={`w-full pl-8 pr-4 py-3 border-b transition-colors outline-none ${
                      errors.name ? 'border-red-500' : 'border-gray-300 focus:border-black'
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.name}</p>
                )}
              </div>

              {/* Campo Teléfono */}
              <div>
                <div className="relative">
                  <Phone className="absolute left-0 top-3 text-gray-400" size={18} />
                  <input
                    type="tel"
                    placeholder="Teléfono (ej: 11 1234-5678)"
                    value={formData.phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
                    className={`w-full pl-8 pr-4 py-3 border-b transition-colors outline-none ${
                      errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-black'
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.phone}</p>
                )}
              </div>
            </>
          )}
          
          {/* Campo Email */}
          <div>
            <div className="relative">
              <Mail className="absolute left-0 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                className={`w-full pl-8 pr-4 py-3 border-b transition-colors outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-300 focus:border-black'
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.email}</p>
            )}
          </div>
          
          {/* Campo Contraseña */}
          <div>
            <div className="relative">
              <Lock className="absolute left-0 top-3 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña (mín. 6 caracteres)"
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
                className={`w-full pl-8 pr-12 py-3 border-b transition-colors outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-300 focus:border-black'
                }`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.password}</p>
            )}
          </div>

          {/* Campo Confirmar Contraseña (solo registro) */}
          {mode === 'register' && (
            <div>
              <div className="relative">
                <Lock className="absolute left-0 top-3 text-gray-400" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('confirmPassword', e.target.value)}
                  className={`w-full pl-8 pr-12 py-3 border-b transition-colors outline-none ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-black'
                  }`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-0 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.confirmPassword}</p>
              )}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full border border-black py-4 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Procesando...
              </>
            ) : (
              mode === 'login' ? 'Ingresar' : 'Registrarse'
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button
            onClick={handleToggleMode}
            disabled={isSubmitting}
            className="text-sm text-gray-600 hover:text-black transition-colors disabled:opacity-50"
          >
            {mode === 'login' ? '¿No tenés cuenta? Crear una' : '¿Ya tenés cuenta? Ingresar'}
          </button>
        </div>

      </div>
    </div>
  );
}