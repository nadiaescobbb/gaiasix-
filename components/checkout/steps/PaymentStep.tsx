"use client";

import { CreditCard } from 'lucide-react';
import { PaymentForm } from '../forms/PaymentForm';

interface PaymentStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function PaymentStep({ onNext, onBack }: PaymentStepProps) {
  const handlePaymentSuccess = (paymentMethodId: string) => {
    // ✅ Guardar el ID seguro del método de pago
    console.log('Payment method ID:', paymentMethodId);
    // Proceder al siguiente paso
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <CreditCard size={24} />
        Información de Pago
      </h2>
      
      {/* Formulario de Pago Seguro con Stripe */}
      <PaymentForm 
        onPaymentSuccess={handlePaymentSuccess}
        onBack={onBack}
      />
    </div>
  );
}