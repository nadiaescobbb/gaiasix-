"use client";

import { useState, useEffect } from 'react';
import { Truck, User, Mail, Phone, MapPin } from 'lucide-react';
import { ShippingMethod, getAvailableMethodsForProvince, calculateShipping } from '../../../config/shipping';
import { useShipping } from '.../../../hooks/useShipping';
import { ContactInfo } from './../forms/ContactInfo';
import { AddressForm } from './../forms/AddressForm';
import { ShippingSelector } from './../forms/shippingSelector';

interface ShippingStepProps {
  formData: any;
  onFieldChange: (field: string, value: string) => void;
  onNext: () => void;
  canProceed: boolean;
}

export function ShippingStep({ formData, onFieldChange, onNext, canProceed }: ShippingStepProps) {
  const { selectedShipping, shippingCost, loadingShipping, handleShippingMethodChange } = useShipping(formData.province);

  const isStepComplete = canProceed && selectedShipping && !loadingShipping;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <User size={24} />
        Información de Envío
      </h2>
      
      {/* Información de Contacto */}
      <ContactInfo 
        formData={formData}
        onFieldChange={onFieldChange}
      />

      {/* Dirección */}
      <AddressForm 
        formData={formData}
        onFieldChange={onFieldChange}
      />

      {/* Selector de Envío */}
      {formData.province && (
        <ShippingSelector
          province={formData.province}
          selectedShipping={selectedShipping}
          shippingCost={shippingCost}
          loadingShipping={loadingShipping}
          onShippingMethodChange={handleShippingMethodChange}
        />
      )}

      {/* Botón Continuar */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={onNext}
          disabled={!isStepComplete}
          className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continuar al pago
        </button>
      </div>
    </div>
  );
}