"use client";

import { useState } from 'react';
import Image from 'next/image';
import { formatPrice } from '../../utils/formatters';
import { products } from '../../data/products';

export default function HomePage({ onNavigate }) {
  const featuredProducts = products.filter(p => p.featured && p.active).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero minimalista nocturno */}
      <div className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        {/* Gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-80"></div>
        
        <div className="relative z-10 text-center px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Mensaje simple y potente */}
            <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-tight">
              Lista para salir.
            </h1>
            
            <p className="text-gray-400 text-sm md:text-base tracking-wide">
              Simple. Elegante. Sin vueltas.
            </p>
            
            {/* CTA minimalista */}
            <button 
              onClick={() => onNavigate('shop')}
              className="border border-white text-white px-12 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 mt-12"
            >
              Ver prendas
            </button>
          </div>
        </div>

        {/* Scroll indicator sutil */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
        </div>
      </div>
      
      {/* Featured minimalista */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header sutil */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Nuevas
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              Recién llegaron
            </h2>
          </div>
          
          {/* Grid limpio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.map((product, index) => (
              <FeaturedProduct 
                key={product.id} 
                product={product}
                priority={index === 0}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          {/* CTA sutil */}
          <div className="text-center mt-16">
            <button
              onClick={() => onNavigate('shop')}
              className="border border-gray-300 text-gray-600 px-8 py-3 text-xs uppercase tracking-widest hover:border-black hover:text-black transition-all duration-300"
            >
              Explorar todo
            </button>
          </div>
        </div>
      </section>

      {/* Valores minimalistas */}
      <section className="py-20 px-6 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
              <p className="text-2xl font-light text-gray-900 mb-3">24hs</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Envío incluido
              </p>
            </div>

            <div>
              <p className="text-2xl font-light text-gray-900 mb-3">6 cuotas</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Sin interés
              </p>
            </div>

            <div>
              <p className="text-2xl font-light text-gray-900 mb-3">15 días</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Para cambios
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// FEATURED PRODUCT - OPTIMIZADO
// ==========================================

function FeaturedProduct({ product, priority, onNavigate }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group cursor-pointer" 
      onClick={() => onNavigate('shop')}
    >
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-4">
        {/* Next.js Image optimizada */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover group-hover:scale-102 transition-transform duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          quality={85}
          priority={priority}
        />
        
        {/* Skeleton mientras carga */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        
        {/* Overlay minimalista */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
      </div>
      
      {/* Info limpia */}
      <div className="text-center space-y-1">
        <h3 className="text-xs uppercase tracking-widest text-gray-600">
          {product.name}
        </h3>
        <p className="text-sm font-light text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}