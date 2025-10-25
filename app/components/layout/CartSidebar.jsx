import React from 'react';
import { X } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export default function CartSidebar({ 
  isOpen, 
  onClose, 
  cart, 
  cartTotal,
  currentUser,
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div onClick={onClose} className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-2xl font-bold">Tu Carrito</h2>
            <button 
              onClick={onClose} 
              className="hover:text-gray-600 transition"
              aria-label="Cerrar carrito"
            >
              <X size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="font-body text-gray-500 text-center py-8">
              Tu carrito está vacío
            </p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded" 
                    />
                    <div className="flex-1">
                      <h3 className="font-body font-semibold">{item.name}</h3>
                      <p className="font-body text-gray-600">{formatPrice(item.price)}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100 transition"
                          aria-label="Disminuir cantidad"
                        >
                          -
                        </button>
                        <span className="font-body">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100 transition"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="ml-auto text-red-700 text-sm hover:text-red-900 font-body transition"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-body text-lg font-bold mb-4">
                  <span>Total:</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-red-700 text-white py-3 rounded font-body font-semibold hover:bg-red-800 transition"
                >
                  Finalizar Compra
                </button>
                {!currentUser && (
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Iniciá sesión para completar tu compra
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}