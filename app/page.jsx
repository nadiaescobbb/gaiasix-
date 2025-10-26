'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Heart, Menu, X, Instagram, Facebook, Mail, Phone, MapPin, Star } from 'lucide-react';

// Mock Data
const products = [
 {
    id: 1,
    name: 'top adara',
    category: 'vestidos',
    price: 7500,
    image: '/images/products/top-adara-.jpg', 
    description: 'Modelo traslúcido.',
    sizes: ['S'],
  },

 {
    id: 2,
    name: 'blusa albany',
    category: 'blusas',
    price: 20550,
    image: '/images/products/blusa-albany.jpeg', 
    description: 'Blusa de encaje elastizado manga larga con  manga larga con detalle de volados para atar a gusto en el frente. ideal para usar con una musculosa o con un corpiño.',
    sizes: ['S'],
  },

  {
    id: 3,
    name: 'Conjunto total black',
    category: 'faldas',
    price: 15670,
    image: '/images/products/conjunto-negro.jpg',
    description: 'conjunto basico',
    sizes: ['S'],
  },

  {
    id: 4,
    name: 'Falda Midi Plisada',
    category: 'faldas',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&h=700&fit=crop',
    description: 'Falda midi con pliegues elegantes',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 5,
    name: 'Conjunto Casual',
    category: 'conjuntos',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=700&fit=crop',
    description: 'Conjunto de dos piezas casual-chic',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5
  },
  {
    id: 6,
    name: 'Top Elegante',
    category: 'blusas',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=700&fit=crop',
    description: 'Top con detalles sofisticados',
    sizes: ['S', 'M', 'L'],
    rating: 4.4
  }
];

const categories = [
  { id: 'all', name: 'Todo', icon: '✨' },
  { id: 'vestidos', name: 'Vestidos', icon: '👗' },
  { id: 'blusas', name: 'Blusas', icon: '👚' },
  { id: 'pantalones', name: 'Pantalones', icon: '👖' },
  { id: 'faldas', name: 'Faldas', icon: '🎀' },
  { id: 'conjuntos', name: 'Conjuntos', icon: '✨' }
];

