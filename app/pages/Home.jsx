import React from 'react';
import HeroSlider from '../components/products/HeroSlider';
import { heroImages } from '../data/products';
import { formatPrice } from '../utils/formatters';

export default function Home({ products, onNavigate, onViewProduct, onCategorySelect }) {
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <HeroSlider 
        images={heroImages} 
        onNavigate={onNavigate}
        onCategorySelect={onCategorySelect}
      />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-heading text-4xl font-bold text-center mb-12">
          Algunos de nuestros favoritos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <div 
              key={product.id} 
              className="group cursor-pointer"
              onClick={() => onViewProduct(product)}
            >
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition"></div>
              </div>
              <h3 className="font-body font-semibold text-lg">{product.name}</h3>
              <p className="font-body text-gray-600">{formatPrice(product.price)}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={() => onNavigate('shop')}
            className="bg-black text-white px-8 py-3 rounded font-body font-semibold hover:bg-gray-800 transition"
          >
            Ver toda la colección
          </button>
        </div>
      </section>
    </>
  );
}