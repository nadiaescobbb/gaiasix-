"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { formatPrice } from "@/utils/formatters";
import { products } from "@/app/data/products";


export default function HomePage({ onNavigate }) {
  // Reemplazá estas rutas por tus banners reales
  const heroImages = [
    "/images/banner1.avif",
    "/images/banner2.avif",
    "/images/banner3.avif",
  ];

  // Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    // duration control internal de embla (no tocar demasiado)
    duration: 8,
  });

  // Autoplay con pausa en background
  const autoplayInterval = useRef(null);
  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;
    stopAutoplay();
    autoplayInterval.current = setInterval(() => {
      // Embla puede devolver undefined si fue destruido
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

    // start if visible
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

    // Clean
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopAutoplay();
    };
  }, [emblaApi, startAutoplay, stopAutoplay]);

  // FEATURED
  const featuredProducts = products
    .filter((p) => p.featured && p.active)
    .slice(0, 3);

  return (
    <div className="min-h-screen">

      {/* ============================
          HERO
      ============================ */}
      <div className="relative min-h-[100svh] bg-black overflow-hidden">

        <div className="embla" ref={emblaRef}>
          <div className="embla__container">

            {heroImages.map((img, i) => (
              <div key={i} className="embla__slide min-h-[100svh] relative">
                <Image
                  src={img}
                  alt={`Banner ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-1000"
                  style={{ transform: 'scale(1.02)' }}
                  priority={i === 0}
                />

                {/* overlay sutil para no matar la foto */}
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

            <p className="text-gray-300 text-sm md:text-base tracking-wide">
              Simple. Elegante. Sin vueltas.
            </p>

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
          VALORES
      ============================ */}
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

function FeaturedProduct({ product, priority, onNavigate }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleActivate = () => {
    // si en el futuro querés usar Link real, lo podés reemplazar aquí
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