"use client";

import Image from 'next/image';
import { useState } from 'react';

// ✅ IMPORTACIONES
import { type Product } from '../../lib/types';

// ==========================================
// TYPES
// ==========================================

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'black' | 'white' | 'red';
}

interface PageLoaderProps {
  message?: string;
}

interface ProductCardWithLoadingProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  imageLoading: boolean;
  setImageLoading: (loading: boolean) => void;
}

// ==========================================
// SKELETON COMPONENTS
// ==========================================

export function Skeleton({ className = '', variant = 'default' }: SkeletonProps) {
  const variants = {
    default: 'bg-gray-200',
    light: 'bg-gray-100',
    dark: 'bg-gray-300'
  };

  return (
    <div 
      className={`animate-pulse ${variants[variant]} rounded ${className}`}
      aria-label="Cargando..."
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="group">
      <Skeleton className="aspect-[3/4] mb-3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function CategoryFilterSkeleton() {
  return (
    <div className="flex justify-center gap-4 mb-16">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-8 w-24" />
      ))}
    </div>
  );
}

// ==========================================
// SPINNER COMPONENTS
// ==========================================

export function Spinner({ size = 'md', color = 'black' }: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4',
  };

  const colorClasses = {
    black: 'border-gray-200 border-t-black',
    white: 'border-gray-700 border-t-white',
    red: 'border-gray-200 border-t-red-800',
  };

  return (
    <div 
      className={`${sizes[size]} ${colorClasses[color]} rounded-full animate-spin`}
      role="status"
      aria-label="Cargando"
    />
  );
}

// ==========================================
// FULL PAGE LOADING
// ==========================================

export function PageLoader({ message = 'Cargando...' }: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}

// ==========================================
// PRODUCT CARD WITH LOADING IMAGE
// ==========================================

export function ProductCardWithLoading({ 
  product, 
  onAddToCart, 
  imageLoading, 
  setImageLoading 
}: ProductCardWithLoadingProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-3">
        {imageLoading && (
          <Skeleton className="absolute inset-0" />
        )}
        
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover group-hover:scale-105 transition-transform duration-700 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading && setImageLoading(false)}
          quality={85}
        />
        
        {/* Overlay con botones de talla */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            {product.sizes?.map((size: string) => (
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
      
      <div className="flex justify-between items-center text-sm">
        <h3 className="uppercase tracking-wide">{product.name}</h3>
        <span>${product.price?.toLocaleString('es-AR')}</span>
      </div>
    </div>
  );
}

// ==========================================
// CUSTOM HOOK FOR IMAGE LOADING
// ==========================================

export function useImageLoading() {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const handleImageLoad = (): void => {
    setImageLoading(false);
  };

  return {
    imageLoading,
    setImageLoading,
    handleImageLoad
  };
}