// ===================================================
// SHOP LOADING COMPONENT
// ===================================================

export default function ShopLoading() {
  return (
    <div className="py-8 animate-pulse">
      {/* Header loading */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Controles loading */}
          <div className="flex items-center gap-4">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="flex border border-gray-200 rounded overflow-hidden">
              <div className="w-10 h-10 bg-gray-200"></div>
              <div className="w-10 h-10 bg-gray-100"></div>
            </div>
            <div className="lg:hidden h-10 bg-gray-200 rounded w-24"></div>
          </div>
        </div>

        {/* Categorías loading - Desktop */}
        <div className="hidden lg:flex justify-center gap-4 border-b border-gray-200 pb-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded w-24"></div>
          ))}
        </div>
      </div>

      {/* Grid de productos loading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// ===================================================
// PRODUCT CARD SKELETON COMPONENT
// ===================================================

function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200">
      {/* Image skeleton */}
      <div className="relative overflow-hidden bg-gray-200 aspect-[3/4]">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
}

// ===================================================
// ALTERNATIVE LOADING - LIST VIEW
// ===================================================

export function ShopLoadingList() {
  return (
    <div className="py-8 animate-pulse">
      {/* Header loading */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      {/* List view loading */}
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <ProductListSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <div className="flex gap-4 bg-white p-4 border border-gray-200">
      {/* Image skeleton */}
      <div className="flex-shrink-0">
        <div className="w-24 h-32 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Content skeleton */}
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded w-20"></div>
        
        {/* Controls skeleton */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="ml-auto w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

// ===================================================
// MINIMAL LOADING FOR CATEGORY FILTERS
// ===================================================

export function CategoryFiltersLoading() {
  return (
    <div className="flex justify-center gap-4 mb-8 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-10 bg-gray-200 rounded w-28"></div>
      ))}
    </div>
  );
}

// ===================================================
// PRODUCT GRID LOADING ONLY
// ===================================================

export function ProductGridLoading({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ===================================================
// SIDEBAR LOADING
// ===================================================

export function ShopSidebarLoading() {
  return (
    <div className="hidden lg:block w-64 flex-shrink-0 py-8 space-y-6 animate-pulse">
      {/* Categories loading */}
      <div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>

      {/* Filters loading */}
      <div className="pt-6 border-t border-gray-200">
        <div className="h-4 bg-gray-200 rounded w-16 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}