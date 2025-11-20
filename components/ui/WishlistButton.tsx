"use client";

import { useState, MouseEvent } from 'react';
import { Heart } from 'lucide-react';

// ✅ IMPORTACIONES 
import { useAppContext } from '../../context/AppContext';
import { type Product } from '../../lib/types';

// ===================================================
// TYPES
// ===================================================

interface WishlistButtonProps {
  product: Product;
  variant?: "icon" | "text" | "compact";
  className?: string;
  showLabel?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

// ===================================================
// WISHLIST BUTTON COMPONENT
// ===================================================

export function WishlistButton({ 
  product, 
  variant = "icon", 
  className = "",
  showLabel = false,
  onClick 
}: WishlistButtonProps) {
  const { 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    currentUser 
  } = useAppContext();
  
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const isProductInWishlist = isInWishlist(product.id); 

  const handleWishlistToggle = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();
    e.preventDefault();

    // Si hay un onClick personalizado, ejecutarlo
    if (onClick) {
      onClick(e);
      return;
    }

    if (!currentUser) {
      console.log('Necesitas iniciar sesión para agregar a favoritos');
      return;
    }

    setIsAnimating(true);

    try {
      if (isProductInWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    } catch (error) {
      console.error('Error al actualizar wishlist:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  // Variante icono pequeño (para cards de productos)
  if (variant === "icon") {
    return (
      <button
        onClick={handleWishlistToggle}
        disabled={!currentUser && !onClick}
        className={`
          relative p-2 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed
          ${isProductInWishlist 
            ? 'text-red-600 bg-red-50' 
            : 'text-gray-400 bg-white hover:text-red-600 hover:bg-red-50'
          }
          ${isAnimating ? 'scale-110' : 'scale-100'}
          ${className}
        `}
        aria-label={isProductInWishlist ? 'Remover de favoritos' : 'Agregar a favoritos'}
        title={!currentUser && !onClick ? 'Iniciá sesión para agregar a favoritos' : ''}
      >
        <Heart 
          size={18} 
          className={`
            transition-all duration-300
            ${isProductInWishlist ? 'fill-current' : ''}
            ${isAnimating ? 'scale-125' : 'scale-100'}
          `}
        />
        
        {/* Efecto de pulso al hacer click */}
        {isAnimating && (
          <div className="absolute inset-0 rounded bg-red-200 animate-ping opacity-60" />
        )}
      </button>
    );
  }

  // Variante botón con texto (para página de producto)
  if (variant === "text") {
    return (
      <button
        onClick={handleWishlistToggle}
        disabled={!currentUser && !onClick}
        className={`
          flex items-center gap-2 px-4 py-3 text-sm uppercase tracking-widest transition-all duration-300
          border disabled:opacity-40 disabled:cursor-not-allowed
          ${isProductInWishlist 
            ? 'border-red-600 text-red-600 bg-red-50' 
            : 'border-gray-300 text-gray-600 hover:border-red-600 hover:text-red-600'
          }
          ${isAnimating ? 'scale-105' : 'scale-100'}
          ${className}
        `}
        aria-label={isProductInWishlist ? 'Remover de favoritos' : 'Agregar a favoritos'}
      >
        <Heart 
          size={18} 
          className={`
            transition-all duration-300
            ${isProductInWishlist ? 'fill-current' : ''}
            ${isAnimating ? 'scale-110' : 'scale-100'}
          `}
        />
        {showLabel && (
          <span>
            {isProductInWishlist ? 'En favoritos' : 'Agregar a favoritos'}
          </span>
        )}
      </button>
    );
  }

  // Variante compacta (para header, etc.)
  if (variant === "compact") {
    return (
      <button
        onClick={handleWishlistToggle}
        disabled={!currentUser && !onClick}
        className={`
          relative p-2 transition-colors duration-300 disabled:opacity-40
          ${isProductInWishlist 
            ? 'text-red-600' 
            : 'text-gray-600 hover:text-red-600'
          }
          ${className}
        `}
        aria-label={isProductInWishlist ? 'Remover de favoritos' : 'Agregar a favoritos'}
      >
        <Heart 
          size={20} 
          className={`
            transition-all duration-300
            ${isProductInWishlist ? 'fill-current' : ''}
            ${isAnimating ? 'scale-110' : 'scale-100'}
          `}
        />
      </button>
    );
  }

  return null;
}

// ===================================================
// UNAUTHORIZED WISHLIST BUTTON COMPONENT
// ===================================================

interface WishlistButtonUnauthorizedProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function WishlistButtonUnauthorized({ onClick, className = "" }: WishlistButtonUnauthorizedProps) {
  return (
    <button
      onClick={onClick}
      className={`
        p-2 text-gray-400 hover:text-red-600 transition-colors duration-300
        ${className}
      `}
      aria-label="Iniciá sesión para agregar a favoritos"
      title="Iniciá sesión para agregar a favoritos"
    >
      <Heart size={18} />
    </button>
  );
}