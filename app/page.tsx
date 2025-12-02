"use client";

import { HeroProduct, Product, Look } from './types/home.types';
import { heroProduct, collectionProducts, shopTheLook } from './data/home-data';
import { formatPrice } from './../utils/formatters';

export default function GaiaSixHome() {
  const handleExploreClick = () => {
    // Este evento será capturado por el ClientLayout para navegar
    const event = new CustomEvent('navigateToShop');
    window.dispatchEvent(event);
  };

  const handleProductClick = (productId: number) => {
    // Para navegar a detalles del producto
    console.log('Ver producto:', productId);
    // Aquí podrías navegar a /shop/product/[id]
  };

  const handleLookClick = (lookId: number) => {
    console.log('Adquirir look:', lookId);
    // Lógica para agregar look al carrito
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* HERO SECTION */}
      <section className="relative h-screen bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="relative h-full flex flex-col justify-between pt-20"> {/* pt-20 para compensar el Header */}
          <div className="px-8 md:px-16 pb-20 md:pb-32">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-12 bg-red-500"></div>
                <span className="text-red-400 text-xs tracking-[0.3em] uppercase font-light">
                  {heroProduct.tag}
                </span>
              </div>
              
              <h1 className="mb-8">
                <span className="block text-white text-6xl md:text-8xl font-light tracking-tight leading-none mb-2">
                  {heroProduct.name.split(' ')[0]}
                </span>
                <span className="block text-red-500 text-6xl md:text-8xl italic font-serif font-light tracking-tight leading-none">
                  {heroProduct.name.split(' ')[1]}
                </span>
              </h1>

              <p className="text-neutral-300 text-lg md:text-xl font-light mb-10 max-w-xl leading-relaxed">
                Una pieza atemporal que combina elegancia minimalista con diseño contemporáneo.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button 
                  onClick={handleExploreClick}
                  className="group relative px-8 py-4 bg-white text-black text-sm tracking-widest uppercase font-medium overflow-hidden hover:text-white transition-colors duration-300"
                >
                  <span className="relative z-10">Explorar</span>
                  <div className="absolute inset-0 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-neutral-600"></div>
                  <span className="text-white text-2xl font-light">
                    {formatPrice(heroProduct.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2">
            <span className="text-white text-xs tracking-widest uppercase rotate-90 origin-center mb-8">
              Scroll
            </span>
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* COLECCIÓN SECTION */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-red-500"></div>
              <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-light">
                nuevos ingresos
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              prendas que vas a amar
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
            {collectionProducts.map((product: Product, idx: number) => (
              <div 
                key={product.id} 
                className={`group ${idx % 2 === 1 ? 'md:mt-20' : ''}`}
              >
                <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs tracking-wider uppercase px-3 py-1.5">
                      nuevo
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => handleProductClick(product.id)}
                      className="bg-white text-black px-8 py-3 text-sm tracking-widest uppercase font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-red-500 hover:text-white"
                    >
                      ver prenda
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-light capitalize">
                      {product.name}
                    </h3>
                    <p className="text-lg font-light">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">
                    {product.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP THE LOOK SECTION */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-neutral-600"></div>
              <span className="text-neutral-400 text-xs tracking-[0.3em] uppercase font-light">
                combinaciones
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              shop the look
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {shopTheLook.map((look: Look) => (
              <div key={look.id} className="group">
                <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden mb-6">
                  <img
                    src={look.image}
                    alt={look.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-light capitalize mb-4 tracking-tight">
                    {look.name}
                  </h3>

                  <div className="mb-6 text-sm text-neutral-400 space-y-1">
                    {look.items.map((item: string, idx: number) => (
                      <p key={idx} className="capitalize">— {item}</p>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-neutral-500 line-through text-lg">
                      {formatPrice(look.price)}
                    </span>
                    <span className="text-2xl font-light">
                      {formatPrice(look.discount)}
                    </span>
                  </div>

                  <button 
                    onClick={() => handleLookClick(look.id)}
                    className="w-full bg-white text-black py-4 text-sm tracking-widest uppercase font-medium hover:bg-red-500 hover:text-white transition-colors duration-300"
                  >
                    adquirir look
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-black text-white py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-white/10">
            <div>
              <h3 className="text-2xl font-light tracking-wider mb-3">
                GAIA<span className="italic font-serif text-red-500">SIX</span>
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                ropa para salir
              </p>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase font-light text-neutral-400 mb-4">
                contacto
              </h4>
              <div className="space-y-2 text-sm text-neutral-400">
                <p className="hover:text-white transition-colors cursor-pointer">gaiashowrrom@gmail.com</p>
                <p>+54 9 2964 479923</p>
                <p>@gaiasix</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase font-light text-neutral-400 mb-4">
                compras
              </h4>
              <div className="space-y-2 text-sm text-neutral-400">
                <p>envíos gratis en compras superiores a $150.000</p>
                <p>6 cuotas sin interés</p>
                <p>cambios dentro de los 7 días</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase font-light text-neutral-400 mb-4">
                navegación
              </h4>
              <div className="space-y-2 text-sm text-neutral-400">
                <p className="hover:text-white transition-colors cursor-pointer">prendas</p>
                <p className="hover:text-white transition-colors cursor-pointer">nosotras</p>
                <p className="hover:text-white transition-colors cursor-pointer">contacto</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
            <p>© 2025 GAIA SIX</p>
            <div className="flex gap-6">
              <span className="hover:text-white transition-colors cursor-pointer">términos</span>
              <span className="hover:text-white transition-colors cursor-pointer">privacidad</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}