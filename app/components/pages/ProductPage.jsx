"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart, Package, Truck, RefreshCw } from 'lucide-react';
import { formatPrice } from "@/utils/formatters";
import WishlistButton from '../ui/WishlistButton';

export default function ProductPage({ product, onAddToCart, onBack }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Prenda no encontrada
          </p>
          <button
            onClick={onBack}
            className="mt-6 border border-gray-300 text-gray-600 px-8 py-3 text-xs uppercase tracking-widest hover:border-black hover:text-black transition-all duration-300"
          >
            Volver a prendas
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const currentImage = images[selectedImageIndex];
  const isOutOfStock = !product.stock || product.stock <= 0;

  const handleAddToCart = async () => {
    if (!selectedSize) return;
    
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onAddToCart(product, selectedSize);
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button - ACTUALIZADO */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm"
        >
          <ArrowLeft size={18} />
          <span className="uppercase tracking-widest">Volver a prendas</span>
        </button>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* LEFT: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                quality={90}
                priority
              />
              
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
              )}

              {/* Sin stock - ACTUALIZADO */}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                  <span className="text-gray-400 text-sm uppercase tracking-widest">
                    No disponible
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setImageLoaded(false);
                    }}
                    className={`relative aspect-square bg-gray-50 overflow-hidden transition-all ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-black'
                        : 'hover:ring-1 hover:ring-gray-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - Vista ${index + 1}`}
                      fill
                      sizes="25vw"
                      className="object-cover"
                      quality={60}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div className="space-y-8">
            {/* Header con Wishlist */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-light mb-3 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-2xl font-light text-gray-900">
                  {formatPrice(product.price)}
                </p>
              </div>
              
              <WishlistButton 
                product={product}
                variant="compact"
                className="mt-1"
              />
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-600 leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>
            )}

            {/* Size Selector - ACTUALIZADO */}
            {!isOutOfStock && product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Elegí tu talla
                </label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 text-sm uppercase tracking-widest transition-all border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button + Wishlist - ACTUALIZADO */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || !selectedSize || isAdding}
                className={`flex-1 py-4 text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  isOutOfStock || !selectedSize || isAdding
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                <ShoppingCart size={18} />
                {isAdding ? 'Agregando...' : isOutOfStock ? 'No disponible' : 'Agregar a tu bolsa'}
              </button>
              
              <WishlistButton 
                product={product}
                variant="text"
                showLabel={false}
                className="border border-gray-300 hover:border-red-600 hover:text-red-600 px-4"
              />
            </div>

            {/* Size Error - ACTUALIZADO */}
            {!selectedSize && !isOutOfStock && (
              <p className="text-xs text-gray-400 text-center -mt-4">
                Elegí una talla para continuar
              </p>
            )}

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-8 space-y-6">
              {/* Material */}
              {product.material && (
                <div className="flex items-start gap-3">
                  <Package size={18} className="text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      Material
                    </p>
                    <p className="text-sm text-gray-700">{product.material}</p>
                  </div>
                </div>
              )}

              {/* Care Instructions */}
              {product.care && (
                <div className="flex items-start gap-3">
                  <RefreshCw size={18} className="text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      Cuidados
                    </p>
                    <p className="text-sm text-gray-700">{product.care}</p>
                  </div>
                </div>
              )}

              {/* Shipping */}
              <div className="flex items-start gap-3">
                <Truck size={18} className="text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                    Envío
                  </p>
                  <p className="text-sm text-gray-700">
                    Envío incluido en 24-48hs a todo el país
                  </p>
                </div>
              </div>
            </div>

            {/* Stock Info */}
            {!isOutOfStock && product.stock && product.stock < 5 && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded">
                <p className="text-xs text-amber-800">
                  ⚠️ ¡Últimas {product.stock} unidades disponibles!
                </p>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                  Colores disponibles
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className="text-sm text-gray-600 px-3 py-1 border border-gray-200 rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}