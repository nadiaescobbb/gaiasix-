import React, { useState, useEffect } from 'react';

export default function HeroSlider({ images, onNavigate, onCategorySelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`hero-slide absolute inset-0 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
      
      <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
        <div className="max-w-3xl">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">
            Cómoda, con onda y lista para salir
          </h1>
          <p className="font-body text-xl md:text-2xl mb-8 font-light">
            Porque tu estilo merece sentirse tan bien como se ve
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => onNavigate('shop')}
              className="bg-red-700 px-8 py-3 rounded font-body font-semibold hover:bg-red-800 transition text-lg"
            >
              Ver Colección
            </button>
            <button 
              onClick={() => {
                onNavigate('shop');
                onCategorySelect('vestidos');
              }}
              className="bg-white text-black px-8 py-3 rounded font-body font-semibold hover:bg-gray-100 transition text-lg"
            >
              Novedades
            </button>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Ir a imagen ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}