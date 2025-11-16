"use client";

import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '../../utils/formatters';
import { useEffect, useState } from 'react';
import { LoadingButton } from '../ui/LoadingStates';

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
  const [isCheckingOut, setIsCheckingOut] = useState(false);

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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await onCheckout();
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-500 ${
          isOpen ? 'bg-opacity-30' : 'bg-opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar*/}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 id="cart-title" className="text-sm uppercase tracking-widest text-gray-600">
            Tu Bolsa {itemCount > 0 && `(${itemCount})`}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-50 transition-colors"
            aria-label="Cerrar"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Items */}
        <div 
          className="flex-1 overflow-y-auto p-6"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {cart.length === 0 ? (
            <EmptyCartState onClose={onClose} />
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <CartItem 
                  key={`${item.id}-${item.size}-${index}`}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-6">
            <div className="flex justify-between items-baseline mb-8">
              <span className="text-xs uppercase tracking-widest text-gray-500">Total</span>
              <span className="text-2xl font-light">{formatPrice(cartTotal)}</span>
            </div>
            
            {/* Botón*/}
            <LoadingButton
              loading={isCheckingOut}
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentUser ? 'Confirmar' : 'Ingresá a tu cuenta'}
            </LoadingButton>
            
            {!currentUser && (
              <p className="text-xs text-center text-gray-400 mt-4 tracking-wide">
                iniciar sesion
              </p>
            )}

            {/* Info */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center tracking-wide">
                Envío incluido · Pagá en 3 cuotas
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ==========================================
// CART ITEM 
// ==========================================

function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const maxStock = item.stock;
  const isAtMaxStock = item.quantity >= maxStock;

  return (
    <div className="flex gap-4">
      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 overflow-hidden">
        <Image
          src={imageError ? '/fallback-product.jpg' : item.image}
          alt={item.name}
          fill
          sizes="80px"
          className={`object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          quality={80}
        />
        
        {/* Skeleton mientras carga */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-1 truncate">
          {item.name}
        </h3>
        <p className="text-xs text-gray-400 mb-2">Talla {item.size}</p>
        <p className="text-sm font-light mb-4">{formatPrice(item.price)}</p>
        
        {/* Controles sutiles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
            className="w-6 h-6 border border-gray-200 flex items-center justify-center text-xs hover:border-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={item.quantity <= 1}
            aria-label="Reducir cantidad"
          >
            <Minus size={12} />
          </button>
          
          <span className="text-xs w-6 text-center">
            {item.quantity}
          </span>
          
          <button
            onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
            className="w-6 h-6 border border-gray-200 flex items-center justify-center text-xs hover:border-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={isAtMaxStock}
            aria-label={isAtMaxStock ? `Stock máximo: ${maxStock}` : 'Aumentar cantidad'}
            title={isAtMaxStock ? `Stock máximo: ${maxStock}` : 'Agregar uno más'}
          >
            <Plus size={12} />
          </button>
          
          <button
            onClick={() => onRemoveItem(item.id, item.size)}
            className="ml-auto p-1 text-gray-300 hover:text-red-600 transition-colors"
            aria-label={`Eliminar ${item.name} talla ${item.size}`}
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Feedback de stock limitado */}
        {isAtMaxStock && maxStock > 0 && (
          <p className="text-xs text-amber-600 mt-2">
            Stock máximo: {maxStock}
          </p>
        )}
      </div>
    </div>
  );
}

// ==========================================
// EMPTY STATE 
// ==========================================

function EmptyCartState({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="mb-8">
        <ShoppingBag size={32} className="text-gray-200 mx-auto" strokeWidth={1} />
      </div>
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">
        Tu bolsa está vacía
      </p>
      <button 
        onClick={onClose}
        className="border border-gray-200 text-gray-600 px-8 py-3 text-xs uppercase tracking-widest hover:border-black hover:text-black transition-all"
        aria-label="Seguir explorando"
      >
        Seguir explorando
      </button>
    </div>
  );
}