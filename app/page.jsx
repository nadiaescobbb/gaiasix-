'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'top adara',
    category: 'vestidos',
    price: 7500,
    image: '/images/products/top-adara-.jpg', 
    sizes: ['S'],
  },
  {
    id: 2,
    name: 'blusa albany',
    category: 'blusas',
    price: 20550,
    image: '/images/products/blusa-albany.jpeg', 
    sizes: ['S'],
  },
  {
    id: 3,
    name: 'conjunto total black',
    category: 'faldas',
    price: 15670,
    image: '/images/products/conjunto-negro.jpg',
    sizes: ['S'],
  },
  {
    id: 4,
    name: 'top borgo',
    category: 'faldas',
    price: 12450,
    image: '/images/products/top-borgo.jpg',
    sizes: ['S', 'M'],
  },
];

const categories = [
  { id: 'vestidos', name: 'Vestidos' },
  { id: 'blusas', name: 'Blusas' },
  { id: 'pantalones', name: 'Pantalones' },
  { id: 'faldas', name: 'Faldas' },
  { id: 'conjuntos', name: 'Conjuntos' }
];

const authService = {
  login: (email, password) => {
    if (typeof window === 'undefined') return null;
    const users = JSON.parse(localStorage.getItem('gaia_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('gaia_current_user', JSON.stringify(user));
      return user;
    }
    return null;
  },
  register: (userData) => {
    if (typeof window === 'undefined') return null;
    const users = JSON.parse(localStorage.getItem('gaia_users') || '[]');
    const newUser = { ...userData, id: Date.now(), orders: [] };
    users.push(newUser);
    localStorage.setItem('gaia_users', JSON.stringify(users));
    localStorage.setItem('gaia_current_user', JSON.stringify(newUser));
    return newUser;
  },
  logout: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('gaia_current_user');
  },
  getCurrentUser: () => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('gaia_current_user');
    return user ? JSON.parse(user) : null;
  }
};

const orderService = {
  createOrder: (userId, cart, total) => {
    if (typeof window === 'undefined') return null;
    const order = {
      id: Date.now(),
      userId,
      items: cart,
      total,
      date: new Date().toISOString(),
      status: 'pending'
    };
    const orders = JSON.parse(localStorage.getItem('gaia_orders') || '[]');
    orders.push(order);
    localStorage.setItem('gaia_orders', JSON.stringify(orders));
    return order;
  },
  getUserOrders: (userId) => {
    if (typeof window === 'undefined') return [];
    const orders = JSON.parse(localStorage.getItem('gaia_orders') || '[]');
    return orders.filter(o => o.userId === userId);
  }
};

// Utils
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
};

