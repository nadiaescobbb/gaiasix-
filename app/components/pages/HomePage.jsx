"use client";

import { formatPrice } from '../../utils/formatters';
import { products } from '../../data/products';

export default function HomePage({ onNavigate }) {
  const featuredProducts = products.filter(p => p.featured && p.active).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-white flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        
        <div className="relative z-10 text-center px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <h1 className="text-6xl md:text-8xl font-light text-black tracking-tight">
              Tu <span className="text-red-800">estilo</span>
            </h1>
            
            <button 
              onClick={() => onNavigate('shop')}
              className="border border-red-800 text-red-800 px-12 py-4 text-sm uppercase tracking-widest hover:bg-red-800 hover:text-white transition-all duration-300"
            >
              Ver looks
            </button>
            
            {/* Stats */}
            <div className="flex justify-center gap-16 pt-12 text-xs uppercase tracking-widest text-gray-600">
              <div className="text-center">
                <p className="text-2xl font-light text-black">3</p>
                <p className="mt-1">Cuotas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-light text-black">24hs</p>
                <p className="mt-1">Envío</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-light text-black">+500</p>
                <p className="mt-1">Clientas felices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Products Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div 
                key={product.id} 
                className="group cursor-pointer" 
                onClick={() => onNavigate('shop')}
              >
                <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm uppercase tracking-wide">{product.name}</h3>
                  <span className="text-sm">{formatPrice(product.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}