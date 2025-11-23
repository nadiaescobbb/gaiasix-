"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { logger, logUserAction, logErrorWithContext } from '../../lib/logger';

// ==========================================
// TYPES
// ==========================================

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  submit?: string;
}

// ==========================================
// CONTACT PAGE
// ==========================================

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // ==========================================
  // VALIDACIÓN
  // ==========================================

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // HANDLERS
  // ==========================================

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo al escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrors({});
    setSubmitSuccess(false);

    if (!validateForm()) {
      logger.warn('Formulario de contacto con errores de validación');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      logUserAction('contact_form_submit', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject
      });

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000);

    } catch (error) {
      logErrorWithContext(error, {
        function: 'handleContactSubmit',
        formData: { ...formData, message: '[hidden]' },
        timestamp: new Date().toISOString()
      });
      setErrors({ submit: 'Error al enviar el mensaje. Intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section className="relative h-[40vh] md:h-[50vh] bg-black overflow-hidden">
        {/* Background Image con Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/contact-hero.jpg)',
              filter: 'brightness(0.4)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-6">
            <span className="text-xs tracking-[0.3em] uppercase text-white/80 mb-4 block">
              Hablemos
            </span>
            <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-tight">
              Contacto
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto">
              Escribinos cuando quieras. Te respondemos lo antes posible.
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </section>

      {/* ==========================================
          MAIN CONTENT
          ========================================== */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* ==========================================
                INFORMACIÓN DE CONTACTO (2 columnas)
                ========================================== */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Header */}
              <div className="pb-8 border-b border-gray-200">
                <span className="text-xs text-[#AF161F] tracking-[0.2em] uppercase font-medium">
                  Nuestros Datos
                </span>
                <h2 className="text-3xl font-light mt-3 mb-4">
                  Conectá con nosotros
                </h2>
                <p className="text-gray-600 leading-relaxed">
                 Consultas, pedidos o lo que necesites. Estamos del otro lado.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                
                {/* Email */}
                <a 
                  href="mailto:gaiashowroom@gmail.com"
                  className="group block p-6 border border-gray-200 hover:border-[#AF161F] transition-all duration-300 bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 group-hover:bg-[#AF161F] rounded-full flex items-center justify-center transition-colors duration-300">
                      <Mail className="text-gray-600 group-hover:text-white transition-colors" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                        Email
                      </h3>
                      <p className="text-lg font-light text-gray-900 group-hover:text-[#AF161F] transition-colors">
                        gaiashowroom@gmail.com
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                       Respondemos dentro del día o al siguiente.
                      </p>
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/5492964479923"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 border border-gray-200 hover:border-[#AF161F] transition-all duration-300 bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 group-hover:bg-[#AF161F] rounded-full flex items-center justify-center transition-colors duration-300">
                      <Phone className="text-gray-600 group-hover:text-white transition-colors" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                        WhatsApp
                      </h3>
                      <p className="text-lg font-light text-gray-900 group-hover:text-[#AF161F] transition-colors">
                        +54 9 2964 479923
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Te respondemos en horario comercial.
                      </p>
                    </div>
                  </div>
                </a>

                {/* Ubicación */}
                <div className="p-6 border border-gray-200 bg-gray-50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <MapPin className="text-gray-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                        Showroom
                      </h3>
                      <p className="text-lg font-light text-gray-900">
                        Río Grande
                      </p>
                      <p className="text-gray-600">
                        Tierra del Fuego, Argentina
                      </p>
                      <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                        <Clock size={14} />
                        Solo con cita previa
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <a 
                  href="https://instagram.com/gaiasix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 border border-gray-200 hover:border-[#AF161F] transition-all duration-300 bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 group-hover:bg-[#AF161F] rounded-full flex items-center justify-center transition-colors duration-300">
                      <Instagram className="text-gray-600 group-hover:text-white transition-colors" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                        Instagram
                      </h3>
                      <p className="text-lg font-light text-gray-900 group-hover:text-[#AF161F] transition-colors">
                        @gaiasix
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                       Ahí subimos lanzamientos y novedades.
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Horarios */}
              <div className="p-6 bg-black text-white">
                <h3 className="text-xs uppercase tracking-[0.2em] text-white/60 mb-4">
                  Horarios de Atención
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/80">Lunes - Viernes</span>
                    <span className="font-light">16:00 - 21:00hs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Sábados</span>
                    <span className="font-light">16:00 - 10:00hs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Domingos</span>
                    <span className="font-light">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================
                FORMULARIO (3 columnas)
                ========================================== */}
            <div className="lg:col-span-3">
              <div className="bg-gray-50 p-8 md:p-12">
                
                {/* Header */}
                <div className="mb-8">
                  <span className="text-xs text-[#AF161F] tracking-[0.2em] uppercase font-medium">
                    Escribinos
                  </span>
                  <h2 className="text-3xl font-light mt-3 mb-2">
                    Dejanos tu mensaje
                  </h2>
                  <p className="text-gray-600">
                    Dejanos tu mensaje y te escribimos ni bien podamos.
                  </p>
                </div>

                {/* Success Message */}
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded flex items-start gap-3 animate-fade-in">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                       ¡Listo! Recibimos tu mensaje.
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                       Te respondemos a {formData.email} en breve.
                    </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start gap-3 animate-fade-in">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-red-800">{errors.submit}</p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Grid 2 columnas para nombre y email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* Nombre */}
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-xs uppercase tracking-wider text-gray-600 mb-2"
                      >
                        Nombre *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                        className={`w-full bg-white border px-4 py-3 transition-colors outline-none ${
                          errors.name 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-gray-300 focus:border-black'
                        }`}
                        placeholder="nombre"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-xs uppercase tracking-wider text-gray-600 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                        className={`w-full bg-white border px-4 py-3 transition-colors outline-none ${
                          errors.email 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-gray-300 focus:border-black'
                        }`}
                        placeholder="email@ejemplo.com"
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Grid 2 columnas para teléfono y asunto */}
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* Teléfono */}
                    <div>
                      <label 
                        htmlFor="phone" 
                        className="block text-xs uppercase tracking-wider text-gray-600 mb-2"
                      >
                        Teléfono (opcional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
                        className="w-full bg-white border border-gray-300 focus:border-black px-4 py-3 transition-colors outline-none"
                        placeholder="+54 11 1234-5678"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Asunto */}
                    <div>
                      <label 
                        htmlFor="subject" 
                        className="block text-xs uppercase tracking-wider text-gray-600 mb-2"
                      >
                        Asunto (opcional)
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange('subject', e.target.value)}
                        className="w-full bg-white border border-gray-300 focus:border-black px-4 py-3 transition-colors outline-none"
                        disabled={isSubmitting}
                      >
                        <option value="">Seleccionar...</option>
                        <option value="consulta">Consulta general</option>
                        <option value="pedido">Consulta sobre pedido</option>
                        <option value="producto">Consulta sobre producto</option>
                        <option value="envio">Consulta sobre envío</option>
                        <option value="colaboracion">Colaboración</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-xs uppercase tracking-wider text-gray-600 mb-2"
                    >
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange('message', e.target.value)}
                      className={`w-full bg-white border px-4 py-3 transition-colors outline-none resize-none ${
                        errors.message 
                          ? 'border-red-500 focus:border-red-600' 
                          : 'border-gray-300 focus:border-black'
                      }`}
                      placeholder="Contanos en qué podemos ayudarte..."
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600 animate-fade-in">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-4 px-8 text-sm uppercase tracking-widest hover:bg-[#AF161F] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Info adicional */}
                  <p className="text-xs text-gray-500 text-center">
                    * Campos obligatorios. Tus datos están protegidos y no serán compartidos.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FAQ SECTION
          ========================================== */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs text-[#AF161F] tracking-[0.2em] uppercase font-medium">
              FAQ
            </span>
            <h2 className="text-3xl font-light mt-3 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: '¿Cuál es el tiempo de respuesta?',
                a: 'Respondemos dentro de 24-48hs hábiles.'
              },
              {
                q: '¿Puedo visitar el showroom?',
                a: 'Sí, con cita previa. Escribinos por WhatsApp para coordinar'
              },
              {
                q: '¿Hacen envíos a todo el país?',
                a: 'Sí, enviamos a todo el país. El costo depende de la zona.'
              },
              {
                q: '¿Puedo cambiar un producto?',
                a: 'Sí, podés cambiar dentro de los 7 días. Podés ver la política completa en nuestra web.'
              }
            ].map((faq, index) => (
              <details 
                key={index}
                className="group bg-white border border-gray-200 p-6 hover:border-[#AF161F] transition-colors"
              >
                <summary className="font-light text-lg cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-2xl text-gray-400 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}