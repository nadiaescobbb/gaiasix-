"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatPrice } from '../../utils/formatters';
import { products, categories } from '../../data/products';
import { ProductCardSkeleton, Skeleton } from '../ui/LoadingStates';

export default function ShopPage({ selectedCategory, onSelectCategory, onAddToCart }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredProducts = selectedCategory === 'all' 
    ? products.filter(p => p.active)
    : products.filter(p => p.category === selectedCategory && p.active);

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header minimalista */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">
            Prendas
          </h1>
          <p className="text-gray-500 text-sm">
            Simple. Elegante. Lista.
          </p>
        </div>

        {/* Filtros sutiles */}
        {isLoading ? (
          <div className="flex justify-center gap-3 mb-16">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-9 w-24" variant="light" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-5 py-2 text-xs uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === cat.id 
                    ? 'border-b border-black text-black' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Grid limpio */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <EmptyState onSelectCategory={onSelectCategory} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ==========================================
// PRODUCT CARD - OPTIMIZADO
// ==========================================

function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-4">
        {/* Next.js Image optimizada */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-102' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
          quality={85}
          priority={product.featured}
        />
        
        {/* Skeleton mientras carga */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        
        {/* Overlay sutil al hover */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isHovered ? 'opacity-5' : 'opacity-0'
          }`}
        />
        
        {/* Botones minimalistas - solo al hover */}
        {product.stock > 0 && (
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product, size);
                  }}
                  className="bg-white text-black px-4 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sin stock - overlay sutil */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <span className="text-gray-400 text-xs uppercase tracking-widest">
              Agotado
            </span>
          </div>
        )}
      </div>
      
      {/* Info minimalista */}
      <div className="text-center space-y-1">
        <h3 className="text-xs uppercase tracking-widest text-gray-600">
          {product.name}
        </h3>
        <p className="text-sm font-light">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}

// ==========================================
// EMPTY STATE MINIMALISTA
// ==========================================

function EmptyState({ onSelectCategory }) {
  return (
    <div className="text-center py-32">
      <p className="text-gray-400 text-sm uppercase tracking-widest mb-8">
        Sin prendas en esta categoría
      </p>
      <button
        onClick={() => onSelectCategory('all')}
        className="border border-gray-300 text-gray-600 px-8 py-3 text-xs uppercase tracking-widest hover:border-black hover:text-black transition-all duration-300"
      >
        Ver todo
      </button>
    </div>
  );
}