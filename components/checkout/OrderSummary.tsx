import { useAppContext } from '../../context/AppContext';
import { formatPrice } from '../../utils/formatters';
import { useShipping } from '../../hooks/useShipping';

export function OrderSummary() {
  const { cart, cartTotal } = useAppContext();
  const { shippingCost, loadingShipping } = useShipping(''); // Provincia vacía por ahora

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const finalTotal = cartTotal + shippingCost;
  const hasFreeShipping = shippingCost === 0 && cartTotal > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h3>
      
      {/* Productos */}
      <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
        {cart.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
              <p className="text-xs text-gray-500">Talla {item.size} × {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
      
      {/* Totales */}
      <div className="space-y-2 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({itemCount} productos)</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Envío</span>
          <span className={hasFreeShipping ? 'text-green-600 font-semibold' : ''}>
            {loadingShipping ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
            ) : hasFreeShipping ? (
              'GRATIS'
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
          <span>Total</span>
          <span>
            {loadingShipping ? 'Calculando...' : formatPrice(finalTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}