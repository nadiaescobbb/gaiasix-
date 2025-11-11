"use client";

import { X } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

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
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 z-50" 
        onClick={onClose} 
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-light">Carrito</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-12">Vacío</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm uppercase tracking-wide mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">Talla {item.size}</p>
                    <p className="text-sm mb-2">{formatPrice(item.price)}</p>
                    
                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:border-black transition"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:border-black transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id, item.size)}
                        className="ml-auto text-xs text-gray-500 hover:text-black transition"
                      >
                        Eliminar
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
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between mb-6">
              <span className="text-sm uppercase tracking-wide">Total</span>
              <span className="text-lg">{formatPrice(cartTotal)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full border border-black py-4 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              {currentUser ? 'Finalizar Compra' : 'Ingresar para Comprar'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}