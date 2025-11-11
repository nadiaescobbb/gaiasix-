"use client";

import { useState } from 'react';
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';

export default function AuthPage({ mode, onLogin, onRegister, onToggleMode }) {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    phone: '' 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

 
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const validateForm = () => {
    const newErrors = {};

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
        newErrors.phone = 'Teléfono inválido (mín. 10 dígitos)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));

      if (mode === 'login') {
        const result = onLogin(formData.email, formData.password);
        if (!result.success) {
          setErrors({ submit: result.error });
        } else {
          setSuccessMessage('¡Bienvenida de nuevo!');
        }
      } else {
        const result = onRegister(formData);
        if (!result.success) {
          setErrors({ submit: result.error });
        } else {
          setSuccessMessage('¡Cuenta creada exitosamente!');
        }
      }
    } catch (error) {
      setErrors({ submit: 'Ocurrió un error inesperado' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error al escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-light text-center mb-12">
          {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
        </h2>
        
        {/* Mensaje de error general */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-red-800">{errors.submit}</p>
          </div>
        )}

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded flex items-start gap-3">
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
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full pl-8 pr-0 py-3 border-b transition-colors outline-none ${
                      errors.name ? 'border-red-500' : 'border-gray-300 focus:border-black'
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Campo Teléfono */}
              <div>
                <div className="relative">
                  <Phone className="absolute left-0 top-3 text-gray-400" size={18} />
                  <input
                    type="tel"
                    placeholder="Teléfono (ej: +54 11 1234-5678)"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full pl-8 pr-0 py-3 border-b transition-colors outline-none ${
                      errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-black'
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
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
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full pl-8 pr-0 py-3 border-b transition-colors outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-300 focus:border-black'
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
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
                onChange={(e) => handleChange('password', e.target.value)}
                className={`w-full pl-8 pr-0 py-3 border-b transition-colors outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-300 focus:border-black'
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full border border-black py-4 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Procesando...' : (mode === 'login' ? 'Ingresar' : 'Registrarse')}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button
            onClick={onToggleMode}
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