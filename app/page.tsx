"use client";

import { useState, useEffect } from 'react';

// Simulación de datos de productos
const featuredProducts = [
  {
    id: 1,
    name: "Vestido Stun",
    category: "vestidos",
    price: 21500,
    image: "/images/noche/vestido-stun.avif",
    new: true,
    featured: true
  },
  {
    id: 2,
    name: "Top Drape",
    category: "tops",
    price: 13550,
    image: "/images/products/top-drape.avif",
    new: true,
    featured: true
  }
];

const looks = [
  {
    id: 1,
    name: "vestido isla",
    price: 31500,
    image: "/images/boho/vestido-isla.avif"
  },
  {
    id: 2,
    name: "pollera nala",
    price: 33440,
    image: "/images/boho/pollera-nala-ang.avif"
  },
  {
    id: 3,
    name: "vestido esme",
    price: 29500,
    image: "/images/boho/vestido-esme.avif"
  }
];

const outfitCombinations = [
  {
    id: 1,
    name: "Drape Silhouette",
    items: [
      { name: "Top drape", price: 13550 },
      { name: "Mini trace", price: 11375 }
    ],
    image: "/images/products/top-drape.avif",
    total: 24925
  },
  {
    id: 2,
    name: "Night Lines",
    items: [
      { name: "Top floyd", price: 16720 },
      { name: "pollera nala", price: 33440 }
    ],
    image: "/images/noche/top-floyd.avif",
    total: 50160
  },
  {
    id: 3,
    name: "Black Icon",
    items: [
      { name: "Vestido issi", price: 26400 }
    ],
    image: "/images/boho/vestido-issi.avif", 
    total: 21500
  }
];

// Slides del carrusel hero 
const heroSlides = [
  {
    id: 1,
    tag: "noche",
    title: "prendas para",
    titleHighlight: "salir",
    subtitle: "nuevas piezas que no fallan",
    image: "/images/boho/vestido-rio.avif",
    cta: "ver prendas"
  },
  {
    id: 2,
    tag: "sixerclub",
    title: "beneficios",
    titleHighlight: "sixer",
    subtitle: "10% off + cuotas + envíos gratis",
    image: "/images/boho/pollera-nala.avif",
    cta: "activar"
  },
  {
    id: 3,
    tag: "tendencia 2025",
    title: "prendas",
    titleHighlight: "que acompañan",
    subtitle: "fáciles de combinar",
    image: "/images/boho/vestido-isla-fr.avif",
    cta: "ver prendas"
  }
];


// Definir tipos para TypeScript
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  new?: boolean;
  featured?: boolean;
}

interface Look {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
}

interface OutfitItem {
  name: string;
  price: number;
}

interface OutfitCombination {
  id: number;
  name: string;
  items: OutfitItem[];
  image: string;
  total: number;
}

