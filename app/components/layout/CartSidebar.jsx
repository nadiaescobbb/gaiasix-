"use client";

import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useEffect } from 'react';

export default function CartSidebar({ 
  isOpen, 
  onClose, 
  cart, 
  cartTotal, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout, 
  currentUser 
}) {
  // Prevenir scroll cuando el sidebar está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay con animación */}
      <div 
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
          isOpen ? 'bg-opacity-40' : 'bg-opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar con animación slide-in */}
      <div 
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gray-600" />
            <h2 id="cart-title" className="text-xl font-light">
              Carrito {itemCount > 0 && `(${itemCount})`}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag size={48} className="mb-4 text-gray-300" />
              <p className="text-center">Tu carrito está vacío</p>
              <button 
                onClick={onClose}
                className="mt-6 border border-black px-6 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-all"
              >
                Ir a la tienda
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div 
                  key={`${item.id}-${item.size}-${index}`} 
                  className="flex gap-4 group"
                >
                  {/* Imagen del producto */}
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info del producto */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm uppercase tracking-wide mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Talla {item.size}</p>
                    <p className="text-sm font-medium mb-3">{formatPrice(item.price)}</p>
                    
                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center text-sm hover:border-black hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        <Minus size={14} />
                      </button>
                      
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center text-sm hover:border-black hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={item.quantity >= (item.stock || 10)}
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={14} />
                      </button>
                      
                      <button
                        onClick={() => onRemoveItem(item.id, item.size)}
                        className="ml-auto p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con total y botón */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            {/* Subtotal */}
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatPrice(cartTotal)}</span>
            </div>
            
            {/* Envío */}
            <div className="flex justify-between mb-4 text-sm pb-4 border-b border-gray-200">
              <span className="text-gray-600">Envío</span>
              <span className="text-green-600">Gratis</span>
            </div>
            
            {/* Total */}
            <div className="flex justify-between mb-6">
              <span className="text-base uppercase tracking-wide font-medium">Total</span>
              <span className="text-xl font-medium">{formatPrice(cartTotal)}</span>
            </div>
            
            {/* Botón checkout */}
            <button
              onClick={onCheckout}
              className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 rounded"
            >
              {currentUser ? 'Finalizar Compra' : 'Ingresar para Comprar'}
            </button>
            
            {!currentUser && (
              <p className="text-xs text-center text-gray-500 mt-3">
                Necesitás iniciar sesión para continuar
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}