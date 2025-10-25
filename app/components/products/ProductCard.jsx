import React from 'react';
import { formatPrice } from '../../utils/formatters';

export default function ProductCard({ product, onViewProduct, onAddToCart }) {
  return (
    <div className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
      <div 
        className="relative aspect-square overflow-hidden"
        onClick={() => onViewProduct(product)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-body font-semibold mb-1">{product.name}</h3>
        <p className="font-body text-gray-600 mb-3">{formatPrice(product.price)}</p>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-black text-white py-2 rounded font-body hover:bg-gray-800 transition"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}