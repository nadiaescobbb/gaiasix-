"use client";

import { useState } from 'react';

const featuredProducts = [
  {
    id: 1,
    name: "TOP FLOYD",
    price: 16720,
    image: "images/noche/top-floyd.avif",
    category: "tops",
  },
  {
    id: 2,
    name: "TOP MILI",
    price: 10680,
    image: "images/noche/top-mili.avif",
    category: "tops",
  }
];

const looks = [
  {
    id: 1,
    name: "Midnight Slip",
    description: "Vestido Platt",
    price: 23500,
    image: "images/products/vestido-platt.avif",
    outfit: true
  },
  {
    id: 2,
    name: "Afterglow Set",
    description: "Set Feral",
    price: 15670,
    image: "images/products/set-feral.avif",
    outfit: true
  },
  {
    id: 3,
    name: "Crystal Mesh",
    description: "Set Seline",
    price: 12250,
    image: "images/products/set-seline.avif",
    outfit: true
  }
];

const outfitCombinations = [
  {
    id: 1,
    name: "Drape Silhouette",
    items: [
      { name: "Top Drape", price: 1350 },
      { name: "Mini Trace", price: 1375 }
    ],
    image: "images/products/top-drape.avif",
    total: 2725
  },
  {
    id: 2,
    name: "Night Lines",
    items: [
      { name: "Top Fylo", price: 1350 },
      { name: "Mini Lark", price: 1105 }
    ],
    image: "images/products/top-fylo.avif",
    total: 2455
  },
  {
    id: 3,
    name: "Black Icon",
    items: [
      { name: "Vestido Stun", price: 21500 }
    ],
    image: "images/noche/vestido-stun.avif",
    total: 21500
  }
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const formatPrice = (price) => {
    return `${price.toLocaleString('es-AR')}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* HEADER MINIMAL */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo minimalista */}
            <div className="flex items-center">
              <h1 className="text-xl md:text-2xl font-light tracking-wide">
                GAIA<span className="font-bold text-[#AF161F]">SIX</span>
              </h1>
            </div>

            {/* Nav Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#prendas" className="text-sm text-black/70 hover:text-black transition-colors">
                prendas
              </a>
              <a href="#looks" className="text-sm text-black/70 hover:text-black transition-colors">
                looks
              </a>
              <a href="#marca" className="text-sm text-black/70 hover:text-black transition-colors">
                la marca
              </a>
            </nav>

            {/* Icons minimal */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-black/70 hover:text-black transition-colors hidden md:block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 text-black/70 hover:text-black transition-colors relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
              
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-black/5">
            <nav className="flex flex-col gap-1 p-4">
              <a href="#prendas" className="text-sm py-3 text-black/70 hover:text-black">prendas</a>
              <a href="#looks" className="text-sm py-3 text-black/70 hover:text-black">looks</a>
              <a href="#marca" className="text-sm py-3 text-black/70 hover:text-black">la marca</a>
            </nav>
          </div>
        )}
      </header>

      <div className="h-16"></div>

      {/* HERO MINIMAL */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#F0F3F4]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-black text-white text-xs tracking-widest">
            NUEVA COLECCIÓN
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight">
            vestí la <span className="font-bold italic text-[#AF161F]">noche</span>
          </h1>

          <p className="text-lg md:text-xl text-black/60 mb-12 font-light max-w-lg mx-auto">
            siluetas audaces. boho rocker glam.
          </p>

          <a 
            href="#prendas"
            className="inline-block bg-black text-white px-10 py-3.5 text-sm hover:bg-[#AF161F] transition-colors"
          >
            explorar
          </a>
        </div>
      </section>

      {/* FEATURED - Layout asimétrico */}
      <section id="prendas" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <span className="text-xs text-[#AF161F] tracking-widest">IMPRESCINDIBLES</span>
            <h2 className="text-3xl md:text-5xl font-light mt-2">destacados</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {featuredProducts.map((product, idx) => (
              <div 
                key={product.id} 
                className={`group ${idx === 1 ? 'md:mt-24' : ''}`}
              >
                <div className="relative bg-[#F0F3F4] aspect-[3/4] mb-6 overflow-hidden">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700"></div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-light mb-1">
                      {product.name}
                    </h3>
                    <p className="text-lg font-medium">{formatPrice(product.price)}</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-sm underline">
                    ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKS - Grid limpio */}
      <section id="looks" className="py-20 md:py-32 bg-[#F0F3F4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="text-xs text-[#AF161F] tracking-widest">INSPIRACIÓN</span>
            <h2 className="text-3xl md:text-5xl font-light mt-2 mb-3">shop the look</h2>
            <p className="text-sm text-black/50">armá tu outfit completo</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {looks.map((look) => (
              <div key={look.id} className="group bg-white">
                <div className="relative bg-[#F0F3F4] aspect-[3/4] overflow-hidden">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700"></div>
                </div>

                <div className="p-6">
                  <p className="text-xs text-black/40 mb-1">{look.description}</p>
                  <h3 className="text-lg font-light mb-3">
                    {look.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">{formatPrice(look.price)}</p>
                    <button className="text-xs underline hover:text-[#AF161F] transition-colors">
                      combinar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTFITS - Cards minimalistas */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs text-[#AF161F] tracking-widest">COMPLETA TU ESTILO</span>
            <h2 className="text-3xl md:text-5xl font-light mt-2">outfits</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {outfitCombinations.map((outfit) => (
              <div key={outfit.id} className="group">
                <div className="relative bg-[#F0F3F4] aspect-square mb-6 overflow-hidden">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700"></div>
                </div>

                <h3 className="text-xl font-light mb-4">{outfit.name}</h3>

                <div className="space-y-2 mb-6 text-sm">
                  {outfit.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-black/60">
                      <span>{item.name}</span>
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

                <button className="w-full bg-black text-white py-3 text-sm hover:bg-[#AF161F] transition-colors">
                  comprar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES minimalistas */}
      <section className="py-16 border-y border-black/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-1">envíos gratis</h3>
            <p className="text-xs text-black/50">compras +$150.000</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-1">3 cuotas</h3>
            <p className="text-xs text-black/50">sin interés</p>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-1">cambios</h3>
            <p className="text-xs text-black/50">7 días</p>
          </div>
        </div>
      </section>

      {/* FOOTER MINIMAL */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            <div>
              <h3 className="text-xl font-light tracking-wide mb-3">
                GAIA<span className="font-bold text-[#AF161F]">SIX</span>
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                moda nocturna con carácter
              </p>
            </div>

            <div>
              <h4 className="text-xs text-white/40 mb-4 tracking-widest">CONTACTO</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>gaiashowroom@gmail.com</li>
                <li>+54 9 2964 479923</li>
                <li>@gaiasix</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs text-white/40 mb-4 tracking-widest">INFO</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>envíos 24-72hs</li>
                <li>3 cuotas sin interés</li>
                <li>cambios 7 días</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs text-white/40 mb-4 tracking-widest">LINKS</h4>
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