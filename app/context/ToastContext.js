import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

// ==========================================
// TOAST CONTEXT
// ==========================================

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

// ==========================================
// TOAST PROVIDER
// ==========================================

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message, duration) => 
    addToast(message, 'success', duration), [addToast]);
  
  const error = useCallback((message, duration) => 
    addToast(message, 'error', duration), [addToast]);
  
  const warning = useCallback((message, duration) => 
    addToast(message, 'warning', duration), [addToast]);

  return (
    <ToastContext.Provider value={{ success, error, warning, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

// ==========================================
// TOAST CONTAINER
// ==========================================

function ToastContainer({ toasts, onRemove }) {
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
// TOAST COMPONENT
// ==========================================

function Toast({ toast, onRemove }) {
  const icons = {
    success: <CheckCircle size={20} className="text-green-600" />,
    error: <XCircle size={20} className="text-red-600" />,
    warning: <AlertCircle size={20} className="text-yellow-600" />,
  };

  const colors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
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

// ==========================================
// DEMO COMPONENT
// ==========================================

export default function ToastDemo() {
  const { success, error, warning } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light mb-8">Sistema de Notificaciones Toast</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-medium mb-4">Ejemplos de Notificaciones</h2>
          
          <div className="space-y-3">
            <button
              onClick={() => success('¡Producto agregado al carrito!')}
              className="w-full bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 transition"
            >
              Mostrar Success Toast
            </button>

            <button
              onClick={() => error('Error: No se pudo procesar el pago')}
              className="w-full bg-red-600 text-white py-3 px-4 rounded hover:bg-red-700 transition"
            >
              Mostrar Error Toast
            </button>

            <button
              onClick={() => warning('Stock limitado para este producto')}
              className="w-full bg-yellow-600 text-white py-3 px-4 rounded hover:bg-yellow-700 transition"
            >
              Mostrar Warning Toast
            </button>

            <button
              onClick={() => {
                success('Primera notificación');
                setTimeout(() => error('Segunda notificación'), 500);
                setTimeout(() => warning('Tercera notificación'), 1000);
              }}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition"
            >
              Mostrar Múltiples Toasts
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2">Uso en tu código:</h3>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`import { useToast } from '@/context/ToastContext';

function MyComponent() {
  const { success, error, warning } = useToast();
  
  const handleAddToCart = () => {
    // ... lógica
    success('¡Producto agregado!');
  };
  
  return <button onClick={handleAddToCart}>Agregar</button>;
}`}
            </pre>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">Características</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span>Auto-dismiss después de 3 segundos (configurable)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span>Botón para cerrar manualmente</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span>Animaciones suaves de entrada/salida</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span>Soporta múltiples notificaciones simultáneas</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span>Tipos: success, error, warning</span>
            </li>
          </ul>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}