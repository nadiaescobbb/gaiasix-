"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronRight, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Product, Category, SortOption } from '../types/shop.types';
import { mockProducts, categories } from '../data/shop-products';
import { formatPrice } from '../../utils/formatters';
import { Pagination } from '@/components/ui/Pagination';

export default function ShopPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Productos destacados (primeros 8 nuevos)
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
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  // Paginación
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  // Reset página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gaia-bone">
      
      {/* CATEGORÍAS DESTACADAS */}
      <section className="section-gaia">
        <div className="container-gaia">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gaia-crimson/40"></div>
              <span className="text-gaia-crimson text-[10px] tracking-ultra uppercase font-body font-medium">
                explorar
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display tracking-tight font-light text-gaia-black-soft">
              categorías
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 4).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="relative h-64 overflow-hidden group cursor-pointer bg-gaia-cream"
              >
                {/* Gradient suave */}
                <div className="absolute inset-0 bg-gradient-overlay z-10" />
                
                {/* Contenido */}
                <div className="relative z-20 h-full flex items-end p-6">
                  <h3 className="text-gaia-bone text-lg font-display tracking-tight font-light capitalize">
                    {category.name}
                  </h3>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gaia-crimson/0 group-hover:bg-gaia-crimson/10 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="section-gaia bg-gaia-cream">
        <div className="container-gaia">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gaia-crimson/40"></div>
                <span className="text-gaia-crimson text-[10px] tracking-ultra uppercase font-body font-medium">
                  nuevos ingresos
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display tracking-tight font-light text-gaia-black-soft">
                destacados
              </h2>
            </div>
            
            <button 
              className="hidden md:flex items-center gap-2 text-xs tracking-wider uppercase font-body font-medium text-gaia-black-soft hover:text-gaia-crimson transition-colors duration-300"
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('newest');
              }}
            >
              ver todo
              <div className="h-px w-8 bg-gaia-black-soft group-hover:bg-gaia-crimson transition-colors"></div>
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                formatPrice={formatPrice}
                onProductClick={(slug) => router.push(`/shop/product/${slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FILTROS Y ORDEN */}
      <div className="sticky top-[68px] z-40 bg-gaia-bone/95 backdrop-blur-lg border-y border-gaia-border">
        <div className="container-gaia">
          <div className="flex items-center justify-between py-4 gap-4">
            
            {/* Filtros categorías */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 text-xs font-body font-medium whitespace-nowrap transition-all duration-300 uppercase tracking-wider ${
                  selectedCategory === 'all'
                    ? 'bg-gaia-black-soft text-gaia-bone'
                    : 'bg-gaia-cream text-gaia-ash hover:bg-gaia-concrete hover:text-gaia-bone'
                }`}
              >
                todos
              </button>
              
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-body font-medium whitespace-nowrap transition-all duration-300 capitalize tracking-wider ${
                    selectedCategory === cat.id
                      ? 'bg-gaia-black-soft text-gaia-bone'
                      : 'bg-gaia-cream text-gaia-ash hover:bg-gaia-concrete hover:text-gaia-bone'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Selector de orden */}
            <div className="relative flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-gaia-bone border border-gaia-border-solid px-4 py-2 pr-10 text-xs focus:outline-none focus:border-gaia-black-soft font-body font-medium cursor-pointer transition-colors duration-300 uppercase tracking-wider text-gaia-black-soft"
              >
                <option value="newest">nuevos</option>
                <option value="price-asc">precio: bajo - alto</option>
                <option value="price-desc">precio: alto - bajo</option>
              </select>
              <ChevronDown 
                size={12} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gaia-concrete pointer-events-none" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* TODOS LOS PRODUCTOS */}
      <section className="section-gaia">
        <div className="container-gaia">
          
          {/* Counter */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-xs text-gaia-ash font-body font-light">
              mostrando {paginatedProducts.length} de {filteredProducts.length} productos
            </div>
            {filteredProducts.length > 0 && selectedCategory !== 'all' && (
              <div className="text-[9px] text-gaia-ash bg-gaia-cream px-3 py-1.5 font-body font-medium uppercase tracking-ultra">
                {categories.find(c => c.id === selectedCategory)?.name}
              </div>
            )}
          </div>

          {/* Grid de productos */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {paginatedProducts.map((product, idx) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  formatPrice={formatPrice}
                  onProductClick={(slug) => router.push(`/shop/product/${slug}`)}
                  className={idx % 2 === 1 ? 'md:mt-12' : ''}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gaia-ash mb-8 font-body font-light">
                no hay productos en esta categoría
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="btn-primary"
              >
                ver todos los productos
              </button>
            </div>
          )}

          {/* Paginación */}
          {filteredProducts.length > productsPerPage && (
            <div className="mt-16">
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
// PRODUCT CARD — Refactorizado completo
// ═══════════════════════════════════════════════
interface ProductCardProps {
  product: Product;
  formatPrice: (price: number) => string;
  onProductClick: (slug: string) => void;
  className?: string;
}

function ProductCard({ product, formatPrice, onProductClick, className = '' }: ProductCardProps) {
  return (
    <div className={`product-card ${className}`} onClick={() => onProductClick(product.slug)}>
      
      {/* Imagen */}
      <div className="product-image">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge nuevo */}
        {product.isNew && (
          <div className="badge-new">nuevo</div>
        )}
        
        {/* Botón favorito */}
        <button 
          className="absolute top-4 right-4 z-10 bg-gaia-bone/80 backdrop-blur-sm p-2 rounded-full hover:bg-gaia-bone transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Agregado a favoritos:', product.id);
          }}
        >
          <Heart size={14} className="text-gaia-concrete hover:text-gaia-crimson transition-colors duration-300" />
        </button>

        {/* Overlay hover */}
        <div className="product-overlay-base">
          <button className="product-overlay-btn">
            ver prenda
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4">
        <h3 className="font-display font-light text-base mb-2 tracking-tight text-gaia-black-soft capitalize">
          {product.name}
        </h3>
        
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-display font-light text-gaia-black-soft">
            {formatPrice(product.price)}
          </p>
          {product.stock === 0 && (
            <span className="text-[9px] text-gaia-crimson font-body font-medium uppercase tracking-ultra">
              agotado
            </span>
          )}
        </div>
        
        {/* Info adicional */}
        <div className="space-y-1">
          <p className="text-[10px] text-gaia-ash font-body font-light">
            15% off en transferencia
          </p>
          {product.price > 150000 && (
            <p className="text-[10px] text-gaia-crimson font-body font-medium">
              envío gratis
            </p>
          )}
        </div>
      </div>
    </div>
  );
}