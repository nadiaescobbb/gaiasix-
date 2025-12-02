"use client";

import { useRouter } from 'next/navigation';
import { HeroProduct, Product, Look } from './types/home.types';
import { heroProduct, collectionProducts, shopTheLook } from './data/home-data';
import { formatPrice } from '../utils/formatters';

export default function GaiaSixHome() {
  const router = useRouter();

  const handleExploreClick = () => router.push('/shop');
  const handleProductClick = (id: number) => router.push('/shop');
  const handleLookClick = (id: number) => console.log(`Agregar look ${id}`);
  const handleViewMoreClick = () => router.push('/shop');

  return (
    <div className="min-h-screen bg-gaia-white">

      {/* HERO */}
      <section className="relative h-screen bg-gaia-black overflow-hidden font-display">
        <div className="absolute inset-0">
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-between pt-20">
          <div className="px-8 md:px-16 pb-20 md:pb-32">
            <div className="max-w-3xl">

              {/* Tag */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-12 bg-gaia-crimson/40"></div>
                <span className="text-gaia-crimson text-xs tracking-[0.3em] uppercase font-body">
                  {heroProduct.tag}
                </span>
              </div>

              {/* TITLE */}
              <h1 className="mb-8 leading-none font-display">
                <span className="block text-white text-6xl md:text-8xl tracking-tight mb-1">
                  {heroProduct.name.split(' ')[0]}
                </span>

                <span className="block text-gaia-crimson text-6xl md:text-8xl tracking-tight">
                  {heroProduct.name.split(' ')[1]}
                </span>
              </h1>

              <p className="text-gaia-silver text-lg md:text-xl font-body mb-10 max-w-xl leading-relaxed">
                Una pieza atemporal que combina elegancia minimalista con diseño contemporáneo.
              </p>

              <button 
                onClick={handleExploreClick}
                className="group relative px-8 py-4 bg-gaia-white text-gaia-black 
                  text-sm tracking-widest uppercase font-medium overflow-hidden
                  hover:text-white transition-colors duration-300"
              >
                <span className="relative z-10">Explorar colección</span>
                <div className="absolute inset-0 bg-gaia-crimson transform -translate-x-full 
                    group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2">
            <span className="text-white text-xs tracking-widest uppercase rotate-90 mb-8">
              Scroll
            </span>
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* COLECCIÓN */}
      <section className="py-24 md:py-32 bg-gaia-white font-body">
        <div className="max-w-7xl mx-auto px-8 md:px-16">

          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gaia-crimson/40"></div>
              <span className="text-gaia-crimson text-xs tracking-[0.3em] uppercase">
                nuevos ingresos
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display tracking-tight">
              prendas que vas a amar
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
            {collectionProducts.map((product, idx) => (
              <div key={product.id} className={`group ${idx % 2 === 1 ? 'md:mt-20' : ''}`}>
                
                <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-gaia-crimson text-white 
                        text-xs tracking-wider uppercase px-3 py-1.5">
                      nuevo
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => handleProductClick(product.id)}
                      className="bg-gaia-white text-gaia-black px-8 py-3 text-sm tracking-widest 
                        uppercase font-medium transform translate-y-4 
                        group-hover:translate-y-0 transition-transform duration-300
                        hover:bg-gaia-crimson hover:text-white"
                    >
                      ver prenda
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-display capitalize">{product.name}</h3>
                    <p className="text-lg font-display">{formatPrice(product.price)}</p>
                  </div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">{product.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <button 
              onClick={handleViewMoreClick}
              className="group relative inline-flex items-center gap-2 text-gaia-black 
                text-sm tracking-widest uppercase font-medium hover:text-gaia-crimson transition-colors"
            >
              <span>Ver todas las prendas</span>
              <div className="h-px w-8 bg-gaia-black group-hover:bg-gaia-crimson transition-colors"></div>
            </button>
          </div>
        </div>
      </section>

      {/* SHOP THE LOOK */}
      <section className="py-24 md:py-32 bg-gaia-black text-white font-body">
        <div className="max-w-7xl mx-auto px-8 md:px-16">

          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gaia-crimson/30"></div>
              <span className="text-neutral-400 text-xs tracking-[0.3em] uppercase">
                combinaciones
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display tracking-tight">
              shop the look
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {shopTheLook.map((look) => (
              <div key={look.id} className="group">
                <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden mb-6">
                  <img
                    src={look.image}
                    alt={look.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-2xl font-display capitalize mb-4 tracking-tight">
                  {look.name}
                </h3>

                <div className="mb-6 text-sm text-neutral-400 space-y-1">
                  {look.items.map((item, idx) => (
                    <p key={idx} className="capitalize">— {item}</p>
                  ))}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-neutral-500 line-through text-lg">
                    {formatPrice(look.price)}
                  </span>
                  <span className="text-2xl font-display">
                    {formatPrice(look.discount)}
                  </span>
                </div>

                <button 
                  onClick={() => handleLookClick(look.id)}
                  className="w-full bg-gaia-white text-gaia-black py-4 text-sm tracking-widest 
                    uppercase font-medium hover:bg-gaia-crimson hover:text-white transition-colors"
                >
                  adquirir look
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
