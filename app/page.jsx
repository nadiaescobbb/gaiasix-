"use client";

import { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { ToastProvider, useToast } from './context/ToastContext';
import ProductPage from './components/pages/ProductPage';

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

// ==========================================
// APP CONTENT - Componente interno con Toast
// ==========================================

function AppContent() {
  // Toast hook
  const { success, error, warning } = useToast();
  
  // Estado de navegación
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ Nuevo estado

  // Context
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

  // ==========================================
  // HANDLERS CON TOAST FEEDBACK
  // ==========================================

  const handleCheckout = () => {
    if (!currentUser) {
      warning('Necesitás iniciar sesión para continuar');
      setCurrentPage('auth');
      setAuthMode('login');
      setCartOpen(false);
      return;
    }
    
    if (cart.length === 0) {
      warning('Tu carrito está vacío');
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
    
    success('¡Pedido realizado! Te contactaremos pronto 🎉');
    
    // Navegar al perfil después de 1 segundo
    setTimeout(() => {
      setCurrentPage('profile');
    }, 1000);
  };

  const handleLogin = (email, password) => {
    const result = login(email, password);
    if (result.success) {
      success('¡Bienvenida de nuevo! 👋');
      setCurrentPage('home');
    } else {
      error(result.error);
    }
    return result;
  };

  const handleRegister = (userData) => {
    const result = register(userData);
    if (result.success) {
      success('¡Cuenta creada exitosamente! 🎊');
      setCurrentPage('home');
    } else {
      error(result.error);
    }
    return result;
  };

  const handleLogout = () => {
    logout();
    success('Sesión cerrada correctamente');
    setCurrentPage('home');
  };

  const handleAddToCart = (product, size) => {
    // Verificar stock
    if (!product.stock || product.stock <= 0) {
      error('Producto sin stock disponible');
      return;
    }

    // Verificar si ya existe en el carrito
    const existingItem = cart.find(item => 
      item.id === product.id && item.size === size
    );

    if (existingItem && existingItem.quantity >= product.stock) {
      warning('No hay más stock disponible de este producto');
      return;
    }

    addToCart(product, size);
    success(`${product.name} agregado al carrito`);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId, size, newQuantity) => {
    const item = cart.find(i => i.id === productId && i.size === size);
    
    if (item && newQuantity > item.stock) {
      warning('Stock máximo alcanzado');
      return;
    }

    updateQuantity(productId, size, newQuantity);
  };

  const handleRemoveFromCart = (productId, size) => {
    removeFromCart(productId, size);
    success('Producto eliminado del carrito');
  };

  // ✅ NUEVO HANDLER: Seleccionar producto
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  // ✅ NUEVO HANDLER: Volver desde producto
  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setCurrentPage('shop');
  };

  // ==========================================
  // NAVEGACIÓN CON PROTECCIÓN
  // ==========================================

  const handleNavigate = (page) => {
    // Proteger página de perfil
    if (page === 'profile' && !currentUser) {
      warning('Necesitás iniciar sesión');
      setCurrentPage('auth');
      setAuthMode('login');
      return;
    }

    // Si navegamos lejos de product, limpiar producto seleccionado
    if (page !== 'product') {
      setSelectedProduct(null);
    }

    setCurrentPage(page);
  };

  // ==========================================
  // RENDERIZADO DE PÁGINAS
  // ==========================================

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      
      case 'shop':
        return (
          <ShopPage 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onProductSelect={handleProductSelect} // ✅ Pasar nuevo handler
          />
        );
      
      // ✅ NUEVO CASE: Product Page
      case 'product':
        return (
          <ProductPage 
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={handleBackFromProduct}
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
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header 
        currentUser={currentUser}
        cartItemsCount={cartItemsCount}
        onNavigate={handleNavigate}
        onCartToggle={() => setCartOpen(true)}
        onLogout={handleLogout}
        currentPage={currentPage}
      />
      
      {renderPage()}
      
      <CartSidebar 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        currentUser={currentUser}
      />
      
      <Footer />

      {/* Estilos para animación de Toast */}
      <style jsx global>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL CON PROVIDERS
// ==========================================

export default function GaiaSix() {
  return (
    <ToastProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ToastProvider>
  );
}