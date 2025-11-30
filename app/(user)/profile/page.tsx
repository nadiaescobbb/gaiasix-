"use client";

import { formatPrice, formatDate } from '../../../utils/formatters';
import { type User } from '../../../lib/types';
import { LogOut, User as UserIcon, Package, Mail, Phone } from 'lucide-react';

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
// PROFILE PAGE COMPONENT - ESTILO GAIA SIX
// ===================================================

export default function ProfilePage({ user, onLogout }: ProfilePageProps) {
  const orders: Order[] = user?.orders || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-gaia-crimson';
      case 'pending':
        return 'text-amber-600';
      case 'shipped':
        return 'text-blue-600';
      default:
        return 'text-gaia-silver';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'pending':
        return 'Confirmando';
      case 'shipped':
        return 'En camino';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gaia-white pt-24 pb-16">
      <div className="container-gaia">
        {/* Header - Estilo Gaia */}
        <div className="flex items-center justify-between mb-16 pb-8 border-b border-gaia-border">
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-3 font-display tracking-gaia-tight">
              Mi Espacio
            </h2>
            <p className="text-gaia-silver font-body">
              Gestión de tu experiencia Gaia Six
            </p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm uppercase tracking-widest text-gaia-silver hover:text-gaia-crimson transition-colors duration-300 font-body"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>
        
        {/* Grid de información */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Información personal */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gaia-charcoal rounded-full flex items-center justify-center">
                <UserIcon size={24} className="text-gaia-white" />
              </div>
              <div>
                <h3 className="text-xl font-light mb-1 font-display">Información Personal</h3>
                <p className="text-gaia-silver text-sm font-body">Detalles de tu cuenta</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <p className="label-gaia text-gaia-black mb-2">Nombre</p>
                  <p className="text-lg font-light font-body">{user.name || 'No especificado'}</p>
                </div>
                <div>
                  <p className="label-gaia text-gaia-black mb-2 flex items-center gap-2">
                    <Mail size={14} />
                    Email
                  </p>
                  <p className="text-lg font-light font-body">{user.email}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="label-gaia text-gaia-black mb-2 flex items-center gap-2">
                    <Phone size={14} />
                    Teléfono
                  </p>
                  <p className="text-lg font-light font-body">{user.phone || 'No especificado'}</p>
                </div>
                <div>
                  <p className="label-gaia text-gaia-black mb-2">Miembro desde</p>
                  <p className="text-lg font-light font-body">
                    {user.createdAt ? formatDate(user.createdAt) : 'Reciente'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="bg-gaia-charcoal/5 p-6 rounded-sm border border-gaia-border">
            <h4 className="text-sm uppercase tracking-widest text-gaia-silver mb-6 font-body">
              Resumen
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gaia-border">
                <span className="text-gaia-silver text-sm font-body">Pedidos totales</span>
                <span className="text-lg font-light font-body">{orders.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gaia-silver text-sm font-body">Estado</span>
                <span className="text-gaia-crimson text-sm font-medium font-body">Activo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Historial de pedidos - Estilo Editorial */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-gaia-charcoal rounded-sm flex items-center justify-center">
              <Package size={20} className="text-gaia-white" />
            </div>
            <div>
              <h3 className="text-2xl font-light mb-1 font-display">Historial de Pedidos</h3>
              <p className="text-gaia-silver text-sm font-body">Tus compras en Gaia Six</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16 border border-gaia-border rounded-sm">
              <Package size={48} className="mx-auto text-gaia-silver mb-4" />
              <p className="text-gaia-silver text-lg mb-2 font-body">Aún no tienes pedidos</p>
              <p className="text-gaia-silver text-sm font-body">
                Descubre nuestra colección y encuentra tu estilo
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order: Order) => (
                <div 
                  key={order.id} 
                  className="border border-gaia-border rounded-sm p-6 hover:border-gaia-silver transition-colors duration-300 group"
                >
                  {/* Header del pedido */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <div>
                      <p className="label-gaia text-gaia-black mb-1">Pedido #{order.id}</p>
                      <p className="text-sm text-gaia-silver font-body">
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs uppercase tracking-widest font-medium ${getStatusColor(order.status)} font-body`}>
                        {getStatusText(order.status)}
                      </span>
                      <span className="text-lg font-light font-body">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Items del pedido */}
                  <div className="space-y-3 mb-6">
                    {order.items.map((item: OrderItem, idx: number) => (
                      <div 
                        key={idx} 
                        className="flex justify-between items-center py-3 border-b border-gaia-border last:border-b-0 group-hover:border-gaia-silver transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-light font-body">{item.name}</p>
                          <p className="text-sm text-gaia-silver font-body">
                            Talle: {item.size} • Cantidad: {item.quantity}
                          </p>
                        </div>
                        <span className="font-light font-body">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Footer del pedido */}
                  <div className="flex justify-between items-center pt-4 border-t border-gaia-border">
                    <span className="text-sm text-gaia-silver font-body">
                      {order.items.length} producto{order.items.length > 1 ? 's' : ''}
                    </span>
                    <div className="text-right">
                      <p className="label-gaia text-gaia-black">Total</p>
                      <p className="text-xl font-light font-body">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Acciones adicionales */}
        {orders.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gaia-border">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-gaia-secondary text-sm">
                Descargar historial
              </button>
              <button className="btn-gaia-secondary text-sm">
                Contactar soporte
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}