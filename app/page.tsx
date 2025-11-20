"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts, products } from '../data/products';

// Obtener productos destacados reales
const featuredProducts = getFeaturedProducts(2);

const looks = getFeaturedProducts(3).map(product => ({
  id: product.id,
  name: product.name,
  description: product.category,
  price: product.price,
  image: product.image,
  outfit: true
}));

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
      { name: "Top fylo", price: 13550 },
      { name: "Mini lark", price: 11125 }
    ],
    image: "/images/products/top-fylo.avif",
    total: 24675
  },
  {
    id: 3,
    name: "Black Icon",
    items: [
      { name: "Vestido stun", price: 21500 }
    ],
    image: "/images/noche/vestido-stun.avif", 
    total: 21500
  }
];

export default function HomePage() {
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* ❌ NO HEADER AQUÍ - Se usa el de components/layout/Header.tsx */}

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

          <Link 
            href="/shop"
            className="inline-block bg-black text-white px-10 py-3.5 text-sm hover:bg-[#AF161F] transition-colors"
          >
            explorar
          </Link>
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
              <div key={product.id} className={`group ${idx === 1 ? 'md:mt-24' : ''}`}>
                <div className="relative bg-gray-100 aspect-[3/4] mb-6 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.new && (
                      <span className="bg-[#AF161F] text-white px-2 py-1 text-xs">Nuevo</span>
                    )}
                    {product.featured && (
                      <span className="bg-black text-white px-2 py-1 text-xs">Destacado</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-light mb-1 capitalize">{product.name}</h3>
                    <p className="text-lg font-medium">{formatPrice(product.price)}</p>
                    <p className="text-sm text-black/50 capitalize">{product.category}</p>
                  </div>
                  <Link 
                    href={`/shop/product/${product.id}`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-sm underline"
                  >
                    ver
                  </Link>
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
            <span className="text-xs text-[#AF161F] tracking-widest">shop the look</span>
            <h2 className="text-3xl md:text-5xl font-light mt-2 mb-3">outfit u love</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {looks.map((look) => (
              <div key={look.id} className="group bg-white">
                <div className="relative bg-gray-100 aspect-[3/4] overflow-hidden">
                  <Image
                    src={look.image}
                    alt={look.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700"></div>
                </div>

                <div className="p-6">
                  <p className="text-xs text-black/40 mb-1 capitalize">{look.description}</p>
                  <h3 className="text-lg font-light mb-3 capitalize">{look.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium">{formatPrice(look.price)}</p>
                    <Link 
                      href={`/shop/product/${look.id}`}
                      className="text-xs underline hover:text-[#AF161F] transition-colors"
                    >
                      combinar
                    </Link>
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
                <div className="relative bg-gray-100 aspect-square mb-6 overflow-hidden">
                  <Image
                    src={outfit.image}
                    alt={outfit.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700"></div>
                </div>

                <h3 className="text-xl font-light mb-4">{outfit.name}</h3>

                <div className="space-y-2 mb-6 text-sm">
                  {outfit.items.map((item, index) => (
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

                <Link 
                  href="/shop"
                  className="block w-full bg-black text-white py-3 text-sm text-center hover:bg-[#AF161F] transition-colors"
                >
                  comprar
                </Link>
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
                <li><Link href="/shop" className="hover:text-white transition-colors">tienda</Link></li>
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