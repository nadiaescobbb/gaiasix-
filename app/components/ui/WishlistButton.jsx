"use client";

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function WishlistButton({ 
  product, 
  variant = "icon", 
  className = "",
  showLabel = false 
}) {
  const { 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist: checkIsInWishlist, 
    currentUser 
  } = useAppContext();
  
  const [isAnimating, setIsAnimating] = useState(false);
  const isProductInWishlist = checkIsInWishlist(product.id); 

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!currentUser) {
      // Podríamos mostrar un toast aquí luego
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
        disabled={!currentUser}
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
        title={!currentUser ? 'Iniciá sesión para agregar a favoritos' : ''}
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
        disabled={!currentUser}
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
        disabled={!currentUser}
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

// Componente de estado para cuando no hay usuario
export function WishlistButtonUnauthorized({ onClick, className = "" }) {
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