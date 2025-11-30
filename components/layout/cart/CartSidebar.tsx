// components/layout/cart/CartSidebar.tsx - VERSIÓN CORREGIDA
"use client";

import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Clock, Store, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '../../../lib/formatters';
import { 
  calculateShipping, 
  getAvailableMethodsForProvince, 
  getEstimatedDelivery,
  type ShippingMethod,
  shippingConfig 
} from '../../../config/shipping'; // ← CORREGIDO: ../../../config/shipping
import { type CartItem as CartItemType, type User } from '../../../lib/types';

// ===================================================
// TYPES
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

interface LoadingButtonProps {
  loading: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

// ===================================================
// LOADING BUTTON - ESTILO GAIA SIX
// ===================================================

function LoadingButton({ loading, onClick, disabled, className, children }: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative flex items-center justify-center gap-3 ${className}`}
    >
      {loading && (
        <div className="spinner-gaia w-4 h-4 border-2 border-gaia-white border-t-transparent" />
      )}
      {children}
    </button>
  );
}

// ===================================================
// CART SIDEBAR COMPONENT - ESTILO GAIA SIX
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

  // Calcular costo de envío
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
        const method = availableMethods.find((m: ShippingMethod) => m.id === selectedShipping); // ← TIPO AGREGADO
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

  // ✅ FUNCIÓN CHECKOUT GAIA SIX
  const handleCheckout = async (): Promise<void> => {
    setIsCheckingOut(true);
    try {
      if (currentUser) {
        onClose();
        router.push('/checkout');
      } else {
        onClose();
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
      {/* Overlay Gaia Six */}
      <div 
        className={`fixed inset-0 bg-gaia-black z-50 transition-opacity duration-500 ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar Gaia Six */}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-gaia-white z-50 flex flex-col transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header - Estilo Gaia */}
        <div className="flex items-center justify-between p-6 border-b border-gaia-border bg-gaia-white">
          <div>
            <h2 id="cart-title" className="text-sm uppercase tracking-widest text-gaia-silver font-body">
              Tu Selección {itemCount > 0 && `(${itemCount})`}
            </h2>
            {itemCount > 0 && (
              <p className="text-xs text-gaia-silver mt-1 font-body">
                {itemCount} pieza{itemCount > 1 ? 's' : ''} seleccionada{itemCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gaia-charcoal/5 rounded-lg transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={20} className="text-gaia-silver hover:text-gaia-crimson transition-colors" />
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
              {/* Barra de envío gratis - Estilo Gaia */}
              {!hasFreeShipping && freeShippingRemaining > 0 && (
                <div className="mb-6 p-4 bg-gaia-crimson/5 border border-gaia-crimson/20 rounded-lg">
                  <div className="flex items-center justify-between text-sm font-body">
                    <span className="text-gaia-crimson">
                      <strong>Envío exclusivo</strong>
                    </span>
                    <span className="text-gaia-crimson">
                      Faltan {formatPrice(freeShippingRemaining)}
                    </span>
                  </div>
                  <div className="w-full bg-gaia-silver/30 rounded-full h-1.5 mt-3">
                    <div 
                      className="bg-gaia-crimson h-1.5 rounded-full transition-all duration-500"
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

        {/* Footer - Estilo Gaia Six */}
        {cart.length > 0 && (
          <div className="border-t border-gaia-border bg-gaia-white p-6 space-y-4">
            
            {/* Selector de Envío */}
            <ShippingSelector 
              selectedMethod={selectedShipping}
              onMethodChange={handleShippingChange}
              cartTotal={cartTotal}
              province={userProvince}
              shippingCost={shippingCost}
              loadingShipping={loadingShipping}
            />

            {/* Resumen de Totales - Estilo Minimal */}
            <div className="space-y-3 text-sm font-body">
              <div className="flex justify-between">
                <span className="text-gaia-silver">Subtotal</span>
                <span className="font-medium">{formatPrice(cartTotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gaia-silver">
                  Envío {hasFreeShipping && <span className="text-gaia-crimson text-xs ml-1">(EXCLUSIVO)</span>}
                </span>
                <span className={hasFreeShipping ? 'text-gaia-crimson font-medium' : 'font-medium'}>
                  {loadingShipping ? (
                    <div className="flex items-center gap-2">
                      <div className="spinner-gaia w-3 h-3 border-2 border-gaia-silver border-t-transparent" />
                      <span className="text-xs text-gaia-silver">Calculando...</span>
                    </div>
                  ) : hasFreeShipping ? (
                    'Exclusivo'
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              
              {hasFreeShipping && (
                <div className="text-xs text-gaia-crimson bg-gaia-crimson/5 p-3 rounded-lg text-center border border-gaia-crimson/10">
                  🌙 Envío exclusivo para tu compra
                </div>
              )}
              
              <div className="border-t border-gaia-border pt-3 flex justify-between items-baseline">
                <span className="text-gaia-black font-medium">Total</span>
                <span className="text-lg font-medium text-gaia-black">
                  {loadingShipping ? 'Calculando...' : formatPrice(finalTotal)}
                </span>
              </div>
            </div>
            
            {/* Botones de Acción - Estilo Gaia */}
            <div className="space-y-3">
              {/* Botón de Checkout */}
              <LoadingButton
                loading={isCheckingOut || loadingShipping}
                onClick={handleCheckout}
                disabled={cart.length === 0 || loadingShipping}
                className="btn-gaia-primary w-full text-center py-4"
              >
                {currentUser ? (
                  <>
                    Continuar al pago
                    <ArrowRight size={16} />
                  </>
                ) : (
                  'Acceder para Comprar'
                )}
              </LoadingButton>

              {/* Botón Seguir Comprando */}
              <button
                onClick={handleContinueShopping}
                className="btn-gaia-secondary w-full text-center py-3"
              >
                <ShoppingBag size={16} />
                Explorar Colección
              </button>
            </div>

            {/* Información de Seguridad - Estilo Gaia */}
            <div className="pt-4 border-t border-gaia-border">
              <div className="flex items-center justify-center gap-4 text-xs text-gaia-silver font-body">
                <span>🔒 Experiencia segura</span>
                <span>•</span>
                <span>🚚 Envíos nacionales</span>
                <span>•</span>
                <span>↩️ Devoluciones</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ==========================================
// SHIPPING SELECTOR - ESTILO GAIA SIX
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
        return <Truck size={16} className="text-gaia-crimson" />;
      case 'andreani-standard':
      case 'andreani-express':
      case 'andreani-urgent':
        return <Clock size={16} className="text-gaia-crimson" />;
      case 'pickup-showroom':
      case 'pickup-point':
        return <Store size={16} className="text-gaia-crimson" />;
      default: 
        return <Truck size={16} className="text-gaia-silver" />;
    }
  };

  const getMethodDescription = (method: ShippingMethod) => { // ← TIPO AGREGADO
    const isFree = method.freeThreshold && cartTotal >= method.freeThreshold;
    const priceText = isFree ? 'Exclusivo' : formatPrice(method.price);
    
    return `${method.deliveryTime} • ${priceText}`;
  };

  return (
    <div className="border border-gaia-border rounded-lg p-4 bg-gaia-charcoal/5">
      <h3 className="text-sm font-medium text-gaia-black mb-3 flex items-center gap-2 font-body">
        <Truck size={16} className="text-gaia-crimson" />
        Método de entrega
        {loadingShipping && (
          <div className="spinner-gaia w-3 h-3 border-2 border-gaia-silver border-t-transparent" />
        )}
      </h3>
      
      <div className="space-y-3">
        {availableMethods.map((m: ShippingMethod) => { // ← TIPO AGREGADO
          const isFree = m.freeThreshold && cartTotal >= m.freeThreshold;
          const isSelected = selectedMethod === m.id;
          
          return (
            <label 
              key={m.id}
              className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all font-body ${
                isSelected 
                  ? 'border-gaia-crimson bg-gaia-white shadow-sm' 
                  : 'border-gaia-border bg-gaia-white hover:border-gaia-silver'
              } ${!m.available ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                type="radio"
                name="shipping-method"
                value={m.id}
                checked={isSelected}
                onChange={(e) => onMethodChange(e.target.value)}
                disabled={!m.available || loadingShipping}
                className="mt-1 text-gaia-crimson focus:ring-gaia-crimson"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getMethodIcon(m.id)}
                  <span className={`text-sm font-medium ${
                    isSelected ? 'text-gaia-black' : 'text-gaia-black'
                  }`}>
                    {m.name}
                  </span>
                  {!m.available && (
                    <span className="text-xs bg-gaia-silver/20 text-gaia-silver px-2 py-1 rounded">
                      No disponible
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-gaia-silver">
                  {getMethodDescription(m)}
                </p>
                
                {isFree && m.freeThreshold && (
                  <p className="text-xs text-gaia-crimson font-medium mt-1 flex items-center gap-1">
                    🌙 Entrega exclusiva
                  </p>
                )}
                
                {m.description && (
                  <p className="text-xs text-gaia-silver mt-1">
                    {m.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>

    </div>
  );
}

// ==========================================
// CART ITEM COMPONENT - ESTILO GAIA SIX
// ==========================================

function CartItem({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  
  const maxStock = item.stock;
  const isAtMaxStock = item.quantity >= maxStock;
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 group">
      {/* Imagen del producto - Estilo Gaia */}
      <div className="relative w-20 h-24 flex-shrink-0 bg-gaia-charcoal overflow-hidden rounded-sm">
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
          <div className="absolute inset-0 bg-gaia-charcoal animate-pulse rounded-sm" />
        )}
        
        {/* Badge de cantidad */}
        <div className="absolute -top-1 -left-1 bg-gaia-crimson text-gaia-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
          {item.quantity}
        </div>
      </div>

      {/* Información del producto - Estilo Gaia */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-light text-gaia-black line-clamp-2 pr-2 font-body">
            {item.name}
          </h3>
          <button
            onClick={() => onRemoveItem(item.id, item.size)}
            className="p-1 text-gaia-silver hover:text-gaia-crimson transition-colors flex-shrink-0"
            aria-label={`Eliminar ${item.name} talla ${item.size}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-gaia-silver mb-3 font-body">
          <span>Talle: <strong className="text-gaia-black">{item.size}</strong></span>
          <span>•</span>
          <span>Precio: <strong className="text-gaia-black">{formatPrice(item.price)}</strong></span>
        </div>
        
        {/* Controles de cantidad y subtotal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
              className="w-8 h-8 border border-gaia-border flex items-center justify-center hover:border-gaia-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1}
              aria-label="Reducir cantidad"
            >
              <Minus size={14} />
            </button>
            
            <span className="text-sm font-medium w-8 text-center font-body">
              {item.quantity}
            </span>
            
            <button
              onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
              className="w-8 h-8 border border-gaia-border flex items-center justify-center hover:border-gaia-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={isAtMaxStock}
              aria-label={isAtMaxStock ? `Stock máximo: ${maxStock}` : 'Aumentar cantidad'}
              title={isAtMaxStock ? `Stock máximo: ${maxStock}` : 'Agregar uno más'}
            >
              <Plus size={14} />
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-medium text-gaia-black font-body">
              {formatPrice(subtotal)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-gaia-silver font-body">
                {formatPrice(item.price)} c/u
              </p>
            )}
          </div>
        </div>

        {/* Mensaje de stock máximo */}
        {isAtMaxStock && maxStock > 0 && (
          <p className="text-xs text-gaia-crimson mt-2 bg-gaia-crimson/5 px-2 py-1 rounded border border-gaia-crimson/10 font-body">
            Stock máximo: {maxStock} unidades
          </p>
        )}
      </div>
    </div>
  );
}

// ==========================================
// EMPTY STATE - ESTILO GAIA SIX
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
        <div className="w-24 h-24 bg-gaia-charcoal/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={32} className="text-gaia-silver" strokeWidth={1} />
        </div>
      </div>
      
      <h3 className="text-lg font-light text-gaia-black mb-2 font-display">
        Tu selección está vacía
      </h3>
      
      <p className="text-gaia-silver mb-8 max-w-xs font-body">
        Descubre piezas esenciales que definen tu estilo nocturno.
      </p>
      
      <div className="space-y-3 w-full max-w-xs">
        <button 
          onClick={handleStartShopping}
          className="btn-gaia-primary w-full text-center py-3"
        >
          <ShoppingBag size={16} />
          Explorar Colección
        </button>
        
        <button 
          onClick={onClose}
          className="btn-gaia-secondary w-full text-center py-3"
        >
          Continuar Explorando
        </button>
      </div>

      {/* Beneficios Gaia Six */}
      <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-gaia-silver w-full max-w-xs font-body">
        <div className="text-center">
          <div className="text-lg mb-1">🚚</div>
          <p>Envío desde ${shippingConfig.freeShippingThreshold.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <div className="text-lg mb-1">↩️</div>
          <p>Devoluciones en 7 días</p>
        </div>
      </div>
    </div>
  );
}