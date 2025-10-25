import React from 'react';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductCard from '../components/products/ProductCard';

export default function Shop({ 
  products, 
  categories,
  selectedCategory,
  onSelectCategory,
  onViewProduct, 
  onAddToCart 
}) {
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl font-bold mb-8">Nuestra Colección</h1>
      
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onViewProduct={onViewProduct}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="font-body text-gray-500 text-lg">
            No se encontraron productos en esta categoría
          </p>
        </div>
      )}
    </section>
  );
}