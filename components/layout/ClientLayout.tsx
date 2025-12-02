'use client'

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';
import Header from './Header';
import HomeFooter from './Footer'; // IMPORTAR EL FOOTER
import CartSidebar from './cart/CartSidebar';
import { type Page } from '../../lib/types';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const { 
    isInitialized, 
    currentUser, 
    cart, 
    cartItemsCount, 
    cartTotal,
    logout, 
    wishlistItemsCount,
    updateQuantity,
    removeFromCart
  } = useAppContext();
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isInitialized) {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/') setCurrentPage('home');
    else if (pathname === '/shop') setCurrentPage('shop');
    else if (pathname === '/about') setCurrentPage('about');
    else if (pathname === '/contact') setCurrentPage('contact');
    else if (pathname === '/auth') setCurrentPage('auth');
    else if (pathname === '/profile') setCurrentPage('profile');
    else if (pathname === '/wishlist') setCurrentPage('wishlist');
  }, [pathname]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    
    switch (page) {
      case 'home':
        router.push('/');
        break;
      case 'shop':
        router.push('/shop');
        break;
      case 'about':
        router.push('/about');
        break;
      case 'contact':
        router.push('/contact');
        break;
      case 'auth':
        router.push('/auth');
        break;
      case 'profile':
        router.push('/profile');
        break;
      case 'wishlist':
        router.push('/wishlist');
        break;
      default:
        router.push('/');
    }
  };

  // Agregar este useEffect para manejar el evento de navegación desde page.tsx
  useEffect(() => {
    const handleNavigateToShop = () => {
      console.log('Evento navigateToShop recibido, navegando a shop...');
      handleNavigate('shop');
    };

    window.addEventListener('navigateToShop', handleNavigateToShop);
    
    return () => {
      window.removeEventListener('navigateToShop', handleNavigateToShop);
    };
  }, [handleNavigate]); // Dependencia de handleNavigate

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleUpdateQuantity = (productId: number, size: string, newQuantity: number) => {
    updateQuantity(productId, size, newQuantity);
  };

  const handleRemoveItem = (productId: number, size: string) => {
    removeFromCart(productId, size);
  };

  const handleCheckout = async () => {
    if (!currentUser) {
      router.push('/auth');
      setIsCartOpen(false);
      return;
    }
    
    console.log('Iniciando checkout...');
    setIsCartOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

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
        onLogout={handleLogout}
        currentPage={currentPage}
      />
      
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* AQUÍ AGREGAMOS EL FOOTER */}
      <HomeFooter />

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        currentUser={currentUser}
      />
    </div>
  );
}