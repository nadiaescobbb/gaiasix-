"use client";

import { useState } from 'react';
import { HeroProduct, Product, Look, FilterType } from './types/home.types';
import { heroProduct, collectionProducts, shopTheLook } from './data/home-data';
import { formatPrice } from '../utils/formatters';

export default function GaiaSixHome() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');

  const filteredProducts = activeFilter === 'todos' 
    ? collectionProducts 
    : collectionProducts.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-white text-black">
      
      {/* STATEMENT BAR - Sistema Gaia */}
      <div className="bg-gaia-black text-gaia-white py-3 text-center">
        <p className="label-gaia text-gaia-white opacity-90">
          envíos gratis en compras mayores a $150.000 — 6 cuotas sin interés — 15% off en transferencia
        </p>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen bg-gaia-black">
        {/* Imagen Hero */}
        <div className="absolute inset-0">
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 gradient-overlay-gaia"></div>
        </div>

        {/* Contenido Hero */}
        <div className="relative h-full flex items-end">
          <div className="container-gaia pb-20">
            <div className="max-w-2xl">
              <span className="label-gaia text-gaia-white/60 mb-4">
                {heroProduct.tag}
              </span>
              
              <h1 className="title-hero text-gaia-white mb-6 font-display">
                {heroProduct.name.split(' ')[0]}
                <span className="block italic font-normal text-gaia-crimson">
                  {heroProduct.name.split(' ')[1]}
                </span>
              </h1>

              <div className="flex items-center gap-8">
                <span className="text-2xl text-gaia-white font-light font-body">
                  {formatPrice(heroProduct.price)}
                </span>
                <button className="btn-primary">
                  ver prenda
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLECCIÓN SECTION */}
      <section className="section-gaia">
        <div className="container-gaia">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="label-gaia text-gaia-crimson mb-3">
                nuevos ingresos
              </span>
              <h2 className="title-section font-display">
                prendas que vas a amar
              </h2>
            </div>

            <div className="flex gap-6 text-sm font-body">
              {(['todos', 'vestidos', 'separates'] as FilterType[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`pb-1 tracking-wider uppercase transition-colors duration-300 ${
                    activeFilter === filter
                      ? 'text-gaia-black border-b-2 border-gaia-black'
                      : 'text-gaia-ash hover:text-gaia-black'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {filteredProducts.map((product: Product, idx: number) => (
              <div 
                key={product.id} 
                className={`product-card ${idx % 2 === 1 ? 'md:mt-20' : ''}`}
              >
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                  
                  {product.isNew && (
                    <div className="badge-new">
                      nuevo
                    </div>
                  )}

                  <div className="product-overlay">
                    <button className="product-overlay-btn">
                      ver prenda
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-start pt-6">
                  <div>
                    <h3 className="text-lg font-light capitalize mb-1 font-body">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gaia-silver uppercase tracking-wider font-body">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-lg font-light font-body">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP THE LOOK SECTION */}
      <section className="section-gaia bg-gaia-black text-gaia-white">
        <div className="container-gaia">
          <div className="mb-16">
            <span className="label-gaia text-gaia-silver mb-3">
              combinaciones
            </span>
            <h2 className="title-section font-display">
              shop the look
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {shopTheLook.map((look: Look) => (
              <div key={look.id} className="group">
                <div className="product-image bg-gaia-charcoal">
                  <img
                    src={look.image}
                    alt={look.name}
                  />
                </div>

                <div className="pt-6">
                  <h3 className="text-2xl font-light capitalize mb-4 tracking-tight font-display">
                    {look.name}
                  </h3>

                  <div className="mb-6 text-sm text-gaia-silver space-y-1 font-body">
                    {look.items.map((item: string, idx: number) => (
                      <p key={idx} className="capitalize">— {item}</p>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-gaia-ash line-through text-lg font-body">
                      {formatPrice(look.price)}
                    </span>
                    <span className="text-2xl font-light font-body">
                      {formatPrice(look.discount)}
                    </span>
                  </div>

                  <button className="btn-primary w-full">
                    adquirir look
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-gaia-black text-gaia-white py-16">
        <div className="container-gaia">
          <div className="grid md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-white/10">
            <div>
              <h3 className="logo-gaia text-2xl mb-3">
                GAIA<span className="font-normal text-gaia-crimson">SIX</span>
              </h3>
              <p className="text-xs text-gaia-ash leading-relaxed font-body">
                ropa para salir
              </p>
            </div>

            <div>
              <h4 className="label-gaia text-gaia-silver mb-4">
                contacto
              </h4>
              <div className="space-y-2 text-sm text-gaia-silver font-body">
                <p className="link-gaia">gaiashowrrom@gmail.com</p>
                <p>+54 9 2964 479923</p>
                <p>@gaiasix</p>
              </div>
            </div>

            <div>
              <h4 className="label-gaia text-gaia-silver mb-4">
                compras
              </h4>
              <div className="space-y-2 text-sm text-gaia-silver font-body">
                <p>envíos gratis en compras superiores a $150.000</p>
                <p>6 cuotas sin interés</p>
                <p>cambios dentro de los 7 días</p>
              </div>
            </div>

            <div>
              <h4 className="label-gaia text-gaia-silver mb-4">
                navegación
              </h4>
              <div className="space-y-2 text-sm text-gaia-silver font-body">
                <p className="link-gaia cursor-pointer">prendas</p>
                <p className="link-gaia cursor-pointer">nosotras</p>
                <p className="link-gaia cursor-pointer">contacto</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gaia-ash font-body">
            <p>© 2025 GAIA SIX</p>
            <div className="flex gap-6">
              <span className="link-gaia cursor-pointer">términos</span>
              <span className="link-gaia cursor-pointer">privacidad</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}