"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../../../../context/AppContext';
import { WishlistButton } from '../../../../components/ui/WishlistButton';
import { formatPrice } from '../../../../utils/formatters';
import { type Product } from '../../../../lib/types';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart, currentUser } = useAppContext();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Por favor seleccioná un talle');
      return;
    }

    setAddingToCart(true);
    try {
      addToCart(product, selectedSize);
      setSelectedSize('');
      setTimeout(() => setAddingToCart(false), 1000);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      setAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Volver a la tienda
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Imagen del Producto */}
          <div className="relative bg-white">
            <div className="sticky top-24">
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Información del Producto */}
          <div className="bg-white p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-light text-gray-900 mb-2 capitalize">
                    {product.name}
                  </h1>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </p>
                </div>
                <WishlistButton product={product} variant="icon" />
              </div>
              
              <div className="text-2xl font-light text-gray-900">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Descripción */}
            {product.description && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Selector de Talle */}
            {product.stock > 0 && product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  SELECCIONÁ TU TALLE:
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        px-6 py-3 text-sm uppercase tracking-wider border transition-all
                        ${selectedSize === size
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

            {/* Stock */}
            <div className="mb-8">
              {product.stock > 0 ? (
                <p className="text-sm text-green-600">
                  ✓ {product.stock} unidades disponibles
                </p>
              ) : (
                <p className="text-sm text-red-600">
                  Sin stock disponible
                </p>
              )}
            </div>

            {/* Botón Agregar al Carrito */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || !selectedSize || addingToCart}
              className={`
                w-full flex items-center justify-center gap-3 py-4 text-sm uppercase tracking-widest
                transition-all duration-300 mb-4
                ${product.stock === 0 || !selectedSize
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : addingToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
                }
              `}
            >
              <ShoppingBag size={20} />
              {product.stock === 0
                ? 'AGOTADO'
                : addingToCart
                ? 'AGREGADO ✓'
                : 'AGREGAR AL CARRITO'
              }
            </button>

            {/* Detalles del Producto */}
            <div className="space-y-4 pt-8 border-t border-gray-200">
              {product.material && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Material</h3>
                  <p className="text-sm text-gray-600 capitalize">{product.material}</p>
                </div>
              )}
              
              {product.care && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Cuidados</h3>
                  <p className="text-sm text-gray-600">{product.care}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Envío</h3>
                <p className="text-sm text-gray-600">
                  Envío gratis en compras mayores a $150.000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}