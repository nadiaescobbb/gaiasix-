"use client";

import { useState } from 'react';
import { products, categories, type Product, type Category } from '../../lib/products';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products.filter((p: Product) => p.active)
    : products.filter((p: Product) => p.category === selectedCategory && p.active);

  const getColorStyle = (color: string): string => {
    const colors: Record<string, string> = {
      'negro': '#000000',
      'blanco': '#FFFFFF',
      'rojo': '#AF161F',
      'bordo': '#722F37',
      'beige': '#D4B996',
      'marron': '#8B4513',
      'camel': '#C19A6B',
      'chocolate': '#7B3F00',
      'verde': '#2E8B57',
      'gris': '#808080',
      'rosa viejo': '#C08081',
      'crema': '#F5F5DC',
    };
    return colors[color.toLowerCase()] || '#CCCCCC';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header con navegación de categorías */}
      <div className="border-b border-gray-300">
        <div className="max-w-[1400px] mx-auto px-4">
          <nav className="flex items-center justify-center gap-8 h-12 text-[13px] font-medium tracking-wider overflow-x-auto">
            {categories.map((category: Category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Información de resultados */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-4">
            <select className="text-sm border border-gray-300 px-3 py-1 rounded">
              <option>Ordenar por</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Novedades</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product: Product) => (
            <div key={product.id} className="group relative">
              {/* Imagen */}
              <a href={`/shop/product/${product.slug}`} className="block relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.new && (
                    <span className="bg-black text-white px-2 py-1 text-[10px] font-semibold tracking-wider">
                      NUEVO
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-white text-black px-2 py-1 text-[10px] font-semibold tracking-wider border">
                      DESTACADO
                    </span>
                  )}
                </div>

                {/* Botón comprar en hover */}
                <button className="absolute top-3 right-3 bg-white text-black px-4 py-2 text-[11px] font-semibold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-black hover:bg-black hover:text-white">
                  COMPRAR
                </button>

                {/* Indicadores de color */}
                {product.colors.length > 0 && (
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    {product.colors.slice(0, 3).map((color: string, idx: number) => (
                      <div
                        key={idx}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: getColorStyle(color) }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <div className="w-4 h-4 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-[8px] text-gray-600">
                        +{product.colors.length - 3}
                      </div>
                    )}
                  </div>
                )}

                {/* Stock bajo */}
                {product.stock > 0 && product.stock <= 2 && (
                  <div className="absolute bottom-3 right-3 bg-red-500 text-white px-2 py-1 text-[10px] font-semibold">
                    ÚLTIMAS {product.stock}
                  </div>
                )}

                {/* Sin stock */}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                    <span className="bg-black text-white px-3 py-2 text-sm font-semibold tracking-wider">
                      SIN STOCK
                    </span>
                  </div>
                )}
              </a>

              {/* Info del producto */}
              <div className="text-center">
                <a href={`/shop/product/${product.slug}`} className="block hover:opacity-70 transition-opacity">
                  <h3 className="text-[13px] font-medium tracking-wide mb-1 text-black uppercase">
                    {product.name}
                  </h3>
                  <p className="text-[15px] font-semibold text-black mb-1">
                    {formatPrice(product.price)}
                  </p>
                  
                  {/* Tallas disponibles */}
                  {product.sizes.length > 0 && (
                    <div className="flex justify-center gap-1 mb-1">
                      {product.sizes.slice(0, 3).map((size: string) => (
                        <span key={size} className="text-[10px] text-gray-500 border border-gray-300 px-1">
                          {size.toUpperCase()}
                        </span>
                      ))}
                      {product.sizes.length > 3 && (
                        <span className="text-[10px] text-gray-500">+{product.sizes.length - 3}</span>
                      )}
                    </div>
                  )}

                  {/* Descripción corta */}
                  {product.description && (
                    <p className="text-[11px] text-gray-600 line-clamp-2 mt-1 hidden md:block">
                      {product.description.substring(0, 60)}...
                    </p>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Sin productos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm mb-4">No hay productos disponibles en esta categoría</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-sm underline hover:text-black transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>

      {/* Paginación */}
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