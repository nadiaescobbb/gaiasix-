"use client";

import { formatPrice, formatDate } from '../../../utils/formatters';
import { type User } from '../../../lib/types';

// ===================================================
// TYPES
// ===================================================

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
}

interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  date: string;
  status: string;
  items: OrderItem[];
  total: number;
}

// ===================================================
// PROFILE PAGE COMPONENT
// ===================================================

export default function ProfilePage({ user, onLogout }: ProfilePageProps) {
  const orders: Order[] = user?.orders || [];

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200">
          <h2 className="text-3xl font-light">Mi cuenta</h2>
          <button
            onClick={onLogout}
            className="text-sm uppercase tracking-wide hover:text-red-800 transition-colors"
          >
            Salir
          </button>
        </div>
        
        {/* Información del usuario */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Nombre</p>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Email</p>
              <p className="text-lg">{user.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Teléfono</p>
              <p className="text-lg">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Historial de pedidos */}
        <div>
          <h3 className="text-2xl font-light mb-8">Pedidos</h3>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-12">Sin pedidos</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order: Order) => (
                <div key={order.id} className="border-b border-gray-200 pb-6">
                  <div className="flex justify-between mb-4">
                    <span className="text-xs uppercase tracking-wide text-gray-500">
                      {formatDate(order.date)}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-green-600">
                      {order.status === 'pending' ? 'Pendiente' : 'Completado'}
                    </span>
                  </div>
                  
                  {/* Items del pedido */}
                  {order.items.map((item: OrderItem, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm mb-2">
                      <span>{item.name} ({item.size}) x{item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between font-semibold mt-4">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}