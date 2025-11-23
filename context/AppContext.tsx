"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { type LoginResult, type RegisterResult, type RegisterUserData } from '.../../../lib/types';
import { logger, logErrorWithContext } from '.../../../lib/logger'; 

// ===================================================
// TYPES
// ===================================================

interface AuthPageProps {
  mode: 'login' | 'register';
  onLogin: (email: string, password: string) => Promise<LoginResult>;
  onRegister: (userData: RegisterUserData) => Promise<RegisterResult>; 
  onToggleMode: () => void;
}

interface FormData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  submit?: string;
}

// ===================================================
// AUTH PAGE COMPONENT
// ===================================================

export default function AuthPage({ mode, onLogin, onRegister, onToggleMode }: AuthPageProps) {
  const [formData, setFormData] = useState<FormData>({ 
    email: '', 
    password: '', 
    name: '', 
    phone: '' 
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 8;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    if (mode === 'register') {
      if (!formData.name.trim()) {
        newErrors.name = 'El nombre es requerido';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Mínimo 2 caracteres';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'El teléfono es requerido';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Teléfono inválido (mín. 8 dígitos)';
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
          // Limpiar formulario
          setFormData({ email: '', password: '', name: '', phone: '' });
        } else {
          setErrors({ submit: result.error });
          // ✅ USO DEL LOGGER
          logErrorWithContext('Login failed', { email: formData.email, error: result.error });
        }
      } else {
        result = await onRegister({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone
        });
        
        if (result.success) {
          setSuccessMessage('¡Cuenta creada exitosamente! 🎊');
          // Limpiar formulario
          setFormData({ email: '', password: '', name: '', phone: '' });
          // ✅ USO DEL LOGGER
          logger.info(`User registered: ${formData.email}`);
        } else {
          setErrors({ submit: result.error });
          // ✅ USO DEL LOGGER
          logErrorWithContext('Registration failed', { email: formData.email, error: result.error });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({ submit: 'Error de conexión. Intenta nuevamente.' });
      // ✅ USO DEL LOGGER
      logErrorWithContext('Auth connection error', { email: formData.email, error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error al escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    // Limpiar error general al modificar cualquier campo
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  const handleToggleMode = (): void => {
    setErrors({});
    setSuccessMessage('');
    setFormData({ email: '', password: '', name: '', phone: '' });
    onToggleMode();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-light text-center mb-12">
          {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
        </h2>
        
        {/* Mensaje de error general */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start gap-3 animate-fade-in">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-red-800">{errors.submit}</p>
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
                    className={`w-full pl-8 pr-0 py-3 border-b transition-colors outline-none ${
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
                    className={`w-full pl-8 pr-0 py-3 border-b transition-colors outline-none ${
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
                className={`w-full pl-8 pr-0 py-3 border-b transition-colors outline-none ${
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
                type="password"
                placeholder="Contraseña (mín. 6 caracteres)"
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
                className={`w-full pl-8 pr-0 py-3 border-b transition-colors outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-300 focus:border-black'
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.password}</p>
            )}
          </div>
          
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