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
// TOAST PROVIDER
// ==========================================

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'success', duration: number = 3000): number => {
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

const contextValue: ToastContextType = {
  success,
  error,
  warning,
  info: useCallback((message: string, duration?: number) => 
    addToast(message, 'info', duration), [addToast]), 
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
// TOAST CONTAINER
// ==========================================

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

// ==========================================
// TOAST COMPONENT (CON LUCIDE-REACT)
// ==========================================

interface ToastComponentProps {
  toast: Toast;
  onRemove: (id: number) => void;
}

function Toast({ toast, onRemove }: ToastComponentProps) {
  const icons = {
    success: <CheckCircle size={20} className="text-green-600" />,
    error: <XCircle size={20} className="text-red-600" />,
    warning: <AlertCircle size={20} className="text-yellow-600" />,
    info: <Info size={20} />, //
  };

  const colors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-500 text-blue-700',
  };
  

  return (
    <div 
      className={`
        ${colors[toast.type]}
        border rounded-lg shadow-lg p-4 pr-12 
        min-w-[300px] max-w-md
        pointer-events-auto
        animate-slide-in-right
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {icons[toast.type]}
        </div>
        <p className="text-sm text-gray-800 flex-1">{toast.message}</p>
        <button
          onClick={() => onRemove(toast.id)}
          className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded transition-colors"
          aria-label="Cerrar notificación"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}