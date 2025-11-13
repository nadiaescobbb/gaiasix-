"use client";

import { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';

// Page Components
import HomePage from './components/pages/HomePage';
import ShopPage from './components/pages/ShopPage';
import AboutPage from './components/pages/AboutPage';
import AuthPage from './components/pages/AuthPage';
import ProfilePage from './components/pages/ProfilePage';



// Componente interno que usa el contexto
function AppContent() {
  // Estado de navegación
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Usar el contexto
  const { 
    currentUser, 
    cart, 
    cartTotal, 
    cartItemsCount,
    login,
    register,
    logout,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    updateUserOrders
  } = useAppContext();

  // Handlers
  const handleCheckout = () => {
    if (!currentUser) {
      setCurrentPage('auth');
      setAuthMode('login');
      setCartOpen(false);
      return;
    }
    
    const order = {
      id: Date.now(),
      items: cart,
      total: cartTotal,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    updateUserOrders(order.id, order);
    clearCart();
    setCartOpen(false);
    alert('¡Pedido realizado! Te contactaremos pronto.');
  };

  const handleLogin = (email, password) => {
    const result = login(email, password);
    if (result.success) {
      setCurrentPage('home');
    }
    return result;
  };

  const handleRegister = (userData) => {
    const result = register(userData);
    if (result.success) {
      setCurrentPage('home');
    }
    return result;
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  const handleAddToCart = (product, size) => {
    addToCart(product, size);
    setCartOpen(true);
  };

  // Renderizado condicional de páginas
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      
      case 'shop':
        return (
          <ShopPage 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
          />
        );
      
      case 'about':
        return <AboutPage />;
      
      case 'auth':
        return (
          <AuthPage 
            mode={authMode}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onToggleMode={() => setAuthMode(mode => mode === 'login' ? 'register' : 'login')}
          />
        );
      
      case 'profile':
        return currentUser ? (
          <ProfilePage 
            user={currentUser}
            onLogout={handleLogout}
          />
        ) : (
          <AuthPage 
            mode="login"
            onLogin={handleLogin}
            onRegister={handleRegister}
            onToggleMode={() => setAuthMode(mode => mode === 'login' ? 'register' : 'login')}
          />
        );
      
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header 
        currentUser={currentUser}
        cartItemsCount={cartItemsCount}
        onNavigate={setCurrentPage}
        onCartToggle={() => setCartOpen(true)}
        onLogout={handleLogout}
      />
      
      {renderPage()}
      
      <CartSidebar 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        currentUser={currentUser}
      />
      
      <Footer />
    </div>
  );
}

// Componente principal que envuelve todo con el Provider
export default function GaiaSix() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}