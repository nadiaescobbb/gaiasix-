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
    <div className="min-h-screen bg-gaia-bone">

      {/* HERO — Overlay suave que respeta la foto */}
      <section className="relative h-screen overflow-hidden">
        {/* Imagen sin opacity reducido */}
        <div className="absolute inset-0">
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="w-full h-full object-cover"
          />
          {/* Gradient suave solo en bottom 40% */}
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        <div className="relative h-full flex flex-col justify-between pt-20">
          <div className="px-8 md:px-16 pb-20 md:pb-32">
            <div className="max-w-3xl">

              {/* Tag */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-12 bg-gaia-crimson/50"></div>
                <span className="text-gaia-crimson text-[10px] tracking-ultra uppercase font-body font-medium">
                  {heroProduct.tag}
                </span>
              </div>

              {/* TITLE — Galiska con tracking negativo */}
              <h1 className="mb-8 leading-none font-display">
                <span className="block text-gaia-bone text-6xl md:text-8xl tracking-tighter font-light mb-2">
                  {heroProduct.name.split(' ')[0]}
                </span>
                <span className="block text-gaia-crimson text-6xl md:text-8xl tracking-tighter font-light">
                  {heroProduct.name.split(' ')[1]}
                </span>
              </h1>

              {/* Copy más emocional */}
              <p className="text-gaia-cream text-lg md:text-xl font-body font-light mb-10 max-w-xl leading-relaxed">
                Elegancia sin esfuerzo. Diseño que despierta deseo.
              </p>

              {/* CTA mejorado */}
              <button 
                onClick={handleExploreClick}
                className="group relative px-8 py-4 bg-gaia-bone text-gaia-black-soft 
                  text-xs tracking-wider uppercase font-body font-medium overflow-hidden
                  hover:text-gaia-bone transition-all duration-300"
              >
                <span className="relative z-10">Explorar colección</span>
                <div className="absolute inset-0 bg-gaia-crimson transform -translate-x-full 
                    group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2">
            <span className="text-gaia-bone text-[9px] tracking-ultra uppercase rotate-90 mb-8 font-body">
              Scroll
            </span>
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-gaia-bone/60 to-transparent animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* COLECCIÓN — Fondo cálido coherente */}
      <section className="section-gaia bg-gaia-bone">
        <div className="container-gaia">

          {/* Header de sección */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gaia-crimson/40"></div>
              <span className="text-gaia-crimson text-[10px] tracking-ultra uppercase font-body font-medium">
                nuevos ingresos
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display tracking-tight font-light text-gaia-black-soft">
              prendas que vas a amar
            </h2>
          </div>

          {/* Grid de productos */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
            {collectionProducts.map((product, idx) => (
              <div key={product.id} className={`group ${idx % 2 === 1 ? 'md:mt-20' : ''}`}>
                
                {/* Imagen del producto */}
                <div className="relative aspect-product bg-gaia-cream overflow-hidden mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge NEW mejorado */}
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-gaia-crimson text-gaia-bone 
                        text-[9px] tracking-ultra uppercase px-3 py-1.5 font-body font-medium
                        shadow-[0_2px_8px_rgba(175,22,31,0.3)]">
                      nuevo
                    </div>
                  )}

                  {/* Overlay hover suave */}
                  <div className="absolute inset-0 bg-gaia-overlay-hover opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => handleProductClick(product.id)}
                      className="bg-gaia-bone text-gaia-black-soft px-8 py-3 text-xs tracking-wider 
                        uppercase font-body font-medium transform translate-y-4 
                        group-hover:translate-y-0 transition-all duration-300
                        hover:bg-gaia-crimson hover:text-gaia-bone"
                    >
                      ver prenda
                    </button>
                  </div>
                </div>

                {/* Info del producto */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-display capitalize text-gaia-black-soft font-light">
                      {product.name}
                    </h3>
                    <p className="text-lg font-display text-gaia-black-soft font-light">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <p className="text-[10px] text-gaia-ash uppercase tracking-wider font-body">
                    {product.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Ver más */}
          <div className="text-center mt-20">
            <button 
              onClick={handleViewMoreClick}
              className="group inline-flex items-center gap-2 text-gaia-black-soft 
                text-xs tracking-wider uppercase font-body font-medium hover:text-gaia-crimson 
                transition-colors duration-300"
            >
              <span>Ver todas las prendas</span>
              <div className="h-px w-8 bg-gaia-black-soft group-hover:bg-gaia-crimson 
                  transition-colors duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* SHOP THE LOOK — Fondo suave en vez de negro puro */}
      <section className="section-gaia bg-gaia-charcoal text-gaia-bone">
        <div className="container-gaia">

          {/* Header de sección */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gaia-crimson/40"></div>
              <span className="text-gaia-concrete text-[10px] tracking-ultra uppercase font-body font-medium">
                combinaciones
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display tracking-tight font-light">
              shop the look
            </h2>
          </div>

          {/* Grid de looks */}
          <div className="grid md:grid-cols-2 gap-12">
            {shopTheLook.map((look) => (
              <div key={look.id} className="group">
                
                {/* Imagen del look */}
                <div className="relative aspect-product bg-gaia-black-soft overflow-hidden mb-6">
                  <img
                    src={look.image}
                    alt={look.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient suave en hover */}
                  <div className="absolute inset-0 bg-gradient-overlay opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Info del look */}
                <h3 className="text-2xl font-display capitalize mb-4 tracking-tight font-light">
                  {look.name}
                </h3>

                <div className="mb-6 text-sm text-gaia-concrete font-body font-light space-y-1">
                  {look.items.map((item, idx) => (
                    <p key={idx} className="capitalize">— {item}</p>
                  ))}
                </div>

                {/* Precios */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gaia-ash line-through text-lg font-display font-light">
                    {formatPrice(look.price)}
                  </span>
                  <span className="text-2xl font-display font-light">
                    {formatPrice(look.discount)}
                  </span>
                </div>

                {/* CTA */}
                <button 
                  onClick={() => handleLookClick(look.id)}
                  className="w-full bg-gaia-bone text-gaia-black-soft py-4 text-xs tracking-wider 
                    uppercase font-body font-medium hover:bg-gaia-crimson hover:text-gaia-bone 
                    transition-all duration-300"
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