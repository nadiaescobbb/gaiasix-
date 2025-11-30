import { useState, useCallback } from 'react';

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
}

export function useCheckoutForm() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    phone: '',
  });

  // ✅ CORREGIDO: Aceptar string como field
  const updateField = useCallback((field: string, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [field as keyof CheckoutFormData]: value 
    }));
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    switch (step) {
      case 1: // Envío
        return !!(
          formData.email &&
          formData.firstName &&
          formData.lastName &&
          formData.address &&
          formData.city &&
          formData.province &&
          formData.zipCode &&
          formData.phone
        );
      
      case 2: // Pago
        return true;
      
      case 3: // Confirmación
        return true;
      
      default:
        return false;
    }
  }, [formData]);

  return {
    formData,
    updateField,
    validateStep
  };
}