"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronRight, Heart } from 'lucide-react';
import { Product, Category, SortOption } from '../types/shop.types';
import { mockProducts, categories } from '../data/shop-products';
import { formatPrice } from '../../utils/formatters';
import { Pagination } from '@/components/ui/Pagination';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Productos destacados (vamos a usar los primeros 8 productos nuevos)
  const featuredProducts = useMemo(() => {
    return mockProducts
      .filter(product => product.isNew)
      .slice(0, 8);
  }, []);

  // Filtrar y ordenar
  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? mockProducts 
      : mockProducts.filter(p => p.category === selectedCategory);

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Ordenar por nuevos primero
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      default:
        // Por defecto, mantener orden original o destacados
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  // Calcular productos paginados
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  // Resetear a página 1 cuando cambian filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white pt-4">
      {/* CATEGORÍAS */}
      <section className="section-gaia py-12">
        <div className="container-gaia">
          <h2 className="text-2xl font-bold text-center mb-8">CATEGORÍAS DESTACADAS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 4).map((category) => (
              <div 
                key={category.id}
                className="relative h-64 overflow-hidden group cursor-pointer bg-gray-100"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <div className="relative z-20 h-full flex items-end p-6">
                  <h3 className="text-white text-lg font-semibold uppercase tracking-wider">
                    {category.name}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="section-gaia py-12 bg-gray-50">
        <div className="container-gaia">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">PRODUCTOS DESTACADOS</h2>
            <button 
              className="text-sm font-semibold flex items-center gap-2 hover:text-red-500 transition-colors"
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('newest');
              }}
            >
              VER TODO <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FILTROS Y ORDEN */}
      <div className="sticky top-[90px] z-40 bg-white border-y border-gray-200">
        <div className="container-gaia">
          <div className="flex items-center justify-between py-4">
            
            {/* Filtros */}
            <div className="flex items-center gap-4 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                TODOS
              </button>
              
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {cat.name.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Ordenar */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-10 text-sm focus:outline-none focus:border-black font-medium cursor-pointer transition-colors"
              >
                <option value="newest">NUEVOS</option>
                <option value="price-asc">PRECIO: BAJO A ALTO</option>
                <option value="price-desc">PRECIO: ALTO A BAJO</option>
              </select>
              <ChevronDown 
                size={14} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* TODOS LOS PRODUCTOS */}
      <section className="section-gaia py-12">
        <div className="container-gaia">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              Mostrando {paginatedProducts.length} de {filteredProducts.length} productos
            </div>
            {filteredProducts.length > 0 && (
              <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {selectedCategory === 'all' ? 'TODAS LAS CATEGORÍAS' : 
                 categories.find(c => c.id === selectedCategory)?.name.toUpperCase()}
              </div>
            )}
          </div>

          {/* Grid de productos */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-6">
                No hay productos en esta categoría
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="bg-black text-white px-6 py-2 font-semibold hover:bg-gray-900 transition-colors"
              >
                VER TODOS LOS PRODUCTOS
              </button>
            </div>
          )}

          {/* Paginación */}
          {filteredProducts.length > productsPerPage && (
            <div className="mt-12">
              <Pagination 
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════
// COMPONENTE PRODUCT CARD ACTUALIZADO
// ═══════════════════════════════════════════════
interface ProductCardProps {
  product: Product;
  formatPrice: (price: number) => string;
}

function ProductCard({ product, formatPrice }: ProductCardProps) {
  const isFreeShipping = product.price > 30000; 
  
  return (
    <div className="group">
      {/* Contenedor de imagen */}
      <div className="relative overflow-hidden mb-4 bg-gray-100 aspect-[3/4] rounded-sm">
        {/* Badge nuevo */}
        {product.isNew && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-black text-white px-2 py-1 text-xs font-semibold uppercase tracking-wider">
              Nuevo
            </span>
          </div>
        )}
      
        
        {/* Imagen del producto */}
        <div className="relative h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        
        {/* Botón corazón */}
        <div className="absolute top-3 right-3 z-10">
          <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
            <Heart size={16} className="text-gray-700 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Overlay para hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end justify-center pb-6">
          <button className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-black text-white px-6 py-3 text-sm font-semibold hover:bg-gray-800">
            VER PRODUCTO
          </button>
        </div>
      </div>

      {/* Información del producto */}
      <div>
        <h3 className="font-semibold text-lg mb-1 uppercase tracking-tight text-gray-800">
          {product.name}
        </h3>
        
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
        
        {/* Información adicional */}
        <div className="mt-2 space-y-1">
          <p className="text-xs text-gray-500">
            15% OFF en transferencia
          </p>
          
        
          
          {product.stock === 0 && (
            <p className="text-xs text-red-600 font-medium">
              AGOTADO
            </p>
          )}
        </div>
      </div>
    </div>
  );
}