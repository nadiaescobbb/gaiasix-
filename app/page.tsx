"use client";

import { useRouter } from 'next/navigation';
import { HeroProduct, Product, Look } from './types/home.types';
import { heroProduct, collectionProducts, shopTheLook } from './data/home-data';
import { formatPrice } from '../utils/formatters';

export default function GaiaSixHome() {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/shop');
  };

  const handleProductClick = (productId: number) => {
    // Redirigir a la tienda con scroll suave
    router.push('/shop');
    // Opcional: puedes usar query params para destacar un producto
    // router.push(`/shop?highlight=${productId}`);
  };

  const handleLookClick = (lookId: number) => {
    // Aquí podrías implementar lógica para agregar el look al carrito
    // Por ahora, redirigimos a la tienda
    console.log(`Agregar look ${lookId} al carrito`);
    // router.push('/cart');
  };

  // Función para navegar desde la sección de contacto
  const handleContactClick = () => {
    router.push('/contact');
  };

  // Función para ver más productos
  const handleViewMoreClick = () => {
    router.push('/shop');
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

        <div className="relative h-full flex flex-col justify-between pt-20">
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
                  <span className="relative z-10">Explorar colección</span>
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

          <div className="text-center mt-20">
            <button 
              onClick={handleViewMoreClick}
              className="group relative inline-flex items-center gap-2 text-black text-sm tracking-widest uppercase font-medium hover:text-red-500 transition-colors"
            >
              <span>Ver todas las prendas</span>
              <div className="h-px w-8 bg-black group-hover:bg-red-500 transition-colors"></div>
            </button>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
    </div>
  );
}