const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const countCartItems = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Main Component
export default function GaiaSix() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const user = authService.getCurrentUser();
      if (user) setCurrentUser(user);
      const savedCart = localStorage.getItem('gaia_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('gaia_cart', JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const addToCart = (product, size) => {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, size, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCart(cart.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size);
    } else {
      setCart(cart.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const handleCheckout = () => {
    if (!currentUser) {
      setCurrentPage('auth');
      setAuthMode('login');
      return;
    }
    const total = calculateCartTotal(cart);
    orderService.createOrder(currentUser.id, cart, total);
    setCart([]);
    setCartOpen(false);
    alert('Pedido realizado. Te contactaremos pronto.');
  };

  const handleLogin = (email, password) => {
    const user = authService.login(email, password);
    if (user) {
      setCurrentUser(user);
      setCurrentPage('home');
    } else {
      alert('Email o contraseña incorrectos');
    }
  };

  const handleRegister = (userData) => {
    const user = authService.register(userData);
    setCurrentUser(user);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setCurrentPage('home');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-black text-3xl font-playfair">GAIA SIX</div>
      </div>
    );
  }

  // Header ComponenT
  const Header = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-xl font-playfair font-bold tracking-widest hover:text-bordo transition-colors"
          >
            GAIA SIX
          </button>

          <nav className="hidden md:flex items-center space-x-12">
            <button onClick={() => setCurrentPage('shop')} className="text-sm uppercase tracking-wide hover:text-bordo transition-colors">Tienda</button>
            <button onClick={() => setCurrentPage('about')} className="text-sm uppercase tracking-wide hover:text-bordo transition-colors">Nosotros</button>
          </nav>

          <div className="flex items-center space-x-6">
            {currentUser ? (
              <button onClick={() => setCurrentPage('profile')} className="hidden md:block">
                <User size={20} className="hover:text-bordo transition-colors" />
              </button>
            ) : (
              <button onClick={() => setCurrentPage('auth')} className="hidden md:block">
                <User size={20} className="hover:text-bordo transition-colors" />
              </button>
            )}
            
            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingBag size={20} className="hover:text-bordo transition-colors" />
              {countCartItems(cart) > 0 && (
                <span className="absolute -top-2 -right-2 bg-bordo text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {countCartItems(cart)}
                </span>
              )}
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 space-y-3">
            <button onClick={() => { setCurrentPage('shop'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm">Tienda</button>
            <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm">Nosotros</button>
            {currentUser ? (
              <button onClick={() => { setCurrentPage('profile'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm">Mi Perfil</button>
            ) : (
              <button onClick={() => { setCurrentPage('auth'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm">Ingresar</button>
            )}
          </nav>
        )}
      </div>
    </header>
  );

  // Home Page 
  const Home = () => (
    <div className="min-h-screen">
      <div className="relative min-h-screen bg-white flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        
        <div className="relative z-10 text-center px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <h1 className="text-6xl md:text-8xl font-playfair font-light text-black tracking-tight">
              Tu estilo
            </h1>
            
            <button 
              onClick={() => setCurrentPage('shop')}
              className="border border-black px-12 py-4 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              Ver Colección
            </button>
            
            <div className="flex justify-center gap-16 pt-12 text-xs uppercase tracking-widest text-gray-600">
              <div className="text-center">
                <p className="text-2xl font-light text-black">3</p>
                <p className="mt-1">Cuotas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-light text-black">24hs</p>
                <p className="mt-1">Envío</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map(product => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm uppercase tracking-wide">{product.name}</h3>
                  <span className="text-sm">{formatPrice(product.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // Shop Page 
  const Shop = () => {
    const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);

    return (
      <div className="min-h-screen bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 text-xs uppercase tracking-widest transition-all ${
                  selectedCategory === cat.id 
                    ? 'border-b-2 border-black' 
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => addToCart(product, size)}
                          className="bg-white px-4 py-2 text-xs uppercase tracking-wide hover:bg-bordo hover:text-white transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <h3 className="uppercase tracking-wide">{product.name}</h3>
                  <span>{formatPrice(product.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // About Page
  const About = () => (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-playfair font-light mb-12">Gaia Six</h1>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <p>
            Tres hermanas. Ropa que acompaña tu día a día.
          </p>
          
          <p>
            Sin reglas. Sin poses. Solo prendas que se sienten bien.
          </p>
        </div>
      </div>
    </div>
  );

  // Auth Page 
  const AuthPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (authMode === 'login') {
        handleLogin(formData.email, formData.password);
      } else {
        handleRegister(formData);
      }
    };

    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-playfair font-light text-center mb-12">
            {authMode === 'login' ? 'Ingresar' : 'Crear cuenta'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {authMode === 'register' && (
              <>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                  required
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                  required
                />
              </>
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
              required
            />
            
            <input
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
              required
            />
            
            <button
              type="submit"
              className="w-full border border-black py-4 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 mt-8"
            >
              {authMode === 'login' ? 'Ingresar' : 'Registrarse'}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              {authMode === 'login' ? 'Crear cuenta' : 'Ya tengo cuenta'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Profile Page 
  const ProfilePage = () => {
    const userOrders = orderService.getUserOrders(currentUser.id);

    return (
      <div className="min-h-screen bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200">
            <h2 className="text-3xl font-playfair font-light">Mi cuenta</h2>
            <button
              onClick={handleLogout}
              className="text-sm uppercase tracking-wide hover:text-bordo transition-colors"
            >
              Salir
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Nombre</p>
                <p className="text-lg">{currentUser.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Email</p>
                <p className="text-lg">{currentUser.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Teléfono</p>
                <p className="text-lg">{currentUser.phone}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-playfair font-light mb-8">Pedidos</h3>
            {userOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-12">Sin pedidos</p>
            ) : (
              <div className="space-y-6">
                {userOrders.map(order => (
                  <div key={order.id} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between mb-4">
                      <span className="text-xs uppercase tracking-wide text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs uppercase tracking-wide">{order.status === 'pending' ? 'Pendiente' : 'Completado'}</span>
                    </div>
                    {order.items.map((item, idx) => (
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
  };

  // Cart Sidebar 
  const CartSidebar = () => (
    <>
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50" onClick={() => setCartOpen(false)} />
      )}
      
      <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        cartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-playfair font-light">Carrito</h2>
            <button onClick={() => setCartOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-12">Vacío</p>
            ) : (
              <div className="space-y-6">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm uppercase tracking-wide mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">Talla {item.size}</p>
                      <p className="text-sm mb-2">{formatPrice(item.price)}</p>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:border-black transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:border-black transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="ml-auto text-xs text-gray-500 hover:text-black transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between mb-6">
                <span className="text-sm uppercase tracking-wide">Total</span>
                <span className="text-lg">{formatPrice(calculateCartTotal(cart))}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full border border-black py-4 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
              >
                Finalizar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Footer 
  const Footer = () => (
    <footer className="bg-white border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-sm font-playfair mb-4">GAIA SIX</h3>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <Mail size={14} />
            gaiashowrrom@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <Phone size={14} />
            +54 9 2964479923
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={14} />
            Tierra del Fuego
          </p>
        </div>
        
        <div>
          <a href="https://instagram.com/gaiasix" target="_blank" rel="noopener noreferrer" className="inline-block">
            <Instagram size={20} className="hover:text-bordo transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );

  // Render current page
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'about':
        return <About />;
      case 'auth':
        return <AuthPage />;
      case 'profile':
        return currentUser ? <ProfilePage /> : <AuthPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      {renderPage()}
      <CartSidebar />
      <Footer />
    </div>
  );
}