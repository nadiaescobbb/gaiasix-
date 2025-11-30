// components/ui/ProductCard.tsx - VERSIÓN CORREGIDA
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../../lib/types';
import { formatPrice } from '../../lib/formatters';

interface ProductCardProps {
  product: Product;
  onAddToWishlist?: (product: Product) => void;
  isInWishlist?: boolean;
}

export default function ProductCard({ 
  product, 
  onAddToWishlist, 
  isInWishlist = false 
}: ProductCardProps) {
  return (
    <div className="group product-card-gaia bg-gaia-white">
      {/* Imagen del producto */}
      <div className="product-image-gaia relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay de acciones */}
        <div className="product-overlay-gaia opacity-0 group-hover:opacity-100">
          <div className="flex flex-col gap-3">
            <Link 
              href={`/shop/product/${product.slug}`}
              className="product-overlay-btn flex items-center gap-2"
            >
              <Eye size={16} />
              Ver Detalles
            </Link>
            
            {onAddToWishlist && (
              <button
                onClick={() => onAddToWishlist(product)}
                className={`product-overlay-btn flex items-center gap-2 ${
                  isInWishlist ? 'bg-gaia-crimson text-gaia-white' : ''
                }`}
              >
                <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
                {isInWishlist ? 'En Favoritos' : 'Favorito'}
              </button>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && ( // ← CAMBIAR product.new POR product.isNew
            <div className="badge-new-gaia">Nuevo</div>
          )}
          {product.stock === 0 && (
            <div className="badge-sold-gaia">Agotado</div>
          )}
        </div>
      </div>

      {/* Información del producto */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-light text-gaia-black line-clamp-2 flex-1 pr-2 font-body">
            {product.name}
          </h3>
          <p className="text-lg font-medium text-gaia-black font-body">
            {formatPrice(product.price)}
          </p>
        </div>
        
        {product.category && (
          <p className="text-xs text-gaia-silver uppercase tracking-wider mb-2 font-body">
            {product.category}
          </p>
        )}
        
        {product.description && (
          <p className="text-xs text-gaia-silver line-clamp-2 font-body">
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
}