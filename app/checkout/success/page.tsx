// app/checkout/success/page.tsx
"use client";

import { useEffect } from 'react';
import { useAppContext } from './../../../context/AppContext';
import { CheckCircle, ShoppingBag, Truck, Home } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const { clearCart } = useAppContext();

  useEffect(() => {
    // Limpiar carrito cuando se muestra la página de éxito
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="mb-6">
          <CheckCircle size={64} className="text-green-500 mx-auto" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Pedido Confirmado!</h1>
        
        <p className="text-gray-600 mb-2">
          Tu pedido ha sido procesado exitosamente.
        </p>
        <p className="text-gray-600 mb-6">
          Te enviaremos un email con los detalles de seguimiento.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/orders"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={20} />
            Ver mis pedidos
          </Link>
          
          <Link 
            href="/shop"
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Seguir comprando
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <Truck size={20} />
            <span className="font-semibold">Próximos pasos</span>
          </div>
          <p className="text-sm text-blue-600 text-left">
            • Recibirás un email de confirmación<br/>
            • Tu pedido será procesado en 24-48 horas<br/>
            • Te notificaremos cuando sea enviado
          </p>
        </div>
      </div>
    </div>
  );
}