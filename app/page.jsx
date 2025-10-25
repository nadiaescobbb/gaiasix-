import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Instagram, MessageCircle, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

// Productos de ejemplo
const products = [
  { id: 1, name: 'Top Cruzado Negro', category: 'tops', price: 12500, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500', description: 'Este top combina con todo y se siente increíble. Perfecto para esa salida que no planeaste pero terminó siendo épica.' },
  { id: 2, name: 'Camisa Oversized Blanca', category: 'camisas', price: 15800, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500', description: 'La camisa que necesitás en tu vida. Relajada, con onda y súper versátil. De día con jeans, de noche con una falda.' },
  { id: 3, name: 'Falda Midi Negra', category: 'faldas', price: 18900, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500', description: 'Esa falda que te hace sentir poderosa. Elegante sin ser formal, cómoda sin perder estilo.' },
  { id: 4, name: 'Pantalón Wide Leg Gris', category: 'pantalones', price: 22500, image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500', description: 'Comodidad nivel experto. Te mueves libre y te ves increíble. ¿Qué más querés?' },
  { id: 5, name: 'Campera Cuero Roja', category: 'camperas', price: 45000, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', description: 'La pieza que transforma cualquier outfit. Actitud pura en formato campera.' },
  { id: 6, name: 'Vestido Slip Negro', category: 'vestidos', price: 28500, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', description: 'Elegancia sin esfuerzo. Ese vestido que te salva en cualquier ocasión y siempre te hace sentir especial.' },
  { id: 7, name: 'Top Halter Blanco', category: 'tops', price: 11200, image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500', description: 'Fresco, simple y con ese toque que te diferencia. Para días de sol y noches de verano.' },
  { id: 8, name: 'Camisa Seda Negra', category: 'camisas', price: 19800, image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500', description: 'Lujo que se siente. Esa camisa que te hace caminar diferente.' },
  { id: 9, name: 'Falda Plisada Gris', category: 'faldas', price: 16900, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500', description: 'Movimiento y elegancia. Perfecta para sentirte femenina sin perder tu esencia.' },
  { id: 10, name: 'Pantalón Cargo Negro', category: 'pantalones', price: 24500, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500', description: 'Funcional con estilo. Para esos días que necesitás comodidad pero no querés sacrificar la onda.' },
  { id: 11, name: 'Campera Bomber Negra', category: 'camperas', price: 38000, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500', description: 'Clásica y atemporal. La campera que siempre vuelve y nunca pasa de moda.' },
  { id: 12, name: 'Vestido Midi Rojo', category: 'vestidos', price: 32500, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500', description: 'Para esos momentos que pedían algo especial. Te vas a sentir increíble, te lo garantizo.' },
];

const categories = [
  { id: 'all', name: 'Todo' },
  { id: 'tops', name: 'Tops' },
  { id: 'camisas', name: 'Camisas' },
  { id: 'faldas', name: 'Faldas' },
  { id: 'pantalones', name: 'Pantalones' },
  { id: 'camperas', name: 'Camperas' },
  { id: 'vestidos', name: 'Vestidos' },
];

const heroImages = [
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200',
];

export default function GaiaSix() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  // Hero slider automático
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    scrollToTop();
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-heading { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        
        .hero-slide {
          transition: opacity 1s ease-in-out;
        }
      `}</style>

      {/* Header */}
      <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigateTo('home')} className="font-heading text-2xl font-bold tracking-wider hover:text-gray-300 transition">
            GAIA SIX
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 font-body">
            <button onClick={() => navigateTo('home')} className="hover:text-gray-300 transition">Inicio</button>
            <button onClick={() => navigateTo('shop')} className="hover:text-gray-300 transition">Colección</button>
            <button onClick={() => navigateTo('about')} className="hover:text-gray-300 transition">Sobre Nosotras</button>
            <button onClick={() => navigateTo('contact')} className="hover:text-gray-300 transition">Contacto</button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCartOpen(!cartOpen)}
              className="relative hover:text-gray-300 transition"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden hover:text-gray-300 transition">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden bg-gray-900 px-4 py-4 space-y-3 font-body">
            <button onClick={() => navigateTo('home')} className="block w-full text-left py-2 hover:text-gray-300 transition">Inicio</button>
            <button onClick={() => navigateTo('shop')} className="block w-full text-left py-2 hover:text-gray-300 transition">Colección</button>
            <button onClick={() => navigateTo('about')} className="block w-full text-left py-2 hover:text-gray-300 transition">Sobre Nosotras</button>
            <button onClick={() => navigateTo('contact')} className="block w-full text-left py-2 hover:text-gray-300 transition">Contacto</button>
          </nav>
        )}
      </header>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div onClick={() => setCartOpen(false)} className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-2xl font-bold">Tu Carrito</h2>
                <button onClick={() => setCartOpen(false)} className="hover:text-gray-600 transition">
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="font-body text-gray-500 text-center py-8">Tu carrito está vacío</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 border-b pb-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-body font-semibold">{item.name}</h3>
                          <p className="font-body text-gray-600">${item.price.toLocaleString()}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="font-body">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
                            >
                              +
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-700 text-sm hover:text-red-900 font-body"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-body text-lg font-bold mb-4">
                      <span>Total:</span>
                      <span>${cartTotal.toLocaleString()}</span>
                    </div>
                    <button className="w-full bg-red-700 text-white py-3 rounded font-body font-semibold hover:bg-red-800 transition">
                      Finalizar Compra
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative h-screen overflow-hidden">
              {heroImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`hero-slide absolute inset-0 ${idx === heroIndex ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ))}
              
              <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
                <div className="max-w-3xl">
                  <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">
                    Cómoda, con onda y lista para salir
                  </h1>
                  <p className="font-body text-xl md:text-2xl mb-8 font-light">
                    Porque tu estilo merece sentirse tan bien como se ve
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <button 
                      onClick={() => navigateTo('shop')}
                      className="bg-red-700 px-8 py-3 rounded font-body font-semibold hover:bg-red-800 transition text-lg"
                    >
                      Ver Colección
                    </button>
                    <button 
                      onClick={() => {
                        navigateTo('shop');
                        setSelectedCategory('vestidos');
                      }}
                      className="bg-white text-black px-8 py-3 rounded font-body font-semibold hover:bg-gray-100 transition text-lg"
                    >
                      Novedades
                    </button>
                  </div>
                </div>
              </div>

              {/* Hero Navigation */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroIndex(idx)}
                    className={`w-3 h-3 rounded-full transition ${idx === heroIndex ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </section>

            {/* Featured Products Preview */}
            <section className="max-w-7xl mx-auto px-4 py-16">
              <h2 className="font-heading text-4xl font-bold text-center mb-12">Algunos de nuestros favoritos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.slice(0, 3).map(product => (
                  <div 
                    key={product.id} 
                    className="group cursor-pointer"
                    onClick={() => viewProduct(product)}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition"></div>
                    </div>
                    <h3 className="font-body font-semibold text-lg">{product.name}</h3>
                    <p className="font-body text-gray-600">${product.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button 
                  onClick={() => navigateTo('shop')}
                  className="bg-black text-white px-8 py-3 rounded font-body font-semibold hover:bg-gray-800 transition"
                >
                  Ver toda la colección
                </button>
              </div>
            </section>
          </>
        )}

        {currentPage === 'shop' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="font-heading text-4xl font-bold mb-8">Nuestra Colección</h1>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-body transition ${
                    selectedCategory === cat.id 
                      ? 'bg-red-700 text-white' 
                      : 'bg-white border border-gray-300 hover:border-black'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  <div 
                    className="relative aspect-square overflow-hidden"
                    onClick={() => viewProduct(product)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-body font-semibold mb-1">{product.name}</h3>
                    <p className="font-body text-gray-600 mb-3">${product.price.toLocaleString()}</p>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-black text-white py-2 rounded font-body hover:bg-gray-800 transition"
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {currentPage === 'product' && selectedProduct && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <button 
              onClick={() => navigateTo('shop')}
              className="flex items-center gap-2 font-body text-gray-600 hover:text-black mb-8 transition"
            >
              <ChevronLeft size={20} /> Volver a la colección
            </button>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h1 className="font-heading text-4xl font-bold mb-4">{selectedProduct.name}</h1>
                <p className="font-body text-3xl text-red-700 font-bold mb-6">
                  ${selectedProduct.price.toLocaleString()}
                </p>
                
                <p className="font-body text-gray-700 text-lg mb-8 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="mb-8">
                  <h3 className="font-body font-semibold mb-3">Detalles</h3>
                  <ul className="font-body text-gray-600 space-y-2">
                    <li>• Material: Algodón premium</li>
                    <li>• Talles disponibles: XS, S, M, L, XL</li>
                    <li>• Cuidados: Lavar a máquina en ciclo suave</li>
                    <li>• Diseño: Confección local</li>
                  </ul>
                </div>

                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full bg-red-700 text-white py-4 rounded-lg font-body font-semibold text-lg hover:bg-red-800 transition"
                >
                  Agregar al Carrito
                </button>

                <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                  <p className="font-body text-sm text-gray-700">
                    <strong>¿Dudas con el talle?</strong> Escribinos por WhatsApp y te asesoramos personalmente 💬
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'about' && (
          <section className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="font-heading text-5xl font-bold mb-8 text-center">Sobre Gaia Six</h1>
            
            <div className="prose prose-lg max-w-none font-body space-y-6 text-gray-700 leading-relaxed">
              <p className="text-xl">
                Gaia Six es esa amiga con estilo que te inspira a ser vos misma.
              </p>
              
              <p>
                Creemos que la ropa no es solo lo que te ponés, es cómo te sentís cuando lo hacés. Por eso cada prenda que elegimos está pensada para darte libertad, confianza y onda en cada look.
              </p>

              <p>
                No seguimos tendencias por seguirlas. Buscamos piezas atemporales que se adapten a tu vida real: ese brunch del domingo, esa salida improvisada, esa reunión importante donde querés sentirte increíble sin esfuerzo.
              </p>

              <p>
                Somos una marca hecha por mujeres, para mujeres que saben lo que quieren y no tienen miedo de mostrarlo. Creemos en la elegancia sin pretensiones, en la comodidad sin sacrificar el estilo, y en que cada día merece un outfit que te haga sentir poderosa.
              </p>

              <p className="text-xl font-semibold">
                Gaia Six: tu estilo, tu libertad, tu momento. 🖤
              </p>
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={() => navigateTo('shop')}
                className="bg-red-700 text-white px-8 py-3 rounded font-body font-semibold hover:bg-red-800 transition"
              >
                Descubrí la Colección
              </button>
            </div>
          </section>
        )}

        {currentPage === 'contact' && (
          <section className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="font-heading text-5xl font-bold mb-12 text-center">Hablemos</h1>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-heading text-2xl font-bold mb-6">Showroom</h2>
                <div className="space-y-4 font-body text-gray-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-red-700 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Dirección</p>
                      <p>Av. Libertador 1234, Palermo</p>
                      <p>Buenos Aires, Argentina</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold mb-2">Horarios</p>
                    <p>Lunes a Viernes: 10:00 - 19:00</p>
                    <p>Sábados: 11:00 - 17:00</p>
                    <p className="text-sm text-gray-500 mt-2">
                      *Te recomendamos coordinar tu visita por WhatsApp
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <a 
                    href="https://wa.me/5491112345678" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-body font-semibold"
                  >
                    <MessageCircle size={20} />
                    Escribinos por WhatsApp
                  </a>

                  <a 
                    href="https://instagram.com/gaiasix" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-body font-semibold"
                  >
                    <Instagram size={20} />
                    Seguinos en Instagram
                  </a>
                </div>
              </div>

              <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168878282043!2d-58.41878908477025!3d-34.60373496495334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca7c2e4e3e13%3A0x4e1697db6c8b0f1e!2sPalermo%2C%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Ubicación Gaia Six"
                ></iframe>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">GAIA SIX</h3>
              <p className="font-body text-gray-400 text-sm">
                Tu estilo, tu libertad, tu momento.
              </p>
            </div>

            <div>
              <h4 className="font-body font-semibold mb-4">Navegación</h4>
              <ul className="font-body text-gray-400 space-y-2 text-sm">
                <li><button onClick={() => navigateTo('home')} className="hover:text-white transition">Inicio</button></li>
                <li><button onClick={() => navigateTo('shop')} className="hover:text-white transition">Colección</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-white transition">Sobre Nosotras</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition">Contacto</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-body font-semibold mb-4">Información</h4>
              <ul className="font-body text-gray-400 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Guía de Talles</a></li>
                <li><a href="#" className="hover:text-white transition">Envíos y Devoluciones</a></li>
                <li><a href="#" className="hover:text-white transition">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-white transition">Política de Privacidad</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-body font-semibold mb-4">Seguinos</h4>
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com/gaiasix" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-700 transition"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://wa.me/5491112345678" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-700 transition"
                >
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center font-body text-gray-400 text-sm">
            <p>© 2025 Gaia Six. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}