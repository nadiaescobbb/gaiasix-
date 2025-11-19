"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { formatPrice } from "@/app/utils/formatters";
import { products } from "@/app/data/products";

// ===================================================
// SHOP THE LOOK CARD (Optimizado, más premium)
// ===================================================
function ShopTheLookCard({ look, onNavigate }) {
  const [imageLoaded, setImageLoaded] = useState(false);

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
        <h3 className="text-xl font-light text-gray-900 mb-6 font-playfair">
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
// FEATURED PRODUCT (Optimizado)
// ===================================================
function FeaturedProduct({ product, priority, onNavigate }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const activate = () => onNavigate("shop");

  const onKeyDown = (e) => {
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
// HOME PAGE
// ===================================================
export default function HomePage({ onNavigate }) {
  const heroImages = ["/images/banner/banner-vestido.avif"]; 
  ["/images/boho/vestido-esme-pp.avif"]; 

  const categories = [
    {
      id: 1,
      title: "Boho Nocturno",
      subtitle: "PINK LOVERS",
      image: "/images/boho/vestido-issi.avif",
      link: "https://www.shoppcherry.com.ar/mujer/paritalones/?sort_by=created=descending"
    },
    {
      id: 2,
      title: "glam party",
      subtitle: "BEACH WEAR", 
      image: "/images/boho/vestido-esme-fr.avif",
      link: "/shop?category=summer"
    },
    {
      id: 3,
      title: "noche",
      subtitle: "EVENING DRESSES",
      image: "/images/boho/vestido-rio.avif",
      link: "/shop?category=evening"
    }
  ];


  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 55,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

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

  const autoplayInterval = useRef(null);

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;
    stopAutoplay();
    autoplayInterval.current = setInterval(() => {
      emblaApi?.scrollNext();
    }, 7000);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
      autoplayInterval.current = null;
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    if (document.visibilityState === "visible") startAutoplay();

    const onVisibility = () => {
      document.visibilityState === "hidden" ? stopAutoplay() : startAutoplay();
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

  const shopTheLookData = [
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
    },
    {
      id: 4,
      name: "Drape Silhouette",
      totalPrice: 24925,
      image: "/images/products/top-drape.avif",
      products: [
        { name: "Top Drape", price: 13550 },
        { name: "Mini Trace", price: 11375 },
      ],
    },
    {
      id: 5,
      name: "Night Lines",
      totalPrice: 24675,
      image: "/images/products/top-fylo.avif",
      products: [
        { name: "Top Fylo", price: 13550 },
        { name: "Mini Lark", price: 11125 },
      ],
    },
    {
      id: 6,
      name: "Black Icon",
      totalPrice: 21500,
      image: "/images/products/vestido-stun.avif",
      products: [{ name: "Vestido Stun", price: 21500 }],
    },
  ];

  return (
    <div className="min-h-screen">

      {/* =====================================
          HERO
      ===================================== */}
      <div className="relative min-h-[100svh] bg-black overflow-hidden">
        {/* Botones prev/next */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
          <button
            className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300"
            onClick={scrollPrev}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300"
            onClick={scrollNext}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="embla overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="embla__container flex">
            {heroImages.map((img, i) => (
              <div key={i} className="embla__slide flex-[0_0_100%] min-h-[100svh] relative">
                <Image
                  src={img}
                  alt={`Banner ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero content */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-tight font-playfair">
              Vestite para destacar.
            </h1>
            <button
              onClick={() => onNavigate("shop")}
              className="border border-white text-white px-12 py-4 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-500 mt-12"
            >
              Ver prendas
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
        </div>
      </div>

    {/* =====================================
    COLLAGE - Layout 1 grande + 2 apiladas
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
        <h3 className="text-4xl font-bold mb-3">{categories[0].title}</h3>
        <p className="text-xl mb-8">{categories[0].subtitle}</p>
        <button className="border-2 border-white px-10 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          SHOP NOW
        </button>
      </div>
    </div>

    {/* Contenedor de las 2 imágenes apiladas - ocupa 2 columnas */}
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
          <h3 className="text-3xl font-bold mb-2">{categories[1].title}</h3>
          <p className="text-lg mb-6">{categories[1].subtitle}</p>
          <button className="border border-white px-8 py-2 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            SHOP NOW
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
          <h3 className="text-3xl font-bold mb-2">{categories[2].title}</h3>
          <p className="text-lg mb-6">{categories[2].subtitle}</p>
          <button className="border border-white px-8 py-2 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* =====================================
          FEATURED
      ===================================== */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Lo último
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 font-playfair">
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
          SHOP THE LOOK
      ===================================== */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Shop the Look
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 font-playfair">
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

      {/* =====================================
          VALORES
      ===================================== */}
      <section className="py-20 px-6 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
              <p className="text-2xl font-light text-gray-900 mb-3 font-playfair">Envíos Gratis</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                superando los $150.000
              </p>
            </div>

            <div>
              <p className="text-2xl font-light text-gray-900 mb-3 font-playfair">3 cuotas</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Sin interés
              </p>
            </div>

            <div>
              <p className="text-2xl font-light text-gray-900 mb-3 font-playfair">7 días</p>
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
