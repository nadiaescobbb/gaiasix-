"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { formatPrice } from "@/app/utils/formatters";
import { products } from "@/app/data/products";

export default function HomePage({ onNavigate }) {
  const heroImages = [
    "/images/banner/banner-web.avif",
    "/images/banner/banner-web.avif",
    "/images/banner/banner-web.avif",
  ];

  // Estados para el carrusel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 35,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // Actualizar índice actual
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Navegación por botones
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  // Autoplay mejorado
  const autoplayInterval = useRef(null);
  
  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;
    stopAutoplay();
    autoplayInterval.current = setInterval(() => {
      if (emblaApi && typeof emblaApi.scrollNext === "function") {
        emblaApi.scrollNext();
      }
    }, 5000);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
      autoplayInterval.current = null;
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    if (typeof document !== "undefined" && document.visibilityState === "visible") {
      startAutoplay();
    }

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopAutoplay();
    };
  }, [emblaApi, startAutoplay, stopAutoplay]);

  const featuredProducts = products
    .filter((p) => p.featured && p.active)
    .slice(0, 3);

  // Datos para "Shop the Look" con tus productos reales
  const shopTheLookData = [
    {
      id: 1,
      name: "Night Elegance",
      totalPrice: 23500,
      image: "/images/products/vestido-platt.avif",
      products: [
        { 
          name: "Vestido Platt", 
          price: 23500, 
          image: "/images/products/vestido-platt.avif" 
        }
      ]
    },
    {
      id: 2,
      name: "Boho Chic Set",
      totalPrice: 15670,
      image: "/images/products/set-feral.avif",
      products: [
        { 
          name: "Set Feral", 
          price: 15670, 
          image: "/images/products/set-feral.avif" 
        }
      ]
    },
    {
      id: 3,
      name: "Tul Fantasy",
      totalPrice: 12250,
      image: "/images/products/set-seline.avif",
      products: [
        { 
          name: "Set Seline", 
          price: 12250, 
          image: "/images/products/set-seline.avif" 
        }
      ]
    },
    {
      id: 4,
      name: "Drape y Mini",
      totalPrice: 24925,
      image: "/images/products/top-drape.avif",
      products: [
        { 
          name: "Top Drape", 
          price: 13550, 
          image: "/images/products/top-drape.avif" 
        },
        { 
          name: "Mini Trace", 
          price: 11375, 
          image: "/images/products/mini-trace.avif" 
        }
      ]
    },
    {
      id: 5,
      name: "Fylo y Lark",
      totalPrice: 24675,
      image: "/images/products/top-fylo.avif",
      products: [
        { 
          name: "Top Fylo", 
          price: 13550, 
          image: "/images/products/top-fylo.avif" 
        },
        { 
          name: "Mini Lark", 
          price: 11125, 
          image: "/images/products/mini-lark.avif" 
        }
      ]
    },
    {
      id: 6,
      name: "Classic Black",
      totalPrice: 21500,
      image: "/images/products/vestido-stun.avif",
      products: [
        { 
          name: "Vestido Stun", 
          price: 21500, 
          image: "/images/products/vestido-stun.avif" 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* ============================
          HERO MEJORADO
      ============================ */}
      <div className="relative min-h-[100svh] bg-black overflow-hidden">
        {/* Controles del carrusel */}
        <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2 z-20 flex justify-between pointer-events-none">
          <button
            className="embla__prev pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300"
            onClick={scrollPrev}
            aria-label="Slide anterior"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="embla__next pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300"
            onClick={scrollNext}
            aria-label="Slide siguiente"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? "bg-white w-6" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        <div 
          className="embla overflow-hidden cursor-grab active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="embla__container flex">
            {heroImages.map((img, i) => (
              <div 
                key={i} 
                className="embla__slide flex-[0_0_100%] min-w-0 min-h-[100svh] relative"
              >
                <Image
                  src={img}
                  alt={`Banner ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/30"></div>
              </div>
            ))}
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-tight font-playfair">
              Lista para salir.
            </h1>
            <button
              onClick={() => onNavigate("shop")}
              className="border border-white text-white px-12 py-4 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-500 mt-12"
              aria-label="Ver prendas"
            >
              Ver prendas
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
        </div>
      </div>

      {/* ============================
          FEATURED
      ============================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Nuevas
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              Recién llegaron
            </h2>
          </div>

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

          <div className="text-center mt-16">
            <button
              onClick={() => onNavigate("shop")}
              className="border border-gray-300 text-gray-600 px-8 py-3 text-xs uppercase tracking-widest hover:border-black hover:text-black transition-all duration-300"
              aria-label="Explorar todo"
            >
              Explorar todo
            </button>
          </div>
        </div>
      </section>

      {/* ============================
          SHOP THE LOOK 
      ============================ */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              outfit u love
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shopTheLookData.map((look) => (
              <ShopTheLookCard key={look.id} look={look} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          VALORES
      ============================ */}
      <section className="py-20 px-6 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
              <p className="text-2xl font-light text-gray-900 mb-3">Envios Gratis</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                superando los $150.000
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

function FeaturedProduct({ product, priority, onNavigate }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleActivate = () => {
    onNavigate("shop");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  };

  return (
    <div className="group">
      <button
        className="cursor-pointer text-left w-full"
        onClick={handleActivate}
        onKeyDown={onKeyDown}
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-4">
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
          <p className="text-sm font-light text-gray-900">{formatPrice(product.price)}</p>
        </div>
      </button>
    </div>
  );
}

// Componente para Shop the Look
function ShopTheLookCard({ look, onNavigate }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Imagen principal del look */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <Image
          src={look.image}
          alt={look.name}
          fill
          className="object-cover"
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Precio total del look */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded">
          <p className="text-sm font-medium text-gray-900">{formatPrice(look.totalPrice)}</p>
        </div>
      </div>

      <div className="p-6">
        {/* Nombre del look */}
        <h3 className="text-xl font-light text-gray-900 mb-4">{look.name}</h3>

        {/* Productos individuales */}
        <div className="space-y-3 mb-6">
          {look.products.map((product, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-700">{product.name}</p>
                  <p className="text-xs text-gray-500">{formatPrice(product.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Comprar Look */}
        <button
          onClick={() => onNavigate("shop")}
          className="w-full bg-black text-white py-3 px-6 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors duration-300"
        >
          Comprar look
        </button>
      </div>
    </div>
  );
}