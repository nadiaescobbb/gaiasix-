"use client";

import { useState } from 'react';

// Definir tipos TypeScript
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  colors: string[];
  new: boolean;
  stock: number;
}

interface Category {
  id: string;
  name: string;
}

// Simulación de datos
const products: Product[] = [
  {
    id: 1,
    name: "VESTIDO STUN",
    category: "vestidos",
    price: 21500,
    image: "/images/noche/vestido-stun.avif",
    colors: ['black'],
    new: true,
    stock: 1,
  },
  {
    id: 2,
    name: "TOP DRAPE",
    category: "tops",
    price: 13550,
    image: "/images/products/top-drape.avif",
    colors: ['black', 'red'],
    new: false,
    stock: 2,
  },
  {
    id: 3,
    name: "MINI TRACE",
    category: "polleras",
    price: 11375,
    image: "/images/products/mini-tracee.avif",
    colors: ['black'],
    new: false,
    stock: 1,
  },
  {
    id: 4,
    name: "TOP FYLO",
    category: "tops",
    price: 13550,
    image: "/images/products/top-fylo.avif",
    colors: ['black'],
    new: true,
    stock: 1,
  },
  {
    id: 5,
    name: "top black",
    category: "tops",
    price: 12200,
    image: "/images/products/top-black.avif",
    colors: ['black'],
    new: false,
    stock: 1,
  },
  {
    id: 6,
    name: "short texas",
    category: "short",
    price: 51040,
    image: "/images/noche/short-texas.avif",
    colors: ['camel', 'marron'],
    new: false,
    stock: 2,
  },
  {
    id: 7,
    name: "top tini",
    category: "tops",
    price: 12800,
    image: "/images/products/top-tini.avif",
    colors: ['black'],
    new: true,
    stock: 1,
  },
  {
    id: 8,
    name: "top halter",
    category: "tops",
    price: 18900,
    image: "/images/products/top-halter.avif",
    colors: ['gris'],
    new: false,
    stock: 1,
  },
];

const categories: Category[] = [
  { id: 'all', name: 'TODOS' },
  { id: 'vestidos', name: 'VESTIDOS' },
  { id: 'tops', name: 'TOPS' },
  { id: 'polleras', name: 'POLLERAS' },
  { id: 'short', name: 'SHORT' },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const getColorStyle = (color: string): string => {
    const colors: Record<string, string> = {
      'black': '#000000',
      'white': '#FFFFFF',
      'red': '#AF161F',
      'beige': '#D4B996',
    };
    return colors[color] || color; 
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-300">
        <div className="max-w-[1400px] mx-auto px-4">
          <nav className="flex items-center justify-center gap-8 h-12 text-[13px] font-medium tracking-wider overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              {/* Imagen */}
              <a href={`#product-${product.id}`} className="block relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Botón comprar en hover */}
                <button className="absolute top-3 right-3 bg-white text-black px-4 py-2 text-[11px] font-semibold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-black">
                  COMPRAR
                </button>

                {/* Indicadores de color */}
                {product.colors.length > 1 && (
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        className="w-4 h-4 rounded-full border border-gray-400"
                        style={{ backgroundColor: getColorStyle(color) }}
                        title={color}
                      />
                    ))}
                  </div>
                )}
              </a>

              {/* Info del producto */}
              <div className="text-center">
                <a href={`#product-${product.id}`}>
                  <h3 className="text-[13px] font-medium tracking-wide mb-1 text-black hover:opacity-70 transition-opacity">
                    {product.name}
                  </h3>
                  <p className="text-[15px] font-semibold text-black">
                    {formatPrice(product.price)}
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Sin productos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm mb-4">No hay productos disponibles</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-sm underline"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-4 pb-12">
          <div className="flex justify-center items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors">
              ←
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-black text-white text-sm font-medium">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors text-sm">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors text-sm">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors">
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}