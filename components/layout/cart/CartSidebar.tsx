// components/layout/cart/cartsidebar.tsx

"use client";

import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Clock, Store, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  province: string;
  shippingCost: number;
  loadingShipping: boolean;
}

// ===================================================
// LOADING BUTTON (ACTUALIZADO)
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
// CART SIDEBAR COMPONENT - CORREGIDO CON ASYNC/AWAIT
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
  const [userProvince, setUserProvince] = useState<string>('Tierra del Fuego');
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [loadingShipping, setLoadingShipping] = useState<boolean>(false);
  const router = useRouter();

  const availableMethods = getAvailableMethodsForProvince(userProvince);

  // Calcular costo de envío cuando cambia el método seleccionado o el carrito
  useEffect(() => {
    const updateShippingCost = async () => {
      if (cart.length === 0) {
        setShippingCost(0);
        return;
      }

      setLoadingShipping(true);
      try {
        const cost = await calculateShipping(cartTotal, selectedShipping);
        setShippingCost(cost);
      } catch (error) {
        console.error('Error calculando envío:', error);
        // Fallback al precio fijo del método
        const method = availableMethods.find(m => m.id === selectedShipping);
        setShippingCost(method?.price || 0);
      } finally {
        setLoadingShipping(false);
      }
    };

    updateShippingCost();
  }, [selectedShipping, cartTotal, cart.length, availableMethods]);

  // Efectos para manejar el scroll y escape key
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

  // ✅ FUNCIÓN ACTUALIZADA - Redirige al checkout
  const handleCheckout = async (): Promise<void> => {
    setIsCheckingOut(true);
    try {
      if (currentUser) {
        // Redirigir al checkout
        onClose(); // Cerrar sidebar primero
        router.push('/checkout');
      } else {
        // Redirigir al login
        onClose(); // Cerrar sidebar primero
        router.push('/auth');
      }
    } catch (error) {
      console.error('Error en checkout:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleShippingChange = async (methodId: string): Promise<void> => {
    setSelectedShipping(methodId);
  };

  // Función para continuar comprando
  const handleContinueShopping = (): void => {
    onClose();
    router.push('/shop');
  };

  if (!isOpen) return null;

  const itemCount = cart.reduce((sum: number, item: CartItemType) => sum + item.quantity, 0);
  const finalTotal = cartTotal + shippingCost;
  const hasFreeShipping = shippingCost === 0 && cartTotal > 0;
  const freeShippingRemaining = shippingConfig.freeShippingThreshold - cartTotal;

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
      
      {/* Sidebar */}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <div>
            <h2 id="cart-title" className="text-sm uppercase tracking-widest text-gray-600">
              Tu Bolsa {itemCount > 0 && `(${itemCount})`}
            </h2>
            {itemCount > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {itemCount} producto{itemCount > 1 ? 's' : ''} en tu carrito
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {cart.length === 0 ? (
            <EmptyCartState onClose={onClose} />
          ) : (
            <div className="p-6">
              {/* Barra de envío gratis */}
              {!hasFreeShipping && freeShippingRemaining > 0 && (
                <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-800">
                      <strong>¡Envío gratis!</strong>
                    </span>
                    <span className="text-amber-700">
                      Faltan {formatPrice(freeShippingRemaining)}
                    </span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min((cartTotal / shippingConfig.freeShippingThreshold) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Lista de productos */}
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
            </div>
          )}
        </div>

        {/* Footer - CORREGIDO */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 bg-white p-6 space-y-4">
            
            {/* Selector de Envío */}
            <ShippingSelector 
              selectedMethod={selectedShipping}
              onMethodChange={handleShippingChange}
              cartTotal={cartTotal}
              province={userProvince}
              shippingCost={shippingCost}
              loadingShipping={loadingShipping}
            />

            {/* Resumen de Totales */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(cartTotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Envío {hasFreeShipping && <span className="text-green-600 text-xs ml-1">(GRATIS)</span>}
                </span>
                <span className={hasFreeShipping ? 'text-green-600 font-semibold' : 'font-medium'}>
                  {loadingShipping ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs text-gray-500">Calculando...</span>
                    </div>
                  ) : hasFreeShipping ? (
                    'Gratis'
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              
              {hasFreeShipping && (
                <div className="text-xs text-green-600 bg-green-50 p-2 rounded-lg text-center">
                  🎉 ¡Felicitaciones! Tienes envío gratis
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                <span className="text-gray-800 font-semibold">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  {loadingShipping ? 'Calculando...' : formatPrice(finalTotal)}
                </span>
              </div>
            </div>
            
            {/* Botones de Acción */}
            <div className="space-y-3">
              {/* Botón de Checkout */}
              <LoadingButton
                loading={isCheckingOut || loadingShipping}
                onClick={handleCheckout}
                disabled={cart.length === 0 || loadingShipping}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {currentUser ? (
                  <>
                    Continuar al pago
                    <ArrowRight size={16} />
                  </>
                ) : (
                  'Ingresá a tu cuenta'
                )}
              </LoadingButton>

              {/* Botón Seguir Comprando */}
              <button
                onClick={handleContinueShopping}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                Seguir comprando
              </button>
            </div>

            {/* Información de Seguridad */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <span>🔒 Pago seguro</span>
                <span>•</span>
                <span>🚚 Envíos a todo el país</span>
                <span>•</span>
                <span>↩️ Devoluciones gratis</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ==========================================
// SHIPPING SELECTOR COMPONENT - CORREGIDO
// ==========================================

function ShippingSelector({ 
  selectedMethod, 
  onMethodChange, 
  cartTotal, 
  province, 
  shippingCost,
  loadingShipping 
}: ShippingSelectorProps) {
  const availableMethods = getAvailableMethodsForProvince(province);

  if (availableMethods.length === 0) return null;

  const getMethodIcon = (methodId: string) => {
    switch (methodId) {
      case 'correo-standard':
      case 'correo-express':
      case 'correo-priority':
        return <Truck size={16} className="text-blue-600" />;
      case 'andreani-standard':
      case 'andreani-express':
      case 'andreani-urgent':
        return <Clock size={16} className="text-green-600" />;
      case 'pickup-showroom':
      case 'pickup-point':
        return <Store size={16} className="text-purple-600" />;
      default: 
        return <Truck size={16} className="text-gray-600" />;
    }
  };

  const getMethodDescription = (method: ShippingMethod) => {
    const isFree = method.freeThreshold && cartTotal >= method.freeThreshold;
    const priceText = isFree ? 'Gratis' : formatPrice(method.price);
    
    return `${method.deliveryTime} • ${priceText}`;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Truck size={16} className="text-gray-600" />
        Método de envío
        {loadingShipping && (
          <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        )}
      </h3>
      
      <div className="space-y-3">
        {availableMethods.map((method) => {
          const isFree = method.freeThreshold && cartTotal >= method.freeThreshold;
          const isSelected = selectedMethod === method.id;
          
          return (
            <label 
              key={method.id}
              className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-black bg-white shadow-sm' 
                  : 'border-transparent bg-white hover:border-gray-300'
              } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                type="radio"
                name="shipping-method"
                value={method.id}
                checked={isSelected}
                onChange={(e) => onMethodChange(e.target.value)}
                disabled={!method.available || loadingShipping}
                className="mt-1 text-black focus:ring-black"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getMethodIcon(method.id)}
                  <span className={`text-sm font-medium ${
                    isSelected ? 'text-gray-900' : 'text-gray-800'
                  }`}>
                    {method.name}
                  </span>
                  {!method.available && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      No disponible
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-gray-600">
                  {getMethodDescription(method)}
                </p>
                
                {isFree && method.freeThreshold && (
                  <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                    🎉 ¡Envío gratis aplicado!
                  </p>
                )}
                
                {method.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {method.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {/* Info de ubicación */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
        <span>📍</span>
        <span>Envío a <strong>{province}</strong></span>
      </div>
    </div>
  );
}

// ==========================================
// CART ITEM COMPONENT - MANTENIDO
// ==========================================

function CartItem({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  
  const maxStock = item.stock;
  const isAtMaxStock = item.quantity >= maxStock;
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 group">
      {/* Imagen del producto */}
      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={imageError ? '/images/fallback-product.jpg' : item.image}
          alt={item.name}
          fill
          sizes="80px"
          className={`object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-105 transition-transform`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          quality={85}
        />
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
        )}
        
        {/* Badge de cantidad en móvil */}
        <div className="absolute -top-1 -left-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center sm:hidden">
          {item.quantity}
        </div>
      </div>

      {/* Información del producto */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 pr-2">
            {item.name}
          </h3>
          <button
            onClick={() => onRemoveItem(item.id, item.size)}
            className="p-1 text-gray-300 hover:text-red-600 transition-colors flex-shrink-0"
            aria-label={`Eliminar ${item.name} talla ${item.size}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
          <span>Talla: <strong>{item.size}</strong></span>
          <span>•</span>
          <span>Precio: <strong>{formatPrice(item.price)}</strong></span>
        </div>
        
        {/* Controles de cantidad y subtotal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1}
              aria-label="Reducir cantidad"
            >
              <Minus size={14} />
            </button>
            
            <span className="text-sm font-medium w-8 text-center">
              {item.quantity}
            </span>
            
            <button
              onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={isAtMaxStock}
              aria-label={isAtMaxStock ? `Stock máximo: ${maxStock}` : 'Aumentar cantidad'}
              title={isAtMaxStock ? `Stock máximo: ${maxStock}` : 'Agregar uno más'}
            >
              <Plus size={14} />
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {formatPrice(subtotal)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-gray-400">
                {formatPrice(item.price)} c/u
              </p>
            )}
          </div>
        </div>

        {/* Mensaje de stock máximo */}
        {isAtMaxStock && maxStock > 0 && (
          <p className="text-xs text-amber-600 mt-2 bg-amber-50 px-2 py-1 rounded">
            ⚠️ Stock máximo: {maxStock} unidades
          </p>
        )}
      </div>
    </div>
  );
}

// ==========================================
// EMPTY STATE COMPONENT - MANTENIDO
// ==========================================

function EmptyCartState({ onClose }: EmptyCartStateProps) {
  const router = useRouter();

  const handleStartShopping = (): void => {
    onClose();
    router.push('/shop');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="mb-6">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={32} className="text-gray-300" strokeWidth={1} />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Tu bolsa está vacía
      </h3>
      
      <p className="text-gray-500 mb-8 max-w-xs">
        Explora nuestra colección y descubre prendas únicas que reflejen tu estilo.
      </p>
      
      <div className="space-y-3 w-full max-w-xs">
        <button 
          onClick={handleStartShopping}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag size={16} />
          Explorar colección
        </button>
        
        <button 
          onClick={onClose}
          className="w-full border border-gray-300 text-gray-600 py-3 rounded-lg font-medium hover:border-gray-400 transition-colors"
        >
          Seguir explorando
        </button>
      </div>

      {/* Beneficios */}
      <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-gray-500 w-full max-w-xs">
        <div className="text-center">
          <div className="text-lg mb-1">🚚</div>
          <p>Envío gratis desde ${shippingConfig.freeShippingThreshold.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <div className="text-lg mb-1">↩️</div>
          <p>Devoluciones en 7 días</p>
        </div>
      </div>
    </div>
  );
}