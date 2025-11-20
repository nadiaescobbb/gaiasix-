// components/layout/ClientLayout.tsx - CORREGIDO
'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';
import Header from './Header'; // ✅ IMPORTAR EL HEADER
import { type Page } from '../../lib/types';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const { isInitialized, currentUser, cartItemsCount, logout, wishlistItemsCount } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Efecto para manejar transiciones de página
  useEffect(() => {
    if (isInitialized) {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  // Efecto para resetear scroll al cambiar de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Determinar la página actual basado en la ruta
  useEffect(() => {
    if (pathname === '/') setCurrentPage('home');
    else if (pathname === '/shop') setCurrentPage('shop');
    else if (pathname === '/about') setCurrentPage('about');
    else if (pathname === '/contact') setCurrentPage('contact');
    else if (pathname === '/auth') setCurrentPage('auth');
    else if (pathname === '/profile') setCurrentPage('profile');
    else if (pathname === '/wishlist') setCurrentPage('wishlist');
  }, [pathname]);

  // Funciones de navegación
  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    // Aquí puedes agregar la lógica de navegación con Next.js router si es necesario
    console.log('Navegando a:', page);
  };

  const handleCartToggle = () => {
    // Aquí va tu lógica para abrir/cerrar el carrito
    console.log('Toggle carrito');
  };

  // Mostrar loading mientras la app se inicializa
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-light text-gray-600">GAIA SIX</div>
          <div className="text-sm text-gray-500 mt-2">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        currentUser={currentUser}
        cartItemsCount={cartItemsCount}
        wishlistItemsCount={wishlistItemsCount}
        onNavigate={handleNavigate}
        onCartToggle={handleCartToggle}
        onLogout={logout}
        currentPage={currentPage}
      />
      
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}