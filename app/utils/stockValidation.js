// ============================================
// VALIDADORES
// ============================================

/**
 * Verifica si un producto tiene stock disponible
 * @param {Object} product - Producto a validar
 * @returns {boolean}
 */
export const hasStock = (product) => {
  if (!product) return false;
  
  // Si stock no está definido, asumimos sin stock
  if (product.stock === undefined || product.stock === null) {
    return false;
  }
  
  return product.stock > 0;
};

/**
 * Obtiene el stock disponible de un producto
 * @param {Object} product - Producto
 * @returns {number} - Stock disponible (0 si no definido)
 */
export const getAvailableStock = (product) => {
  if (!product) return 0;
  
  const stock = parseInt(product.stock);
  
  if (isNaN(stock) || stock < 0) {
    console.warn(`⚠️ Stock inválido para producto ${product.name}:`, product.stock);
    return 0;
  }
  
  return stock;
};

/**
 * Verifica si se puede agregar una cantidad específica
 * @param {Object} product - Producto
 * @param {number} requestedQuantity - Cantidad deseada
 * @param {number} currentCartQuantity - Cantidad ya en carrito (opcional)
 * @returns {Object} { canAdd: boolean, available: number, message: string }
 */
export const canAddToCart = (product, requestedQuantity = 1, currentCartQuantity = 0) => {
  if (!product) {
    return {
      canAdd: false,
      available: 0,
      message: 'Producto no encontrado'
    };
  }

  const availableStock = getAvailableStock(product);
  
  if (availableStock === 0) {
    return {
      canAdd: false,
      available: 0,
      message: 'Producto agotado'
    };
  }

  const totalRequested = requestedQuantity + currentCartQuantity;
  
  if (totalRequested > availableStock) {
    return {
      canAdd: false,
      available: availableStock - currentCartQuantity,
      message: `Solo quedan ${availableStock} unidades disponibles`
    };
  }

  return {
    canAdd: true,
    available: availableStock - totalRequested,
    message: 'Disponible'
  };
};

/**
 * Valida si una talla está disponible para un producto
 * @param {Object} product - Producto
 * @param {string} size - Talla a validar
 * @returns {boolean}
 */
export const isSizeAvailable = (product, size) => {
  if (!product || !size) return false;
  
  // Verificar que el producto tenga tallas
  if (!product.sizes || !Array.isArray(product.sizes)) {
    return false;
  }
  
  // Verificar que la talla exista
  const sizeExists = product.sizes
    .map(s => s.toString().toUpperCase())
    .includes(size.toString().toUpperCase());
  
  if (!sizeExists) {
    return false;
  }
  
  // Verificar stock
  return hasStock(product);
};

// ============================================
// HELPERS PARA CARRITO
// ============================================

/**
 * Calcula el stock restante después de agregar al carrito
 * @param {Object} product - Producto
 * @param {Array} cart - Carrito actual
 * @returns {number} - Stock disponible
 */
export const getStockAfterCart = (product, cart) => {
  if (!product || !cart) return 0;
  
  const totalInCart = cart
    .filter(item => item.id === product.id)
    .reduce((sum, item) => sum + (item.quantity || 0), 0);
  
  const availableStock = getAvailableStock(product);
  
  return Math.max(0, availableStock - totalInCart);
};

/**
 * Obtiene la cantidad de un producto en el carrito
 * @param {number} productId - ID del producto
 * @param {string} size - Talla
 * @param {Array} cart - Carrito
 * @returns {number}
 */
export const getCartQuantity = (productId, size, cart) => {
  if (!cart || !Array.isArray(cart)) return 0;
  
  const item = cart.find(
    item => item.id === productId && item.size === size
  );
  
  return item ? (item.quantity || 0) : 0;
};

/**
 * Valida todo el carrito contra el stock disponible
 * @param {Array} cart - Carrito
 * @param {Array} products - Lista de productos
 * @returns {Array} - Array de errores (vacío si todo OK)
 */
export const validateCartStock = (cart, products) => {
  if (!cart || !Array.isArray(cart)) return [];
  if (!products || !Array.isArray(products)) return [];
  
  const errors = [];
  
  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
    
    if (!product) {
      errors.push({
        productId: cartItem.id,
        productName: cartItem.name || 'Desconocido',
        error: 'Producto no encontrado',
        severity: 'critical'
      });
      return;
    }
    
    const availableStock = getAvailableStock(product);
    
    if (availableStock === 0) {
      errors.push({
        productId: product.id,
        productName: product.name,
        error: 'Producto agotado',
        severity: 'critical'
      });
      return;
    }
    
    if (cartItem.quantity > availableStock) {
      errors.push({
        productId: product.id,
        productName: product.name,
        error: `Solo hay ${availableStock} unidades disponibles`,
        requestedQuantity: cartItem.quantity,
        availableStock: availableStock,
        severity: 'warning'
      });
    }
  });
  
  return errors;
};

// ============================================
// MENSAJES DE STOCK
// ============================================

/**
 * Genera mensaje amigable sobre disponibilidad
 * @param {Object} product - Producto
 * @returns {string}
 */
export const getStockMessage = (product) => {
  const stock = getAvailableStock(product);
  
  if (stock === 0) {
    return 'Agotado';
  }
  
  if (stock === 1) {
    return '¡Última unidad!';
  }
  
  if (stock <= 3) {
    return `Solo quedan ${stock} unidades`;
  }
  
  if (stock <= 10) {
    return 'Pocas unidades disponibles';
  }
  
  return 'Disponible';
};

/**
 * Obtiene el color del badge según stock
 * @param {Object} product - Producto
 * @returns {string} - Clase de Tailwind
 */
export const getStockBadgeColor = (product) => {
  const stock = getAvailableStock(product);
  
  if (stock === 0) {
    return 'bg-gray-100 text-gray-600'; // Agotado
  }
  
  if (stock <= 3) {
    return 'bg-red-50 text-red-600'; // Crítico
  }
  
  if (stock <= 10) {
    return 'bg-amber-50 text-amber-600'; // Advertencia
  }
  
  return 'bg-green-50 text-green-600'; // Disponible
};

// ============================================
// VALIDACIÓN EN CONTEXTO
// ============================================

/**
 * Hook de validación para usar en componentes
 * @param {Object} product - Producto
 * @param {string} size - Talla seleccionada
 * @param {Array} cart - Carrito actual
 * @returns {Object} - Estado de validación
 */
export const useStockValidation = (product, size, cart) => {
  if (!product) {
    return {
      isValid: false,
      canAdd: false,
      message: 'Producto no encontrado',
      availableStock: 0
    };
  }

  const currentQuantity = size ? getCartQuantity(product.id, size, cart) : 0;
  const validation = canAddToCart(product, 1, currentQuantity);
  const sizeValid = size ? isSizeAvailable(product, size) : false;

  return {
    isValid: validation.canAdd && sizeValid,
    canAdd: validation.canAdd,
    isSizeValid: sizeValid,
    message: validation.message,
    availableStock: validation.available,
    stockMessage: getStockMessage(product),
    badgeColor: getStockBadgeColor(product)
  };
};

// ============================================
// EXPORT DEFAULT
// ============================================

export default {
  hasStock,
  getAvailableStock,
  canAddToCart,
  isSizeAvailable,
  getStockAfterCart,
  getCartQuantity,
  validateCartStock,
  getStockMessage,
  getStockBadgeColor,
  useStockValidation
};