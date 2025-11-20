"use client";

import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Clock, Store } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// ✅ IMPORTACIONES ACTUALIZADAS
import { formatPrice } from '../../../utils/formatters';
import { 
  calculateShipping, 
  getAvailableMethodsForProvince, 
  getEstimatedDelivery,
  type ShippingMethod,
  shippingConfig 
} from '../../../config/shipping';
import { type CartItem as CartItemType, type User } from '../../../lib/types';

// ===================================================
// TYPES ACTUALIZADOS
// ===================================================

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItemType[];
  cartTotal: number;
  onUpdateQuantity: (productId: number, size: string, newQuantity: number) => void;
  onRemoveItem: (productId: number, size: string) => void;
  onCheckout: () => void;
  currentUser: User | null;
}

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, size: string, newQuantity: number) => void;
  onRemoveItem: (productId: number, size: string) => void;
}

interface EmptyCartStateProps {
  onClose: () => void;
}

interface ShippingSelectorProps {
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
  cartTotal: number;
}

// ===================================================
// LOADING BUTTON (MANTENER IGUAL)
// ===================================================

interface LoadingButtonProps {
  loading: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function LoadingButton({ loading, onClick, disabled, className, children }: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative flex items-center justify-center gap-2 ${className}`}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

// ===================================================
// CART SIDEBAR COMPONENT - ACTUALIZADO
// ===================================================

export default function CartSidebar({ 
  isOpen, 
  onClose, 
  cart, 
  cartTotal, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout, 
  currentUser 
}: CartSidebarProps) {
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [selectedShipping, setSelectedShipping] = useState<string>(shippingConfig.defaultMethod);

  // Simulamos que el usuario está en Tierra del Fuego (puedes hacerlo dinámico luego)
  const [userProvince] = useState<string>('Tierra del Fuego');
  const availableMethods = getAvailableMethodsForProvince(userProvince);

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
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    const handleEscapeWrapper = (e: Event) => handleEscape(e as KeyboardEvent);
    window.addEventListener('keydown', handleEscapeWrapper);
    
    return () => window.removeEventListener('keydown', handleEscapeWrapper);
  }, [isOpen, onClose]);

  const handleCheckout = async (): Promise<void> => {
    setIsCheckingOut(true);
    try {
      await onCheckout();
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleShippingChange = (methodId: string): void => {
    setSelectedShipping(methodId);
  };

  if (!isOpen) return null;

  const itemCount = cart.reduce((sum: number, item: CartItemType) => sum + item.quantity, 0);
  const shippingCost = calculateShipping(cartTotal, selectedShipping);
  const finalTotal = cartTotal + shippingCost;
  const hasFreeShipping = shippingCost === 0 && cartTotal > 0;

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
              {cart.map((item: CartItemType, index: number) => (
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

        {/* Footer - ACTUALIZADO CON ENVÍOS */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4">
            
            {/* Selector de Envío */}
            <ShippingSelector 
              selectedMethod={selectedShipping}
              onMethodChange={handleShippingChange}
              cartTotal={cartTotal}
            />

            {/* Resumen de Totales - ACTUALIZADO */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Envío {hasFreeShipping && <span className="text-green-600 text-xs">(GRATIS)</span>}
                </span>
                <span className={hasFreeShipping ? 'text-green-600' : ''}>
                  {hasFreeShipping ? 'Gratis' : formatPrice(shippingCost)}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-2 flex justify-between items-baseline">
                <span className="text-gray-800 font-medium">Total</span>
                <span className="text-lg font-light">{formatPrice(finalTotal)}</span>
              </div>
            </div>
            
            {/* Botón de Checkout */}
            <LoadingButton
              loading={isCheckingOut}
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {currentUser ? 'Continuar al pago' : 'Ingresá a tu cuenta'}
            </LoadingButton>
            
            {!currentUser && (
              <p className="text-xs text-center text-gray-400 mt-2 tracking-wide">
                Iniciar sesión para finalizar compra
              </p>
            )}

            {/* Info Adicional */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center tracking-wide">
                {hasFreeShipping ? '🎉 ¡Envío gratis aplicado!' : `Envío gratis desde ${formatPrice(shippingConfig.freeShippingThreshold)}`}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ==========================================
// SHIPPING SELECTOR COMPONENT - NUEVO
// ==========================================

function ShippingSelector({ selectedMethod, onMethodChange, cartTotal }: ShippingSelectorProps) {
  // Simulamos Tierra del Fuego - puedes hacerlo dinámico después
  const availableMethods = getAvailableMethodsForProvince('Tierra del Fuego');

  if (availableMethods.length <= 1) return null;

  const getMethodIcon = (methodId: string) => {
    switch (methodId) {
      case 'standard': return <Truck size={16} />;
      case 'express': return <Clock size={16} />;
      case 'pickup': return <Store size={16} />;
      default: return <Truck size={16} />;
    }
  };

  const getMethodDescription = (method: ShippingMethod) => {
    const isFree = method.freeThreshold && cartTotal >= method.freeThreshold;
    const priceText = isFree ? 'Gratis' : formatPrice(method.price);
    
    return `${method.deliveryTime} • ${priceText}`;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
        <Truck size={16} />
        Método de envío
      </h3>
      
      <div className="space-y-2">
        {availableMethods.map((method) => (
          <label 
            key={method.id}
            className={`flex items-start gap-3 p-3 rounded border-2 cursor-pointer transition-all ${
              selectedMethod === method.id 
                ? 'border-black bg-white shadow-sm' 
                : 'border-transparent bg-white hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="shipping-method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(e) => onMethodChange(e.target.value)}
              className="mt-1 text-black focus:ring-black"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-800">
                  {method.name}
                </span>
                <span className="text-xs">
                  {getMethodIcon(method.id)}
                </span>
              </div>
              
              <p className="text-xs text-gray-600">
                {getMethodDescription(method)}
              </p>
              
              {method.freeThreshold && cartTotal >= method.freeThreshold && (
                <p className="text-xs text-green-600 font-medium mt-1">
                  🎉 ¡Envío gratis!
                </p>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* Info de ubicación */}
      <p className="text-xs text-gray-500 mt-3">
        📍 Envío a <strong>Tierra del Fuego</strong>
      </p>
    </div>
  );
}

// ==========================================
// CART ITEM COMPONENT (MANTENER IGUAL)
// ==========================================

function CartItem({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  
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
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-1 truncate">
          {item.name}
        </h3>
        <p className="text-xs text-gray-400 mb-2">Talla {item.size}</p>
        <p className="text-sm font-light mb-4">{formatPrice(item.price)}</p>
        
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
// EMPTY STATE COMPONENT (MANTENER IGUAL)
// ==========================================

function EmptyCartState({ onClose }: EmptyCartStateProps) {
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