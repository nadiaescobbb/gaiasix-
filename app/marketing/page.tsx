"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { formatPrice } from "../../utils/formatters";
import { products } from "../../data/products";
import { type Page } from "../../lib/types";

// ===================================================
// TYPES 
// ===================================================

interface LookProduct {
  name: string;
  price: number;
}

interface ShopLook {
  id: number;
  name: string;
  totalPrice: number;
  image: string;
  products: LookProduct[];
}

interface Category {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  featured?: boolean;
  active?: boolean;
}

interface ShopTheLookCardProps {
  look: ShopLook;
  onNavigate: (page: Page) => void;
}

interface FeaturedProductProps {
  product: Product;
  priority?: boolean;
  onNavigate: (page: Page) => void;
}

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

// ===================================================
// SHOP THE LOOK CARD 
// ===================================================
function ShopTheLookCard({ look, onNavigate }: ShopTheLookCardProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <div className="group border border-gray-100 p-4 hover:border-black transition-all duration-300">
      <div className="relative overflow-hidden bg-gray-100 h-[420px] md:h-[480px] mb-4">
        <Image
          src={look.image}
          alt={look.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>

      <div className="text-center">
        <h3 className="text-xl font-light text-gray-900 mb-6">
          {look.name}
        </h3>

        <div className="space-y-3 mb-8">
          {look.products.map((product, i) => (
            <div key={i} className="text-center">
              <p className="text-sm uppercase tracking-widest text-gray-600 mb-1">
                {product.name}
              </p>
              <p className="text-sm font-light text-gray-900">
                {formatPrice(product.price)}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="border-t border-gray-200 pt-4">
            <p className="text-lg font-light text-gray-900">
              {formatPrice(look.totalPrice)}
            </p>
          </div>

          <button
            onClick={() => onNavigate("shop")}
            className="w-full border border-gray-900 text-gray-900 py-3 text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Comprar look
          </button>
        </div>
      </div>
    </div>
  );
}

// ===================================================
// FEATURED PRODUCT 
// ===================================================
function FeaturedProduct({ product, priority, onNavigate }: FeaturedProductProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const activate = (): void => onNavigate("shop");

  const onKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate();
    }
  };

  return (
    <div className="group">
      <button
        className="cursor-pointer text-left w-full"
        onClick={activate}
        onKeyDown={onKeyDown}
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative overflow-hidden bg-gray-50 h-[420px] md:h-[480px] mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover group-hover:scale-102 transition-transform duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            quality={95}
            priority={priority}
          />

          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}

          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-xs uppercase tracking-widest text-gray-600">
            {product.name}
          </h3>
          <p className="text-sm font-light text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </button>
    </div>
  );
}

// ===================================================
// HOME PAGE (SIMPLIFICADO - sin carousel)
// ===================================================
export default function HomePage({ onNavigate }: HomePageProps) {
  const categories: Category[] = [
    {
      id: 1,
      title: "Boho Nocturno",
      subtitle: "PINK LOVERS",
      image: "/images/boho/vestido-issi.avif",
      link: "/shop"
    },
    {
      id: 2,
      title: "glam party",
      subtitle: "BEACH WEAR", 
      image: "/images/boho/vestido-esme-fr.avif",
      link: "/shop"
    },
    {
      id: 3,
      title: "noche",
      subtitle: "EVENING DRESSES",
      image: "/images/boho/vestido-rio.avif",
      link: "/shop"
    }
  ];

  const featuredProducts: Product[] = products
    .filter((p: Product) => p.featured && p.active)
    .slice(0, 3);

  const shopTheLookData: ShopLook[] = [
    {
      id: 1,
      name: "Midnight Slip",
      totalPrice: 23500,
      image: "/images/boho/top-mili.avif",
      products: [{ name: "Vestido Platt", price: 23500 }],
    },
    {
      id: 2,
      name: "Afterglow Set",
      totalPrice: 15670,
      image: "/images/noche/top-floyd.avif",
      products: [{ name: "Set Feral", price: 15670 }],
    },
    {
      id: 3,
      name: "Crystal Mesh",
      totalPrice: 12250,
      image: "/images/boho/vestido-esme-fr.avif",
      products: [{ name: "Set Seline", price: 12250 }],
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* =====================================
          HERO SIMPLIFICADO
      ===================================== */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 tracking-tight leading-tight">
            GAIA SIX
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Moda femenina con estilo único y sostenible
          </p>
          <button
            onClick={() => onNavigate("shop")}
            className="border border-gray-900 text-gray-900 px-12 py-4 text-xs uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-500 mt-8"
          >
            Descubrir Colección
          </button>
        </div>
      </section>

      {/* =====================================
          COLLAGE 
      ===================================== */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 h-screen md:h-[80vh]">
          {/* Imagen grande - ocupa 2 columnas */}
          <div className="md:col-span-2 relative group">
            <Image
              src={categories[0].image}
              alt={categories[0].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-8">
              <h3 className="text-4xl font-light mb-3">{categories[0].title}</h3>
              <p className="text-xl mb-8">{categories[0].subtitle}</p>
              <button 
                onClick={() => onNavigate("shop")}
                className="border-2 border-white px-10 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Ver Colección
              </button>
            </div>
          </div>

          {/* Contenedor de las 2 imágenes apiladas */}
          <div className="md:col-span-2 grid grid-rows-2">
            {/* Imagen superior */}
            <div className="relative group">
              <Image
                src={categories[1].image}
                alt={categories[1].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-3xl font-light mb-2">{categories[1].title}</h3>
                <p className="text-lg mb-6">{categories[1].subtitle}</p>
                <button 
                  onClick={() => onNavigate("shop")}
                  className="border border-white px-8 py-2 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  Ver Colección
                </button>
              </div>
            </div>

            {/* Imagen inferior */}
            <div className="relative group">
              <Image
                src={categories[2].image}
                alt={categories[2].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-3xl font-light mb-2">{categories[2].title}</h3>
                <p className="text-lg mb-6">{categories[2].subtitle}</p>
                <button 
                  onClick={() => onNavigate("shop")}
                  className="border border-white px-8 py-2 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  Ver Colección
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          FEATURED PRODUCTS
      ===================================== */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Lo último
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              para tu próxima noche.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            {featuredProducts.map((product, index) => (
              <FeaturedProduct
                key={product.id}
                product={product}
                priority={index === 0}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => onNavigate("shop")}
              className="border border-gray-300 text-gray-600 px-8 py-3 text-xs uppercase tracking-widest hover:border-black hover:text-black transition-all duration-300"
            >
              Explorar todo
            </button>
          </div>
        </div>
      </section>

      {/* =====================================
          VALORES
      ===================================== */}
      <section className="py-20 px-6 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
              <p className="text-2xl font-light text-gray-900 mb-3">Envíos Gratis</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                superando los $50.000
              </p>
            </div>

            <div>
              <p className="text-2xl font-light text-gray-900 mb-3">3 cuotas</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Sin interés
              </p>
            </div>

            <div>
              <p className="text-2xl font-light text-gray-900 mb-3">7 días</p>
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