// Services con guards
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
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    alert('¡Pedido realizado con éxito! Te contactaremos pronto.');
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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-3xl font-playfair animate-pulse">GAIA SIX</div>
      </div>
    );
  }

  // Header Component
  const Header = () => (
    <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-3xl font-playfair font-bold tracking-wider hover:text-red-600 transition-colors"
          >
            GAIA SIX
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => setCurrentPage('home')} className="hover:text-red-600 transition-colors">Inicio</button>
            <button onClick={() => setCurrentPage('shop')} className="hover:text-red-600 transition-colors">Tienda</button>
            <button onClick={() => setCurrentPage('about')} className="hover:text-red-600 transition-colors">Nosotros</button>
          </nav>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <button 
                onClick={() => setCurrentPage('profile')}
                className="hidden md:flex items-center space-x-2 hover:text-red-600 transition-colors"
              >
                <User size={20} />
                <span className="text-sm">{currentUser.name}</span>
              </button>
            ) : (
              <button 
                onClick={() => setCurrentPage('auth')}
                className="hidden md:flex items-center space-x-2 hover:text-red-600 transition-colors"
              >
                <User size={20} />
                <span>Unite a Gaia Six</span>
              </button>
            )}
            
            <button 
              onClick={() => setCartOpen(true)}
              className="relative hover:text-red-600 transition-colors"
            >
              <ShoppingBag size={24} />
              {countCartItems(cart) > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {countCartItems(cart)}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-red-600">Inicio</button>
            <button onClick={() => { setCurrentPage('shop'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-red-600">Tienda</button>
            <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-red-600">Nosotros</button>
            {currentUser ? (
              <button onClick={() => { setCurrentPage('profile'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-red-600">Mi Perfil</button>
            ) : (
              <button onClick={() => { setCurrentPage('auth'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-red-600">Ingresar</button>
            )}
          </nav>
        )}
      </div>
    </header>
  );

  // Home Page
  const Home = () => (
    <div className="min-h-screen">
      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-white rounded-full blur-3xl opacity-10" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1s'}}></div>
        
        <div className="relative z-10 text-center px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="">
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-6 tracking-tight leading-tight">
              Tu estilo,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                sin excusas
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Ropa que fluye con vos. Cómoda cuando necesitás moverte, 
              <span className="text-white font-medium"> elegante cuando querés brillar.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
                onClick={() => setCurrentPage('shop')}
                className="group bg-red-600 text-white px-10 py-4 text-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-2xl rounded-sm relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Ver Looks
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              
              <button 
                onClick={() => setCurrentPage('about')}
                className="group border-2 border-white text-white px-10 py-4 text-lg font-semibold hover:bg-white hover:text-black transition-all rounded-sm"
              >
                <span className="flex items-center gap-2">
                  Nuestra historia
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-white/20 pt-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-red-400">3</p>
                <p className="text-sm text-gray-300 mt-1">Cuotas sin interés</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">24hs</p>
                <p className="text-sm text-gray-300 mt-1">Envío gratis</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-red-400">500+</p>
                <p className="text-sm text-gray-300 mt-1">Clientas felices</p>
              </div>
            </div>
          </div>
        </div>
        

      </div>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-center mb-16">
            Nuestros favoritos, hasta en 3 cuotas sin interés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white p-2 rounded-full shadow-lg hover:bg-red-600 hover:text-white transition-colors">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">{formatPrice(product.price)}</span>
                    <button 
                      onClick={() => { setSelectedProduct(product); setCurrentPage('shop'); }}
                      className="bg-black text-white px-6 py-2 hover:bg-red-600 transition-colors"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-playfair font-bold mb-6">Más que ropa, es tu momento</h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Gaia Six nació para vos, para esos días donde querés sentirte increíble sin pensarlo demasiado. 
              <span className="text-white font-semibold"> Ropa que habla tu idioma: </span>
              cómoda, con onda y lista para lo que venga.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              No seguimos tendencias, creamos las nuestras. Cada prenda está diseñada para que la combines como quieras, 
              sin reglas ni complicaciones. 
              <span className="text-red-400"> Porque tu estilo es tuyo, y punto.</span>
            </p>
            <button 
              onClick={() => setCurrentPage('about')}
              className="border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-all font-semibold group"
            >
              Conocé nuestra historia
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          <div className="relative h-96">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop"
              alt="Mujer con estilo Gaia Six"
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-lg shadow-xl max-w-xs">
              <p className="font-semibold text-sm">"Ropa que se siente tan bien como se ve" ✨</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Shop Page
  const Shop = () => {
    const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-playfair font-bold text-center mb-12">Looks que hablan por vos.</h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === cat.id ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => addToCart(product, size)}
                          className="bg-white text-black px-4 py-2 m-1 font-semibold hover:bg-red-600 hover:text-white transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-red-600">{formatPrice(product.price)}</p>
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
      <div className="relative h-96 bg-gradient-to-r from-black to-red-950">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-playfair font-bold text-white">Sobre Nosotros</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="prose prose-lg mx-auto">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            <strong>Gaia Six</strong> empezó con tres hermanas que querían ropa que acompañe su día a día. Nada complicado, solo prendas cómodas, con onda y fáciles de combinar.
          </p>
          
          <h2 className="text-3xl font-playfair font-bold mt-12 mb-6">Nuestra filosofía</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            La moda no tiene que ser difícil. Aquí vas a encontrar prendas que se sienten bien y se adaptan a vos, sin reglas ni poses.
          </p>

          <h2 className="text-3xl font-playfair font-bold mt-12 mb-6">Nuestros valores</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 mr-3 text-2xl">✦</span>
              <span><strong>Autenticidad:</strong> Ropa que refleja quién sos, sin filtros.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-3 text-2xl">✦</span>
              <span><strong>Calidad:</strong> Materiales que se sienten bien y duran.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-3 text-2xl">✦</span>
              <span><strong>Estilo:</strong> Diseños simples, con onda, que marcan la diferencia sin exagerar.</span>
            </li>
          </ul>
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-playfair font-bold text-center mb-8">
            {authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {authMode === 'register' && (
              <>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />
              </>
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              required
            />
            
            <input
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              required
            />
            
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              {authMode === 'login' ? 'Ingresar' : 'Registrarse'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-red-600 hover:underline"
            >
              {authMode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
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
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-playfair font-bold">Mi Perfil</h2>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-600">Nombre</label>
                <p className="text-lg font-semibold">{currentUser.name}</p>
              </div>
              <div>
                <label className="text-gray-600">Email</label>
                <p className="text-lg font-semibold">{currentUser.email}</p>
              </div>
              <div>
                <label className="text-gray-600">Teléfono</label>
                <p className="text-lg font-semibold">{currentUser.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-playfair font-bold mb-6">Historial de Pedidos</h3>
            {userOrders.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No tienes pedidos realizados aún</p>
            ) : (
              <div className="space-y-4">
                {userOrders.map(order => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Pedido #{order.id}</p>
                        <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {order.status === 'pending' ? 'Pendiente' : 'Completado'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.name} - Talla {item.size} x{item.quantity}</span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t mt-4 pt-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-red-600">{formatPrice(order.total)}</span>
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
  };

  // Cart Sidebar
  const CartSidebar = () => (
    <>
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setCartOpen(false)} />
      )}
      
      <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        cartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-playfair font-bold">Carrito</h2>
            <button onClick={() => setCartOpen(false)} className="hover:text-red-600">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4 border-b pb-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">Talla: {item.size}</p>
                      <p className="text-red-600 font-bold">{formatPrice(item.price)}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="ml-auto text-red-600 hover:text-red-700 text-sm"
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
            <div className="border-t p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-red-600">
                  {formatPrice(calculateCartTotal(cart))}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-playfair font-bold mb-4">GAIA SIX</h3>
          <p className="text-gray-400">Cada prenda vibra con libertad, confianza y presencia.</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2 text-gray-400">
            <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Inicio</button></li>
            <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white">Tienda</button></li>
            <li><button onClick={() => setCurrentPage('about')} className="hover:text-white">Nosotros</button></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Vení a vernos</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <span>gaiashowrrom@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <span>+54 9 2964479923</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Tierra del fuego, Argentina</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Mirá los looks en IG</h4>
          <div className="flex gap-4">
            <a href="https://instagram.com/gaiasix" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; 2025 Gaia Six. Todos los derechos reservados</p>
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
      
      <Header />
      {renderPage()}
      <CartSidebar />
      <Footer />
    </div>
  );
}