"use client";

import { useAppContext } from '../../../context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { formatPrice, formatDate } from '../../../utils/formatters';
import { LogOut, User as UserIcon, Package, Mail, Phone } from 'lucide-react';

// ===================================================
// TYPES
// ===================================================

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

export default function ProfilePage() {
  const { currentUser, logout, isInitialized } = useAppContext();
  const router = useRouter();
  
  // Ordenar pedidos por fecha (más reciente primero)
  const orders: Order[] = (currentUser?.orders || [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Redirigir si no hay usuario Y la app está inicializada
  useEffect(() => {
    if (isInitialized && !currentUser) {
      router.push('/auth');
    }
  }, [currentUser, isInitialized, router]);

  // Mostrar loading mientras se inicializa o verifica usuario
  if (!isInitialized || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">
            {!isInitialized ? 'Inicializando...' : 'Cargando perfil...'}
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'pending':
      case 'confirmed':
        return 'text-amber-600 bg-amber-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'Entregado';
      case 'pending':
        return 'Pendiente';
      case 'confirmed':
        return 'Confirmado';
      case 'shipped':
        return 'Enviado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header - Estilo Gaia */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-16 pb-8 border-b border-gray-200 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-2 tracking-tight">
              Hola, {currentUser.name || currentUser.email.split('@')[0]} 👋
            </h2>
            <p className="text-gray-500 text-sm">
              Gestión de tu experiencia Gaia Six
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors duration-300 self-start sm:self-auto"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
        
        {/* Grid de información */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Información personal */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <UserIcon size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-light mb-1">Información Personal</h3>
                <p className="text-gray-500 text-sm">Detalles de tu cuenta</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Nombre</p>
                  <p className="text-lg font-light">{currentUser.name || 'No especificado'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={14} className="text-gray-400" />
                    <p className="text-xs uppercase tracking-wider text-gray-500">Email</p>
                  </div>
                  <p className="text-lg font-light">{currentUser.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone size={14} className="text-gray-400" />
                    <p className="text-xs uppercase tracking-wider text-gray-500">Teléfono</p>
                  </div>
                  <p className="text-lg font-light">{currentUser.phone || 'No especificado'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Miembro desde</p>
                  <p className="text-lg font-light">
                    {currentUser.createdAt ? formatDate(currentUser.createdAt) : 'Reciente'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-6">
              Resumen
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600 text-sm">Pedidos totales</span>
                <span className="text-lg font-semibold">{orders.length}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600 text-sm">Estado</span>
                <span className="text-green-600 text-sm font-medium">Activo</span>
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-2">Última actualización</p>
                <p className="text-sm text-gray-600">
                  {currentUser.updatedAt ? formatDate(currentUser.updatedAt) : 'Hoy'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Historial de pedidos - Estilo Editorial */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-light mb-1">Historial de Pedidos</h3>
              <p className="text-gray-500 text-sm">Tus compras en Gaia Six</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-2 font-light">Aún no tienes pedidos</p>
              <p className="text-gray-400 text-sm mb-6">
                Descubre nuestra colección y encuentra tu estilo
              </p>
              <button
                onClick={() => router.push('/shop')}
                className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm"
              >
                Explorar colección
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order: Order) => (
                <div 
                  key={order.id} 
                  className="border border-gray-200 rounded-lg p-6 hover:border-gray-400 transition-colors duration-300 group bg-white shadow-sm hover:shadow-md"
                >
                  {/* Header del pedido */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-wider text-gray-900 mb-1 font-medium">
                        Pedido #{String(order.id).slice(-6)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Realizado el {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <span className="text-lg font-semibold">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Items del pedido */}
                  <div className="space-y-4 mb-6">
                    {order.items.map((item: OrderItem, idx: number) => (
                      <div 
                        key={idx} 
                        className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 group-hover:border-gray-200 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-light text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Talle: <span className="font-medium">{item.size}</span> • 
                            Cantidad: <span className="font-medium">{item.quantity}</span>
                          </p>
                        </div>
                        <span className="font-light text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Footer del pedido */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-200 gap-4">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{order.items.length}</span> 
                      {order.items.length === 1 ? ' producto' : ' productos'}
                    </div>
                    <div className="text-right">
                      <p className="text-sm uppercase tracking-wider text-gray-500 mb-1">Total del pedido</p>
                      <p className="text-xl font-semibold text-gray-900">{formatPrice(order.total)}</p>
                    </div>
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