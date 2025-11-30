"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// ✅ IMPORTACIONES 
import { 
  type Toast, 
  type ToastType, 
  type ToastContextType,
  type ToastProviderProps
} from '../lib/types';

// ==========================================
// TOAST CONTEXT
// ==========================================

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

// ==========================================
// TOAST PROVIDER (MANTENIDO - SOLO ESTILOS CAMBIAN)
// ==========================================

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'success', duration: number = 4000): number => {
    const id = Date.now();
    const toast: Toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  }, []);

  const removeToast = useCallback((id: number): void => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message: string, duration?: number): number => 
    addToast(message, 'success', duration), [addToast]);
  
  const error = useCallback((message: string, duration?: number): number => 
    addToast(message, 'error', duration), [addToast]);
  
  const warning = useCallback((message: string, duration?: number): number => 
    addToast(message, 'warning', duration), [addToast]);

  const info = useCallback((message: string, duration?: number): number => 
    addToast(message, 'info', duration), [addToast]);

  const contextValue: ToastContextType = {
    success,
    error,
    warning,
    info,
    addToast,
    removeToast,
    toasts, 
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

// ==========================================
// TOAST CONTAINER GAIA SIX
// ==========================================

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-[9999] space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

// ==========================================
// TOAST COMPONENT - ESTILO GAIA SIX
// ==========================================

interface ToastComponentProps {
  toast: Toast;
  onRemove: (id: number) => void;
}

function Toast({ toast, onRemove }: ToastComponentProps) {
  // Iconos Gaia Six
  const icons = {
    success: <CheckCircle size={20} className="text-gaia-crimson" />,
    error: <XCircle size={20} className="text-gaia-crimson" />,
    warning: <AlertCircle size={20} className="text-gaia-crimson" />,
    info: <Info size={20} className="text-gaia-crimson" />,
  };

  // Colores Gaia Six
  const colors = {
    success: 'bg-gaia-white border-gaia-border shadow-lg',
    error: 'bg-gaia-white border-gaia-border shadow-lg',
    warning: 'bg-gaia-white border-gaia-border shadow-lg',
    info: 'bg-gaia-white border-gaia-border shadow-lg',
  };

  // Títulos por tipo - Copywriting Editorial
  const titles = {
    success: 'Completado',
    error: 'Atención',
    warning: 'Importante', 
    info: 'Información',
  };

  return (
    <div 
      className={`
        ${colors[toast.type]}
        border rounded-sm p-4 pr-12 
        min-w-[320px] max-w-md
        pointer-events-auto
        animate-slide-in-right-gaia
        backdrop-blur-sm
        relative
        group
      `}
      role="alert"
    >
      {/* Barra de progreso sutil */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gaia-crimson/20 overflow-hidden">
        <div 
          className="h-full bg-gaia-crimson transition-all duration-linear"
          style={{ 
            animation: `shrinkWidth ${toast.duration}ms linear forwards` 
          }}
        />
      </div>

      <div className="flex items-start gap-4">
        {/* Icono */}
        <div className="flex-shrink-0 mt-0.5">
          {icons[toast.type]}
        </div>
        
        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs uppercase tracking-widest text-gaia-silver font-medium mb-1 font-body">
            {titles[toast.type]}
          </h4>
          <p className="text-sm text-gaia-black leading-relaxed font-body">
            {toast.message}
          </p>
        </div>
        
        {/* Botón cerrar - Estilo Gaia */}
        <button
          onClick={() => onRemove(toast.id)}
          className="absolute top-3 right-3 p-1 hover:bg-gaia-charcoal/5 rounded-sm transition-all duration-200 group-hover:opacity-100 opacity-70"
          aria-label="Cerrar notificación"
        >
          <X size={16} className="text-gaia-silver hover:text-gaia-crimson transition-colors" />
        </button>
      </div>

      {/* Estilos de animación para la barra de progreso */}
      <style jsx>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}