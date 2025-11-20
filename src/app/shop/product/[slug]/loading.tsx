// ===================================================
// PRODUCT LOADING COMPONENT
// ===================================================

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Back Button Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      {/* Product Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* LEFT: Images Skeleton */}
          <div className="space-y-4">
            {/* Main Image Skeleton */}
            <div className="relative aspect-[3/4] bg-gray-200 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            </div>

            {/* Thumbnail Gallery Skeleton */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index}
                  className="aspect-square bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info Skeleton */}
          <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>

            {/* Description Skeleton */}
            <div className="border-t border-gray-200 pt-6 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>

            {/* Size Selector Skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="flex gap-3">
                {[...Array(3)].map((_, index) => (
                  <div 
                    key={index}
                    className="w-16 h-12 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Add to Cart Button Skeleton */}
            <div className="flex gap-3">
              <div className="flex-1 h-12 bg-gray-200 rounded"></div>
              <div className="w-12 h-12 bg-gray-200 rounded"></div>
            </div>

            {/* Product Details Skeleton */}
            <div className="border-t border-gray-200 pt-8 space-y-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Colors Skeleton */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="h-3 bg-gray-200 rounded w-32"></div>
              <div className="flex gap-2">
                {[...Array(2)].map((_, index) => (
                  <div 
                    key={index}
                    className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================================
// MINIMAL PRODUCT LOADING (Alternative)
// ===================================================

export function ProductLoadingMinimal() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando producto...</p>
      </div>
    </div>
  );
}

// ===================================================
// PRODUCT IMAGE LOADING
// ===================================================

export function ProductImageLoading() {
  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] bg-gray-200 rounded-lg animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index}
            className="aspect-square bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

// ===================================================
// PRODUCT INFO LOADING
// ===================================================

export function ProductInfoLoading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="flex gap-3">
          {[...Array(4)].map((_, index) => (
            <div 
              key={index}
              className="w-12 h-10 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}