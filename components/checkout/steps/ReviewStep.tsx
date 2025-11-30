"use client";

import { useState } from 'react';
import { CheckCircle, MapPin, Truck, CreditCard } from 'lucide-react';

interface ReviewStepProps {
  formData: any;
  selectedShipping?: any;
  shippingCost?: number;  
  onSubmit: () => Promise<void>;
  onBack: () => void;
  canSubmit: boolean;
}

export function ReviewStep({ formData, selectedShipping, shippingCost, onSubmit, onBack, canSubmit }: ReviewStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      await onSubmit();
    } catch (error) {
      console.error('Error procesando orden:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <CheckCircle size={24} />
        Confirmar Pedido
      </h2>
      
      {/* Resumen del Pedido */}
      <div className="space-y-4">
        {/* Dirección de Envío */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <MapPin size={16} />
            Dirección de Envío
          </h3>
          <p className="text-gray-600">
            {formData.firstName} {formData.lastName}<br/>
            {formData.address}<br/>
            {formData.city}, {formData.province} {formData.zipCode}<br/>
            {formData.phone}<br/>
            {formData.email}
          </p>
        </div>
        
        {/* Método de Envío */}
        {selectedShipping && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Truck size={16} />
              Método de Envío
            </h3>
            <p className="text-gray-600">
              {selectedShipping.icon} {selectedShipping.name}<br/>
              {selectedShipping.deliveryTime}
            </p>
          </div>
        )}
        
        {/* Método de Pago */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <CreditCard size={16} />
            Método de Pago
          </h3>
          <p className="text-gray-600">
            Tarjeta de crédito/débito<br/>
            Procesado de forma segura
          </p>
        </div>
      </div>

      {/* Botones Finales */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          Volver
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isProcessing}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              Confirmar Pedido
            </>
          )}
        </button>
      </div>
    </div>
  );
}