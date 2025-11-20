"use client";

import { useEffect } from 'react';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

// ===================================================
// TYPES
// ===================================================

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// ===================================================
// ERROR PAGE COMPONENT
// ===================================================

export default function ProductError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Product page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-light text-gray-900 mb-3">
          Algo salió mal
        </h1>
        
        <p className="text-gray-600 mb-2">
          No pudimos cargar la información del producto.
        </p>
        
        <p className="text-sm text-gray-500 mb-8">
          {getUserFriendlyErrorMessage(error)}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            <RefreshCw size={16} />
            Reintentar
          </button>
          
          <a
            href="/shop"
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 text-sm uppercase tracking-widest hover:border-black hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Volver a la tienda
          </a>
        </div>

        {/* Technical Details (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
              Detalles técnicos (desarrollo)
            </summary>
            <div className="mt-2 p-4 bg-gray-50 rounded text-xs font-mono">
              <p className="text-red-600 mb-2">{error.message}</p>
              {error.digest && (
                <p className="text-gray-500">Digest: {error.digest}</p>
              )}
              <p className="text-gray-500 mt-2">Stack:</p>
              <pre className="text-gray-400 overflow-auto max-h-32 mt-1">
                {error.stack}
              </pre>
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

// ===================================================
// ERROR BOUNDARY COMPONENT (Para uso en otros lugares)
// ===================================================

export function ProductErrorBoundary({ error, reset }: ErrorPageProps) {
  return (
    <div className="border border-red-200 bg-red-50 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 mb-1">
            Error al cargar el producto
          </h3>
          <p className="text-sm text-red-700 mb-3">
            {getUserFriendlyErrorMessage(error)}
          </p>
          <button
            onClick={reset}
            className="text-sm text-red-800 hover:text-red-900 underline transition-colors"
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    </div>
  );
}

// ===================================================
// PRODUCT NOT FOUND COMPONENT
// ===================================================

export function ProductNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-light text-gray-900 mb-3">
          Producto no encontrado
        </h1>
        
        <p className="text-gray-600 mb-8">
          El producto que estás buscando no existe o ya no está disponible.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/shop"
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={16} />
            Explorar productos
          </a>
          
          <a
            href="/"
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 text-sm uppercase tracking-widest hover:border-black hover:text-black transition-colors"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

// ===================================================
// NETWORK ERROR COMPONENT
// ===================================================

export function NetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-amber-800 mb-1">
            Problema de conexión
          </h3>
          <p className="text-sm text-amber-700 mb-3">
            No pudimos conectarnos al servidor. Verifica tu conexión a internet.
          </p>
          <button
            onClick={onRetry}
            className="text-sm text-amber-800 hover:text-amber-900 underline transition-colors"
          >
            Reintentar conexión
          </button>
        </div>
      </div>
    </div>
  );
}

// ===================================================
// HELPER FUNCTIONS
// ===================================================

function getUserFriendlyErrorMessage(error: Error): string {
  const message = error.message.toLowerCase();

  if (message.includes('network') || message.includes('fetch')) {
    return 'Problema de conexión. Verifica tu internet.';
  }
  
  if (message.includes('timeout')) {
    return 'La solicitud tardó demasiado. Intenta nuevamente.';
  }
  
  if (message.includes('not found') || message.includes('404')) {
    return 'El producto no fue encontrado.';
  }
  
  if (message.includes('failed to load') || message.includes('loading')) {
    return 'Error al cargar el producto.';
  }

  return 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
}