"use client";

import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import { useCheckoutSteps } from '../../hooks/useCheckoutSteps';
import { useCheckoutForm } from '../../hooks/useCheckoutForm';
import { useShipping } from '../../hooks/useShipping';
import { CheckoutLayout } from '../../components/checkout/CheckoutLayout';
import { ProgressSteps } from '../../components/checkout/ProgressSteps';
import { OrderSummary } from '../../components/checkout/OrderSummary';
import { ShippingStep } from '../../components/checkout/steps/ShippingStep';
import { PaymentStep } from '../../components/checkout/steps/PaymentStep';
import { ReviewStep } from '../../components/checkout/steps/ReviewStep';
import { EmptyCart } from '../../components/checkout/EmptyCart';

export default function CheckoutPage() {
  const { cart, currentUser, updateUserOrders } = useAppContext();
  const router = useRouter();
  const { currentStep, nextStep, prevStep } = useCheckoutSteps();
  const { formData, updateField, validateStep } = useCheckoutForm();
  
  // ✅ Agregar useShipping hook para pasar datos al ReviewStep
  const { selectedShipping, shippingCost } = useShipping(formData.province);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  const handleSubmitOrder = async () => {
    // Simular procesamiento de orden
    try {
      // Aquí integrarás con tu backend y Stripe
      console.log('Procesando orden con:', {
        formData,
        selectedShipping,
        shippingCost
      });
      
      // Redirigir a success page
      router.push('/checkout/success');
    } catch (error) {
      console.error('Error procesando orden:', error);
    }
  };

  return (
    <CheckoutLayout>
      <ProgressSteps currentStep={currentStep} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario Principal */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {currentStep === 1 && (
              <ShippingStep 
                formData={formData}
                onFieldChange={updateField}
                onNext={nextStep}
                canProceed={validateStep(1)}
              />
            )}
            
            {currentStep === 2 && (
              <PaymentStep 
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            
            {currentStep === 3 && (
              <ReviewStep 
                formData={formData}
                selectedShipping={selectedShipping}
                shippingCost={shippingCost}
                onSubmit={handleSubmitOrder}
                onBack={prevStep}
                canSubmit={validateStep(3)}
              />
            )}
          </div>
        </div>

        {/* Resumen del Pedido */}
        <OrderSummary />
      </div>
    </CheckoutLayout>
  );
}