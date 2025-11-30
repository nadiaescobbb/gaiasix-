"use client";

import { useState } from 'react';

// ═══════════════════════════════════════════════
// TIPOS TYPESCRIPT
// ═══════════════════════════════════════════════
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew: boolean;
}

interface Look {
  id: number;
  name: string;
  items: string[];
  price: number;
  discount: number;
  image: string;
}

interface HeroProduct {
  name: string;
  price: number;
  image: string;
  tag: string;
}

type FilterType = 'todos' | 'vestidos' | 'faldas' | 'tops';

// ═══════════════════════════════════════════════
// DATOS
// ═══════════════════════════════════════════════
const heroProduct: HeroProduct = {
  name: "vestido isla",
  price: 31500,
  image: "/images/boho/vestido-isla.avif",
  tag: "nocturno"
};

const collectionProducts: Product[] = [
  {
    id: 1,
    name: "vestido isla",
    category: "vestidos",
    price: 31500,
    image: "/images/boho/vestido-isla.avif",
    isNew: true
  },
  {
    id: 2,
    name: "pollera nala",
    category: "faldas",
    price: 33440,
    image: "/images/boho/pollera-nala.avif",
    isNew: true
  },
  {
    id: 3,
    name: "vestido esme",
    category: "vestidos",
    price: 29500,
    image: "/images/boho/vestido-esme-fr.avif",
    isNew: true
  },
  {
    id: 4,
    name: "top mallorca",
    category: "tops",
    price: 13550,
    image: "/images/fotoproducto/top-mallorca.avif",
    isNew: true
  }
];

const shopTheLook: Look[] = [
  {
    id: 1,
    name: "rock dress",
    items: ["top floyd", "pollera nala"],
    price: 50160,
    discount: 47650,
    image: "/images/boho/pollera-nala-ang.avif"
  },
  {
    id: 2,
    name: "noche dress",
    items: ["top drape", "mini trace"],
    price: 24925,
    discount: 23680,
    image: "/images/products/top-drape.avif"
  }
];

// ═══════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════
export default function GaiaSixHome() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');

  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('es-AR')}`;
  };

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

      {/* HERO - Estático, Editorial, Minimalista */}
      <section className="relative h-screen bg-gaia-black">
        {/* Imagen Hero */}
        <div className="absolute inset-0">
          <img
            src={heroProduct.image}
            alt={heroProduct.name}
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay con clase del sistema */}
          <div className="absolute inset-0 gradient-overlay-gaia"></div>
        </div>

        {/* Contenido Hero - Ultra minimalista */}
        <div className="relative h-full flex items-end">
          <div className="container-gaia pb-20">
            <div className="max-w-2xl">
              {/* Tag superior */}
              <span className="label-gaia text-gaia-white/60 mb-4">
                {heroProduct.tag}
              </span>
              
              {/* Nombre de la prenda - Sistema tipográfico */}
              <h1 className="title-hero text-gaia-white mb-6 font-display">
                {heroProduct.name.split(' ')[0]}
                <span className="block italic font-normal text-gaia-crimson">
                  {heroProduct.name.split(' ')[1]}
                </span>
              </h1>

              {/* Precio y CTA */}
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

      {/* COLECCIÓN - Con filtros sutiles */}
      <section className="section-gaia">
        <div className="container-gaia">
          
          {/* Header con filtros */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="label-gaia text-gaia-crimson mb-3">
                colección
              </span>
              <h2 className="title-section font-display">
                todas las prendas
              </h2>
            </div>

            {/* Filtros minimalistas */}
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

          {/* Grid de productos - Asimétrico */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {filteredProducts.map((product: Product, idx: number) => (
              <div 
                key={product.id} 
                className={`product-card ${idx % 2 === 1 ? 'md:mt-20' : ''}`}
              >
                {/* Imagen */}
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                  
                  {/* Badge Nuevo */}
                  {product.isNew && (
                    <div className="badge-new">
                      nuevo
                    </div>
                  )}

                  {/* Overlay en hover */}
                  <div className="product-overlay">
                    <button className="product-overlay-btn">
                      ver prenda
                    </button>
                  </div>
                </div>

                {/* Info */}
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

      {/* SHOP THE LOOK - Con descuento real */}
      <section className="section-gaia bg-gaia-black text-gaia-white">
        <div className="container-gaia">
          
          {/* Header */}
          <div className="mb-16">
            <span className="label-gaia text-gaia-silver mb-3">
              combinaciones
            </span>
            <h2 className="title-section font-display">
              shop the look
            </h2>
          </div>

          {/* Grid de looks */}
          <div className="grid md:grid-cols-2 gap-12">
            {shopTheLook.map((look: Look) => (
              <div key={look.id} className="group">
                {/* Imagen */}
                <div className="product-image bg-gaia-charcoal">
                  <img
                    src={look.image}
                    alt={look.name}
                  />
                </div>

                {/* Info */}
                <div className="pt-6">
                  <h3 className="text-2xl font-light capitalize mb-4 tracking-tight font-display">
                    {look.name}
                  </h3>

                  {/* Items incluidos */}
                  <div className="mb-6 text-sm text-gaia-silver space-y-1 font-body">
                    {look.items.map((item: string, idx: number) => (
                      <p key={idx} className="capitalize">— {item}</p>
                    ))}
                  </div>

                  {/* Precios */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-gaia-ash line-through text-lg font-body">
                      {formatPrice(look.price)}
                    </span>
                    <span className="text-2xl font-light font-body">
                      {formatPrice(look.discount)}
                    </span>
                  </div>

                  {/* CTA */}
                  <button className="btn-primary w-full">
                    adquirir look
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER - Sistema Gaia */}
      <footer className="bg-gaia-black text-gaia-white py-16">
        <div className="container-gaia">
          
          {/* Grid de info */}
          <div className="grid md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-white/10">
            
            {/* Logo */}
            <div>
              <h3 className="logo-gaia text-2xl mb-3">
                GAIA<span className="font-normal text-gaia-crimson">SIX</span>
              </h3>
              <p className="text-xs text-gaia-ash leading-relaxed font-body">
                boho rock glam
              </p>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="label-gaia text-gaia-silver mb-4">
                contacto
              </h4>
              <div className="space-y-2 text-sm text-gaia-silver font-body">
                <p className="link-gaia">gaiashowroom@gmail.com</p>
                <p>+54 9 2964 479923</p>
                <p>@gaiasix</p>
              </div>
            </div>

            {/* Info */}
            <div>
              <h4 className="label-gaia text-gaia-silver mb-4">
                compras
              </h4>
              <div className="space-y-2 text-sm text-gaia-silver font-body">
                <p>envíos sin cargo</p>
                <p>6 cuotas sin interés</p>
                <p>cambios 30 días</p>
              </div>
            </div>

            {/* Navegación */}
            <div>
              <h4 className="label-gaia text-gaia-silver mb-4">
                navegación
              </h4>
              <div className="space-y-2 text-sm text-gaia-silver font-body">
                <p className="link-gaia cursor-pointer">colección</p>
                <p className="link-gaia cursor-pointer">nosotros</p>
                <p className="link-gaia cursor-pointer">contacto</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
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