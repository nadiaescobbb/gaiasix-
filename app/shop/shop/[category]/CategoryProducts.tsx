"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatPrice } from '../../../../utils/formatters';
import { type Product } from '../../../../lib/types';
import { useAppContext } from '../../../../context/AppContext';
import { WishlistButton } from '../../../../components/ui/WishlistButton';

// ===================================================
// TYPES
// ===================================================

interface CategoryProductsProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  categoryId: string;
}

// ===================================================
// CATEGORY PRODUCTS COMPONENT
// ===================================================

export default function CategoryProducts({ products, viewMode, categoryId }: CategoryProductsProps) {
  const { addToCart } = useAppContext();

  const handleAddToCart = (product: Product, size: string): void => {
    addToCart(product, size);
  };

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductGridItem
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

// ===================================================
// PRODUCT GRID ITEM COMPONENT
// ===================================================

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

function ProductGridItem({ product, onAddToCart }: ProductItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </Link>

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
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm uppercase tracking-wide text-gray-900 group-hover:text-gray-600 transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-2 capitalize">{product.category}</p>
        <p className="text-lg font-light">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}

// ===================================================
// PRODUCT LIST ITEM COMPONENT
// ===================================================

function ProductListItem({ product, onAddToCart }: ProductItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <div className="flex gap-4 bg-white p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      <Link href={`/product/${product.slug}`} className="flex-shrink-0">
        <div className="relative w-24 h-32 bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm uppercase tracking-wide text-gray-900 hover:text-gray-600 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
        <p className="text-lg font-light mb-4">{formatPrice(product.price)}</p>

        {product.stock > 0 ? (
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
              onClick={() => selectedSize && onAddToCart(product, selectedSize)}
              disabled={!selectedSize}
              className="bg-black text-white px-4 py-1 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Agregar
            </button>

            <div className="ml-auto">
              <WishlistButton product={product} variant="icon" />
            </div>
          </div>
        ) : (
          <span className="inline-block bg-gray-100 text-gray-400 px-3 py-1 text-xs uppercase tracking-widest">
            Agotado
          </span>
        )}
      </div>
    </div>
  );
}