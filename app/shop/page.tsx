"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Grid, List, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, Category, SortOption, ViewMode } from '../types/shop.types';
import { mockProducts, categories } from '../data/shop-products';
import { formatPrice } from '../../utils/formatters';
import { Pagination } from '@/components/ui/Pagination';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  // Calcular productos paginados
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Resetear a página 1 cuando cambian filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO MINIMALISTA */}
      <section className="section-gaia border-b border-gaia-border bg-gaia-charcoal/[0.02]">
        <div className="container-gaia text-center">
          <span className="label-gaia text-gaia-crimson mb-4">colección</span>
          <h1 className="title-section font-display mb-6">
            todas las piezas
          </h1>
          <p className="text-lg text-gaia-ash max-w-xl mx-auto font-body font-light">
            nocturno · minimalista · atemporal
          </p>
        </div>
      </section>

      {/* BARRA DE CONTROLES */}
      <div className="sticky top-0 z-40 bg-white border-b border-gaia-border">
        <div className="container-gaia">
          <div className="flex items-center justify-between py-4">
            
            {/* Filtros de categoría */}
            <div className="flex items-center gap-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-sm font-body transition-colors pb-1 ${
                    selectedCategory === cat.id
                      ? 'text-gaia-black border-b border-gaia-black'
                      : 'text-gaia-ash hover:text-gaia-black'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Controles derecha */}
            <div className="flex items-center gap-4">
              
              {/* Vista Grid/List */}
              <div className="flex border border-gaia-border">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-gaia-black text-white' 
                      : 'text-gaia-silver hover:text-gaia-black'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-gaia-black text-white' 
                      : 'text-gaia-silver hover:text-gaia-black'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>

              {/* Ordenar */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white border border-gaia-border px-4 py-2 pr-8 text-sm focus:outline-none focus:border-gaia-black font-body cursor-pointer"
                >
                  <option value="default">destacados</option>
                  <option value="newest">nuevos</option>
                  <option value="price-asc">precio ↑</option>
                  <option value="price-desc">precio ↓</option>
                </select>
                <ChevronDown 
                  size={14} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gaia-silver pointer-events-none" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRID DE PRODUCTOS */}
      <section className="section-gaia">
        <div className="container-gaia">
          
          {/* Contador mejorado con paginación */}
          <div className="mb-12 text-sm text-gaia-ash font-body">
            Mostrando {paginatedProducts.length} de {filteredProducts.length} piezas
            {totalPages > 1 && ` - Página ${currentPage} de ${totalPages}`}
          </div>

          {/* Vista Grid */}
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {paginatedProducts.map((product, idx) => (
                <ProductCardGrid 
                  key={product.id} 
                  product={product}
                  offset={idx % 2 === 1}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {paginatedProducts.map((product) => (
                <ProductCardList 
                  key={product.id} 
                  product={product}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          )}

          {/* Estado vacío */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gaia-silver font-body mb-6">
                no hay piezas en esta categoría
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="btn-secondary"
              >
                ver todo
              </button>
            </div>
          )}

          {/* Componente de paginación */}
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════
// CARD GRID
// ═══════════════════════════════════════════════
interface CardProps {
  product: Product;
  formatPrice: (price: number) => string;
  offset?: boolean;
}

function ProductCardGrid({ product, formatPrice, offset = false }: CardProps) {
  return (
    <div className={`product-card ${offset ? 'md:mt-16' : ''}`}>
      
      {/* Imagen */}
      <div className="product-image">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={533}
          className="w-full h-full object-cover"
        />
        
        {/* Badge nuevo */}
        {product.isNew && (
          <div className="badge-new">nuevo</div>
        )}

        {/* Badge agotado */}
        {product.stock === 0 && (
          <div className="absolute top-4 left-4 bg-gaia-silver text-gaia-black px-3 py-1 text-[9px] tracking-[0.25em] uppercase font-body z-10">
            agotado
          </div>
        )}

        {/* Overlay */}
        <div className="product-overlay">
          <button className="product-overlay-btn">
            ver prenda
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-base font-light capitalize font-body mb-1">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-xs text-gaia-silver font-body">
                {product.description}
              </p>
            )}
          </div>
          <p className="text-lg font-light font-body ml-4">
            {formatPrice(product.price)}
          </p>
        </div>
        
        {/* Tallas */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex gap-1.5 mt-3">
            {product.sizes.map((size) => (
              <span 
                key={size}
                className="text-[10px] text-gaia-ash uppercase tracking-wider font-body"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// CARD LIST
// ═══════════════════════════════════════════════
function ProductCardList({ product, formatPrice }: Omit<CardProps, 'offset'>) {
  return (
    <div className="flex gap-8 group pb-8 border-b border-gaia-border last:border-0">
      
      {/* Imagen */}
      <div className="w-32 h-44 flex-shrink-0 relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={128}
          height={176}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-gaia-black text-white px-2 py-1 text-[9px] tracking-[0.25em] uppercase font-body">
            nuevo
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-light capitalize font-body mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-gaia-silver uppercase tracking-wider font-body">
              {product.category}
            </p>
          </div>
          <p className="text-xl font-light font-body ml-6">
            {formatPrice(product.price)}
          </p>
        </div>

        {product.description && (
          <p className="text-sm text-gaia-ash mb-4 font-body font-light">
            {product.description}
          </p>
        )}

        {/* Tallas */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gaia-silver font-body">tallas:</span>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <span 
                  key={size}
                  className="text-xs text-gaia-ash uppercase font-body"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <button className="btn-primary text-sm py-2 px-6">
          ver prenda
        </button>
      </div>
    </div>
  );
}