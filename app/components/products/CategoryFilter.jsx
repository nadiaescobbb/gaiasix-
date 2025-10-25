import React from 'react';

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-6 py-2 rounded-full font-body transition ${
            selectedCategory === cat.id 
              ? 'bg-red-700 text-white' 
              : 'bg-white border border-gray-300 hover:border-black'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}