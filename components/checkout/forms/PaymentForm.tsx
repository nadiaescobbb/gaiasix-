"use client";

import { useState } from 'react';
import { 
  useStripe, 
  useElements, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement 
} from '@stripe/react-stripe-js';
import { CreditCard, Lock, Shield } from 'lucide-react';

interface PaymentFormProps {
  onPaymentSuccess: (paymentMethodId: string) => void;
  onBack?: () => void;
}

export function PaymentForm({ onPaymentSuccess, onBack }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripeElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#000000',
        fontFamily: 'var(--font-body), system-ui, sans-serif',
        '::placeholder': {
          color: '#6B7280',
        },
        ':-webkit-autofill': {
          color: '#000000',
        },
      },
    },
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setError('El sistema de pago no está disponible');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardNumberElement);
      
      if (!cardElement) {
        setError('No se pudo cargar el formulario de pago');
        return;
      }

      // ✅ CREAR MÉTODO DE PAGO SEGURO
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Error procesando la tarjeta');
        return;
      }

      console.log('✅ PaymentMethod creado:', paymentMethod.id);
      
      onPaymentSuccess(paymentMethod.id);
      
    } catch (err) {
      setError('Error inesperado procesando el pago');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Número de Tarjeta */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Número de tarjeta *
        </label>
        <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-black focus-within:border-transparent transition-all">
          <CardNumberElement 
            options={stripeElementOptions}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Fecha de Vencimiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vencimiento *
          </label>
          <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-black focus-within:border-transparent transition-all">
            <CardExpiryElement options={stripeElementOptions} />
          </div>
        </div>
        
        {/* CVV */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV *
          </label>
          <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-black focus-within:border-transparent transition-all">
            <CardCvcElement options={stripeElementOptions} />
          </div>
        </div>
      </div>

      {/* Información de Seguridad */}
      <div className="bg-gaia-charcoal/5 border border-gaia-border rounded-lg p-4">
        <div className="flex items-center gap-3 text-gaia-black mb-2">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-gaia-crimson" />
            <span className="font-semibold text-sm">Pago 100% Seguro</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Lock size={14} className="text-gaia-silver" />
            <span className="text-xs text-gaia-silver">SSL Encriptado</span>
          </div>
        </div>
        <p className="text-gaia-ash text-xs leading-relaxed">
          Tus datos de tarjeta están encriptados y procesados directamente por Stripe. 
          <strong> Nunca almacenamos información sensible</strong>. Aceptamos todas las tarjetas Galicia, Visa, Mastercard y American Express.
        </p>
      </div>

      {/* Mensaje de Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm font-medium">{error}</p>
          <p className="text-red-600 text-xs mt-1">
            Verifica los datos de tu tarjeta e intenta nuevamente.
          </p>
        </div>
      )}

      {/* Botones */}
      <div className="flex justify-between pt-4 border-t border-gaia-border">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={isProcessing}
            className="px-6 py-3 border border-gaia-border rounded-lg hover:border-gaia-black transition-colors disabled:opacity-50 font-body text-sm"
          >
            Volver
          </button>
        )}
        
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="bg-gaia-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gaia-charcoal transition-colors disabled:bg-gaia-silver disabled:cursor-not-allowed flex items-center gap-2 ml-auto font-body text-sm"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Procesando pago...
            </>
          ) : (
            <>
              <CreditCard size={18} />
              Confirmar Pago
            </>
          )}
        </button>
      </div>
    </form>
  );
}