import { useState, useEffect, useCallback } from 'react';
import { ShippingMethod, getAvailableMethodsForProvince, calculateShipping } from '../config/shipping';

export function useShipping(province: string) {
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod | null>(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [availableMethods, setAvailableMethods] = useState<ShippingMethod[]>([]);

  // Cargar métodos disponibles cuando cambia la provincia
  useEffect(() => {
    if (province) {
      const methods = getAvailableMethodsForProvince(province);
      setAvailableMethods(methods);
      
      // Seleccionar el primer método por defecto
      if (methods.length > 0 && !selectedShipping) {
        const defaultMethod = methods[0];
        setSelectedShipping(defaultMethod);
      }
    } else {
      setAvailableMethods([]);
      setSelectedShipping(null);
    }
  }, [province]);

  // Calcular costo de envío cuando cambia el método seleccionado
  useEffect(() => {
    const updateShippingCost = async () => {
      if (selectedShipping) {
        setLoadingShipping(true);
        try {
          // En un caso real, aquí llamarías a tu API
          const cost = await calculateShipping(0, selectedShipping.id); // cartTotal vendría como parámetro
          setShippingCost(cost);
        } catch (error) {
          console.error('Error calculando envío:', error);
          setShippingCost(selectedShipping.price); // Fallback al precio base
        } finally {
          setLoadingShipping(false);
        }
      }
    };

    updateShippingCost();
  }, [selectedShipping]);

  // Manejar cambio de método de envío
  const handleShippingMethodChange = useCallback((method: ShippingMethod) => {
    setSelectedShipping(method);
  }, []);

  return {
    selectedShipping,
    shippingCost,
    loadingShipping,
    availableMethods,
    handleShippingMethodChange
  };
}