interface HeroSlide {
  id: number;
  tag: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
  cta: string;
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => {
      setIsAnimating(false);
      setIsAutoPlaying(true);
    }, 1000);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ========================================
          🎠 HERO CON CARRUSEL PREMIUM
          ======================================== */}
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Slides del carrusel */}
        <div className="relative h-full">
          {heroSlides.map((slide: HeroSlide, index: number) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-105 z-0'
              }`}
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Contenido del slide */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                  <div className="max-w-3xl">
                    {/* Tag superior */}
                    <div 
                      className={`inline-block mb-6 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/20 text-white text-xs tracking-[0.2em] uppercase transition-all duration-700 ${
                        index === currentSlide ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8'
                      }`}
                    >
                      {slide.tag}
                    </div>
                    
                    {/* Título principal */}
                    <h1 
                      className={`text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-[1.1] text-white transition-all duration-700 ${
                        index === currentSlide ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-12'
                      }`}
                    >
                      {slide.title}{' '}
                      <span className="block md:inline font-normal italic text-[#AF161F]">
                        {slide.titleHighlight}
                      </span>
                    </h1>

                    {/* Subtítulo */}
                    <p 
                      className={`text-lg md:text-2xl text-white/90 mb-10 font-light max-w-xl leading-relaxed transition-all duration-700 ${
                        index === currentSlide ? 'opacity-100 translate-y-0 delay-600' : 'opacity-0 translate-y-12'
                      }`}
                    >
                      {slide.subtitle}
                    </p>

                    {/* CTA Button */}
                    <a 
                      href="#prendas"
                      className={`inline-block bg-white text-black px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-[#AF161F] hover:text-white transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 ${
                        index === currentSlide ? 'opacity-100 translate-y-0 delay-800' : 'opacity-0 translate-y-12'
                      }`}
                    >
                      {slide.cta}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores de slides */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`transition-all duration-500 rounded-full disabled:cursor-not-allowed ${
                index === currentSlide
                  ? 'w-12 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60 hover:w-8'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator animado */}
        <div className="absolute bottom-8 md:bottom-12 right-8 md:right-12 z-20 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs tracking-wider">scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ========================================
          ✨ FEATURED 
          ======================================== */}
      <section id="prendas" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <span className="text-xs text-[#AF161F] tracking-[0.2em] uppercase font-medium">DESTACADOS</span>
            <h2 className="text-4xl md:text-6xl font-light mt-3 text-balance">lo más elegido</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {featuredProducts.map((product: Product, idx: number) => (
              <div key={product.id} className={`group ${idx === 1 ? 'md:mt-24' : ''}`}>
                <div className="relative bg-gray-50 aspect-[3/4] mb-6 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.new && (
                      <span className="bg-[#AF161F] text-white px-3 py-1.5 text-xs tracking-wider uppercase">Reingreso</span>
                    )}
                  </div>

                  {/* Quick view overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a 
                      href={`#product-${product.id}`}
                      className="bg-white text-black px-6 py-3 text-sm tracking-wider uppercase hover:bg-black hover:text-white transition-colors duration-300 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform"
                    >
                      ver detalles
                    </a>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-light mb-1 capitalize">{product.name}</h3>
                    <p className="text-lg font-medium">{formatPrice(product.price)}</p>
                    <p className="text-sm text-black/50 capitalize">{product.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          💫 LOOKS - Shop the look
          ======================================== */}
      <section id="looks" className="py-20 md:py-32 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="text-xs text-[#AF161F] tracking-[0.2em] uppercase font-medium">SHOP THE LOOK</span>
            <h2 className="text-4xl md:text-6xl font-light mt-3 text-balance">looks para salir</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {looks.map((look: Look) => (
              <div key={look.id} className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="relative bg-gray-50 aspect-[3/4] overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-6">
                 <p className="text-xs text-black/40 mb-1 capitalize tracking-wider">
                  {look.description}
                </p>
                  <h3 className="text-lg font-light mb-3 capitalize">{look.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">{formatPrice(look.price)}</p>
                    <a 
                      href={`#product-${look.id}`}
                      className="text-xs underline hover:text-[#AF161F] transition-colors uppercase tracking-wider"
                    >
                      armar look
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          🎯 OUTFITS 
          ======================================== */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs text-[#AF161F] tracking-[0.2em] uppercase font-medium">COMPLETA TU ESTILO</span>
            <h2 className="text-4xl md:text-6xl font-light mt-3 text-balance">inspo para usar ya</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {outfitCombinations.map((outfit: OutfitCombination) => (
              <div key={outfit.id} className="group bg-white border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="relative bg-gray-50 aspect-square overflow-hidden">
                  <img
                    src={outfit.image}
                    alt={outfit.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-light mb-4">{outfit.name}</h3>

                  <div className="space-y-2 mb-6 text-sm">
                    {outfit.items.map((item: OutfitItem, index: number) => (
                      <div key={index} className="flex justify-between text-black/60">
                        <span className="capitalize">{item.name}</span>
                        <span>{formatPrice(item.price)}</span>
                      </div>
                    ))}
                  </div>

                  {outfit.items.length > 1 && (
                    <div className="flex justify-between border-t border-black/10 pt-4 mb-6">
                      <span className="text-sm">total</span>
                      <span className="font-medium">{formatPrice(outfit.total)}</span>
                    </div>
                  )}

                  <a 
                    href="#shop"
                    className="block w-full bg-black text-white py-3 text-sm text-center tracking-wider uppercase hover:bg-[#AF161F] transition-colors duration-300"
                  >
                    comprar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          🎁 FEATURES - Beneficios
          ======================================== */}
      <section className="py-16 border-y border-black/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-1 tracking-wider uppercase">envíos gratis</h3>
            <p className="text-xs text-black/50">en compras desde $150.000</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-1 tracking-wider uppercase">6 cuotas</h3>
            <p className="text-xs text-black/50">sin interés</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-1 tracking-wider uppercase">cambios</h3>
            <p className="text-xs text-black/50">dentro de los 7 días</p>
          </div>
        </div>
      </section>

      {/* ========================================
          📍 FOOTER
          ======================================== */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            <div>
              <h3 className="text-xl font-light tracking-wide mb-3">
                GAIA<span className="font-normal text-[#AF161F]">SIX</span>
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                ropa para salir, sin complicarte
              </p>
            </div>

            <div>
              <h4 className="text-xs text-white/40 mb-4 tracking-[0.2em] uppercase">CONTACTO</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>gaiashowroom@gmail.com</li>
                <li>+54 9 2964 479923</li>
                <li>@gaiasix</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs text-white/40 mb-4 tracking-[0.2em] uppercase">INFO</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>envíos 24-48hs</li>
                <li>6 cuotas sin interés</li>
                <li>cambios  dentro de los 7 días</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs text-white/40 mb-4 tracking-[0.2em] uppercase">LINKS</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#shop" className="hover:text-white transition-colors">tienda</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">nosotros</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© 2025 GAIA SIX</p>
            <div className="flex gap-6">
              <a href="#terms" className="hover:text-white/70 transition-colors">términos</a>
              <a href="#privacy" className="hover:text-white/70 transition-colors">privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}