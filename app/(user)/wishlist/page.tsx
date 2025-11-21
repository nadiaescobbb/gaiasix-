// En tu wishlist/page.tsx - VERSIÓN CORREGIDA
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { formatPrice } from "../../../utils/formatters";
import { useAppContext } from "../../../context/AppContext";
import { WishlistButton } from "../../../components/ui/WishlistButton";
import { type Product, type WishlistItem } from "../../../lib/types";

// ===================================================
// TYPES
// ===================================================

interface SelectedSizes {
  [productId: number]: string;
}

interface AddingToCart {
  [productId: number]: boolean;
}

// Función helper para convertir WishlistItem a Product
const toProduct = (item: WishlistItem | Product): Product => {
  return item as Product;
};

// ===================================================
// WISHLIST PAGE COMPONENT
// ===================================================

export default function WishlistPage() {
  const { 
    wishlist, 
    removeFromWishlist, 
    moveToCart, 
    clearWishlist,
    currentUser
  } = useAppContext();

  const [selectedSizes, setSelectedSizes] = useState<SelectedSizes>({});
  const [addingToCart, setAddingToCart] = useState<AddingToCart>({});

  const handleSizeSelect = (productId: number, size: string): void => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleAddToCart = async (item: WishlistItem | Product): Promise<void> => {
    const product = toProduct(item);
    const selectedSize = selectedSizes[product.id];
    
    if (!selectedSize) {
      alert('Por favor seleccioná un talle');
      return;
    }

    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    
    try {
      moveToCart(product.id, selectedSize);
      
      // Reset selected size for this product
      setSelectedSizes(prev => {
        const newSizes = { ...prev };
        delete newSizes[product.id];
        return newSizes;
      });
      
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Hubo un error al agregar el producto');
    } finally {
      setTimeout(() => {
        setAddingToCart(prev => ({ ...prev, [product.id]: false }));
      }, 600);
    }
  };

  const handleClearWishlist = (): void => {
    if (window.confirm('¿Estás seguro de que querés vaciar tu lista de favoritos?')) {
      clearWishlist();
    }
  };

  // Si no hay usuario
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <Heart size={80} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-light text-gray-600 mb-4">
              Iniciá sesión para ver tus favoritos
            </h2>
            <p className="text-gray-500 mb-8">
              Guardá tus productos favoritos para comprarlos más tarde
            </p>
            <Link
              href="/login"
              className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
            >
              INICIAR SESIÓN
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Si la wishlist está vacía
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Volver al inicio</span>
            </Link>
          </div>

          <div className="text-center py-20">
            <Heart size={80} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-light text-gray-600 mb-4">
              Tu lista de favoritos está vacía
            </h2>
            <p className="text-gray-500 mb-8">
              Explorá nuestros productos y guardá tus favoritos
            </p>
            <Link
              href="/shop"
              className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
            >
              EXPLORAR PRODUCTOS
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Wishlist con productos
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
                Mis Favoritos
              </h1>
              <p className="text-gray-600">
                {wishlist.length} {wishlist.length === 1 ? 'producto' : 'productos'}
              </p>
            </div>

            {wishlist.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm"
              >
                <Trash2 size={16} />
                Vaciar lista
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item: WishlistItem | Product) => {
            const product = toProduct(item);
            return (
              <div
                key={product.id}
                className="bg-white border border-gray-200 overflow-hidden group relative flex flex-col"
              >
                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 z-10">
                  <WishlistButton
                    product={product}
                    variant="icon"
                    className="rounded-full shadow-md"
                  />
                </div>

                {/* Image */}
                <Link href={`/product/${product.slug || product.id}`} className="block">
                  <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    
                    {/* Stock Badge */}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-white text-black px-4 py-2 text-sm font-medium">
                          AGOTADO
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col">
                  <Link href={`/product/${product.slug || product.id}`} className="flex-1">
                    <h3 className="text-base font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 capitalize">
                      {product.category}
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      {formatPrice(product.price)}
                    </p>
                  </Link>

                  {/* Size Selector */}
                  {product.stock > 0 && product.sizes && product.sizes.length > 0 && (
                    <div className="mt-4">
                      <label className="text-xs text-gray-600 mb-2 block">
                        SELECCIONÁ TU TALLE:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size: string) => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(product.id, size)}
                            className={`
                              px-3 py-1.5 text-sm border transition-all
                              ${selectedSizes[product.id] === size
                                ? 'border-black bg-black text-white'
                                : 'border-gray-300 text-gray-700 hover:border-black'
                              }
                            `}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={product.stock === 0 || addingToCart[product.id]}
                    className={`
                      mt-4 w-full flex items-center justify-center gap-2 py-3 text-sm uppercase tracking-wider transition-all
                      ${product.stock === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : addingToCart[product.id]
                        ? 'bg-green-600 text-white'
                        : 'bg-black text-white hover:bg-gray-800'
                      }
                    `}
                  >
                    {product.stock === 0 ? (
                      'AGOTADO'
                    ) : addingToCart[product.id] ? (
                      <>
                        <ShoppingBag size={16} />
                        AGREGADO
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} />
                        AGREGAR AL CARRITO
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-block bg-white border border-gray-300 text-gray-900 px-8 py-3 hover:border-black transition-colors"
          >
            SEGUIR COMPRANDO
          </Link>
        </div>
      </div>
    </div>
  );
}