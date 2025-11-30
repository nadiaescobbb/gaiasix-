import { Truck } from 'lucide-react';
import { ShippingMethod, getAvailableMethodsForProvince } from '../../../config/shipping';
import { formatPrice } from '../../../utils/formatters';

interface ShippingSelectorProps {
  province: string;
  selectedShipping: ShippingMethod | null;
  shippingCost: number;
  loadingShipping: boolean;
  onShippingMethodChange: (method: ShippingMethod) => void;
}

export function ShippingSelector({ 
  province, 
  selectedShipping, 
  shippingCost, 
  loadingShipping, 
  onShippingMethodChange 
}: ShippingSelectorProps) {
  
  const availableMethods = getAvailableMethodsForProvince(province);

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Truck size={20} />
        Método de Envío
        {loadingShipping && (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        )}
      </h3>
      
      <div className="space-y-3">
        {availableMethods.map((method: ShippingMethod) => (
          <label 
            key={method.id}
            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedShipping?.id === method.id 
                ? 'border-black bg-gray-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="shipping-method"
              value={method.id}
              checked={selectedShipping?.id === method.id}
              onChange={() => onShippingMethodChange(method)}
              className="mt-1 text-black focus:ring-black"
            />
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">
                    {method.icon} {method.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {method.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    📦 {method.deliveryTime}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    {shippingCost === 0 ? 
                      'GRATIS' : 
                      formatPrice(shippingCost)
                    }
                  </div>
                  {loadingShipping && selectedShipping?.id === method.id && (
                    <div className="text-xs text-gray-500">Calculando...</div>
                  )}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}