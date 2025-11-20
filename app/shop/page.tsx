// 📄 ARCHIVO: app/shop/page.tsx - CORREGIDO

"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, Grid, List } from 'lucide-react';
import { products, categories } from '../../data/products';
import { formatPrice } from '../../utils/formatters';
import { type Product } from '../../lib/types';
import { useAppContext } from '../../context/AppContext';
import { WishlistButton } from '../../components/ui/WishlistButton';

// ===================================================
// TYPES
// ===================================================

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'price-low' | 'price-high' | 'newest';

// ===================================================
// SHOP PAGE COMPONENT
// ===================================================

export default function ShopPage({ 
  selectedCategory = 'all',
  onSelectCategory,
  onAddToCart,
  onProductSelect 
}: any) {
  const { addToCart: contextAddToCart } = useAppContext();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Usar la función del contexto si no se proporciona una prop
  const handleAddToCart = onAddToCart || contextAddToCart;

  // Filtrar productos por categoría
  const filteredProducts = useMemo((): Product[] => {
    let filtered = selectedCategory === 'all' 
      ? products.filter(p => p.active)
      : products.filter(p => p.category === selectedCategory && p.active);

    // Ordenar productos
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        // Mantener orden original (los más nuevos primero)
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  const handleProductAddToCart = (product: Product, size: string): void => {
    handleAddToCart(product, size);
  };

  const handleProductClick = (product: Product): void => {
    onProductSelect?.(product);
  };

  const handleCategorySelect = (category: string): void => {
    onSelectCategory?.(category);
  };

  return (
    <div className="py-8">
      {/* Header de la tienda */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-light mb-2">Tienda</h1>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
              {selectedCategory !== 'all' && ` en ${categories.find(c => c.id === selectedCategory)?.name}`}
            </p>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-4">
            {/* Select de ordenamiento */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
            >
              <option value="newest">Más nuevos</option>
              <option value="name">Nombre A-Z</option>
              <option value="price-low">Precio: menor a mayor</option>
              <option value="price-high">Precio: mayor a menor</option>
            </select>

            {/* Botones de vista */}
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
                aria-label="Vista de cuadrícula"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
                aria-label="Vista de lista"
              >
                <List size={16} />
              </button>
            </div>

            {/* Botón filtros móvil */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm hover:border-black transition-colors"
            >
              <Filter size={16} />
              Filtros
            </button>
          </div>
        </div>

        {/* Filtros móviles */}
        {showMobileFilters && (
          <div className="lg:hidden mb-6 p-4 bg-white border border-gray-200 rounded">
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    handleCategorySelect(category.id);
                    setShowMobileFilters(false);
                  }}
                  className={`text-sm text-left p-2 rounded transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categorías - Desktop */}
        <div className="hidden lg:flex justify-center gap-4 border-b border-gray-200 pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`text-sm uppercase tracking-widest px-4 py-2 transition-colors ${
                selectedCategory === category.id
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de productos */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">No se encontraron productos</p>
          <button
            onClick={() => handleCategorySelect('all')}
            className="border border-black text-black px-6 py-2 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-6'
          }
        `}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              onAddToCart={handleProductAddToCart}
              onProductSelect={handleProductClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ===================================================
// PRODUCT CARD COMPONENT
// ===================================================

interface ProductCardProps {
  product: Product;
  viewMode: ViewMode;
  onAddToCart: (product: Product, size: string) => void;
  onProductSelect?: (product: Product) => void;
}

function ProductCard({ product, viewMode, onAddToCart, onProductSelect }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const handleProductClick = (): void => {
    onProductSelect?.(product);
  };

  const handleAddToCartClick = (): void => {
    if (selectedSize) {
      onAddToCart(product, selectedSize);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="flex gap-4 bg-white p-4 border border-gray-200 hover:border-gray-300 transition-colors">
        <div 
          className="flex-shrink-0 cursor-pointer"
          onClick={handleProductClick}
        >
          <div className="relative w-24 h-32 bg-gray-100 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={96}
              height={128}
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div 
            className="cursor-pointer"
            onClick={handleProductClick}
          >
            <h3 className="text-sm uppercase tracking-wide text-gray-900 hover:text-gray-600 transition-colors mb-2">
              {product.name}
            </h3>
          </div>
          
          <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
          <p className="text-lg font-light mb-4">{formatPrice(product.price)}</p>

          {product.stock > 0 && (
            <div className="flex items-center gap-3">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-black"
              >
                <option value="">Seleccionar talle</option>
                {product.sizes?.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddToCartClick}
                disabled={!selectedSize}
                className="bg-black text-white px-4 py-1 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Agregar
              </button>

              <div className="ml-auto">
                <WishlistButton product={product} variant="icon" />
              </div>
            </div>
          )}

          {product.stock === 0 && (
            <span className="inline-block bg-gray-100 text-gray-400 px-3 py-1 text-xs uppercase tracking-widest">
              Agotado
            </span>
          )}
        </div>
      </div>
    );
  }

  // Vista grid (default)
  return (
    <div className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
        <div 
          className="cursor-pointer"
          onClick={handleProductClick}
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={400}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
          </div>
        </div>

        {/* Wishlist button */}
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton product={product} variant="icon" />
        </div>

        {/* Overlay con talles */}
        {product.stock > 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all flex items-end justify-center pb-4">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => onAddToCart(product, size)}
                  className="bg-white px-3 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Badge de agotado */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-white text-black px-4 py-2 text-sm uppercase tracking-widest">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div 
          className="cursor-pointer"
          onClick={handleProductClick}
        >
          <h3 className="text-sm uppercase tracking-wide text-gray-900 group-hover:text-gray-600 transition-colors mb-1">
            {product.name}
          </h3>
        </div>
        <p className="text-xs text-gray-500 mb-2 capitalize">{product.category}</p>
        <p className="text-lg font-light">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}