// app/checkout/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAppContext } from '.../../../context/AppContext';
import { useRouter } from 'next/navigation';
import { 
  ShippingMethod, 
  shippingMethods, 
  argentinianProvinces, 
  calculateShipping,
  getAvailableMethodsForProvince 
} from '.../../../config/shipping';
import { formatPrice } from '.../../../utils/formatters';
import { Truck, CreditCard, CheckCircle, ArrowLeft, MapPin, User, Mail, Phone } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, currentUser, updateUserOrders } = useAppContext();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [loadingShipping, setLoadingShipping] = useState(false);
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    email: currentUser?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [cart, router]);

  // Cargar métodos de envío disponibles y calcular costo
  useEffect(() => {
    const loadShippingMethods = async () => {
      if (formData.province) {
        const methods = getAvailableMethodsForProvince(formData.province);
        if (methods.length > 0 && !selectedShipping) {
          const defaultMethod = methods[0];
          setSelectedShipping(defaultMethod);
          
          // Calcular costo de envío
          setLoadingShipping(true);
          try {
            const cost = await calculateShipping(cartTotal, defaultMethod.id);
            setShippingCost(cost);
          } catch (error) {
            console.error('Error calculando envío:', error);
            setShippingCost(defaultMethod.price);
          } finally {
            setLoadingShipping(false);
          }
        }
      }
    };

    loadShippingMethods();
  }, [formData.province, selectedShipping, cartTotal]);

  // Actualizar costo de envío cuando cambia el método seleccionado
  useEffect(() => {
    const updateShippingCost = async () => {
      if (selectedShipping) {
        setLoadingShipping(true);
        try {
          const cost = await calculateShipping(cartTotal, selectedShipping.id);
          setShippingCost(cost);
        } catch (error) {
          console.error('Error calculando envío:', error);
          setShippingCost(selectedShipping.price);
        } finally {
          setLoadingShipping(false);
        }
      }
    };

    updateShippingCost();
  }, [selectedShipping, cartTotal]);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Carrito vacío</h1>
          <p className="text-gray-600 mb-6">Agrega productos para proceder al checkout</p>
          <button 
            onClick={() => router.push('/shop')}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continuar comprando
          </button>
        </div>
      </div>
    );
  }

  const finalTotal = cartTotal + shippingCost;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const hasFreeShipping = shippingCost === 0 && cartTotal > 0;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Crear orden
      const orderData = {
        items: cart,
        total: finalTotal,
        date: new Date().toISOString(),
        status: 'confirmed' as const,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.province,
          zipCode: formData.zipCode,
          country: 'Argentina'
        },
        trackingNumber: `TRK${Date.now()}`
      };

      // Guardar orden en el usuario
      if (currentUser) {
        updateUserOrders(orderData);
      }

      // Redirigir a confirmación
      router.push('/checkout/success');
      
    } catch (error) {
      console.error('Error procesando orden:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const canProceedToShipping = () => {
    return formData.email && formData.firstName && formData.lastName && 
           formData.address && formData.city && formData.province && 
           formData.zipCode && formData.phone;
  };

  const canProceedToPayment = () => {
    return canProceedToShipping() && selectedShipping;
  };

  const canSubmitOrder = () => {
    return canProceedToPayment() && formData.cardNumber && formData.expiryDate && 
           formData.cvv && formData.cardName;
  };

  // Función para manejar cambio de método de envío
  const handleShippingMethodChange = async (method: ShippingMethod) => {
    setSelectedShipping(method);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header y Navegación */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalizar Compra</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between max-w-2xl mb-6">
            {[
              { number: 1, label: 'Envío', icon: <Truck size={16} /> },
              { number: 2, label: 'Pago', icon: <CreditCard size={16} /> },
              { number: 3, label: 'Confirmar', icon: <CheckCircle size={16} /> }
            ].map((step) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > step.number ? 'bg-green-500 text-white' :
                  currentStep === step.number ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {currentStep > step.number ? '✓' : step.icon}
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep === step.number ? 'text-black' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
                {step.number < 3 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              
              {/* Paso 1: Información de Envío */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <User size={24} />
                    Información de Envío
                  </h2>
                  
                  {/* Información de Contacto */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-1" />
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-1" />
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="11 1234-5678"
                      />
                    </div>
                  </div>

                  {/* Nombre */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="María"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Gonzalez"
                      />
                    </div>
                  </div>

                  {/* Dirección */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-1" />
                      Dirección *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Av. Corrientes 1234"
                    />
                  </div>

                  {/* Ubicación */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Ciudad Autónoma de Buenos Aires"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Provincia *
                      </label>
                      <select
                        value={formData.province}
                        onChange={(e) => handleInputChange('province', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="">Seleccionar provincia</option>
                        {argentinianProvinces.map((province: string) => (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="C1043"
                      />
                    </div>
                  </div>

                  {/* Selector de Envío */}
                  {formData.province && (
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Truck size={20} />
                        Método de Envío
                        {loadingShipping && (
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                        )}
                      </h3>
                      
                      <div className="space-y-3">
                        {getAvailableMethodsForProvince(formData.province).map((method: ShippingMethod) => (
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
                              onChange={() => handleShippingMethodChange(method)}
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
                  )}

                  {/* Botón Continuar */}
                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentStep(2)}
                      disabled={!canProceedToShipping() || !selectedShipping || loadingShipping}
                      className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Continuar al pago
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 2: Información de Pago */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <CreditCard size={24} />
                    Información de Pago
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre en la tarjeta *
                      </label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="MARIA GONZALEZ"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de tarjeta *
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha de vencimiento *
                        </label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="MM/AA"
                          maxLength={5}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Botones de Navegación */}
                  <div className="flex justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                    >
                      Volver
                    </button>
                    
                    <button
                      onClick={() => setCurrentStep(3)}
                      disabled={!canProceedToPayment()}
                      className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Revisar pedido
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 3: Confirmación */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <CheckCircle size={24} />
                    Confirmar Pedido
                  </h2>
                  
                  {/* Resumen del Pedido */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Dirección de Envío</h3>
                      <p className="text-gray-600">
                        {formData.firstName} {formData.lastName}<br/>
                        {formData.address}<br/>
                        {formData.city}, {formData.province} {formData.zipCode}<br/>
                        {formData.phone}<br/>
                        {formData.email}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Método de Envío</h3>
                      <p className="text-gray-600">
                        {selectedShipping?.icon} {selectedShipping?.name}<br/>
                        {selectedShipping?.deliveryTime}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Método de Pago</h3>
                      <p className="text-gray-600">
                        Tarjeta terminada en {formData.cardNumber.slice(-4)}<br/>
                        {formData.cardName}
                      </p>
                    </div>
                  </div>

                  {/* Botones Finales */}
                  <div className="flex justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                    >
                      Volver
                    </button>
                    
                    <button
                      onClick={handleSubmitOrder}
                      disabled={!canSubmitOrder() || isProcessing}
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
              )}
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-1">
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
          </div>
        </div>
      </div>
    </div>
  );
}