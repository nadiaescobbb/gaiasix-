"use client";

import { useState } from 'react';

export default function AuthPage({ mode, onLogin, onRegister, onToggleMode }) {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    phone: '' 
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      const result = onLogin(formData.email, formData.password);
      if (!result.success) {
        setError(result.error);
      }
    } else {
      // Validaciones para registro
      if (!formData.name || !formData.phone) {
        setError('Por favor completa todos los campos');
        return;
      }
      
      const result = onRegister(formData);
      if (!result.success) {
        setError(result.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-light text-center mb-12">
          {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
        </h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                required
              />
            </>
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
            required
          />
          
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
            required
            minLength={6}
          />
          
          <button
            type="submit"
            className="w-full border border-black py-4 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 mt-8"
          >
            {mode === 'login' ? 'Ingresar' : 'Registrarse'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button
            onClick={onToggleMode}
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            {mode === 'login' ? 'Crear cuenta' : 'Ya tengo cuenta'}
          </button>
        </div>
      </div>
    </div>
  );
}