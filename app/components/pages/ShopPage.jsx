"use client";

import { formatPrice } from '../../utils/formatters';
import { products, categories } from '../../data/products';

export default function ShopPage({ selectedCategory, onSelectCategory, onAddToCart }) {
  const filteredProducts = selectedCategory === 'all' 
    ? products.filter(p => p.active)
    : products.filter(p => p.category === selectedCategory && p.active);

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-6 py-2 text-xs uppercase tracking-widest transition-all ${
                selectedCategory === cat.id 
                  ? 'border-b-2 border-black' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-3">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay con botones de talla */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => onAddToCart(product, size)}
                        className="bg-white px-4 py-2 text-xs uppercase tracking-wide hover:bg-red-800 hover:text-white transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Info del producto */}
              <div className="flex justify-between items-center text-sm">
                <h3 className="uppercase tracking-wide">{product.name}</h3>
                <span>{formatPrice(product.price)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No hay productos en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}