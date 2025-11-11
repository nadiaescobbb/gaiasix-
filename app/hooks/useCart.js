"use client";

import { useLocalStorage } from './uselocalStorage';

export function useCart() {
  const [cart, setCart] = useLocalStorage('gaia-cart', []);

  const addToCart = (product, size) => {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, size, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCart(cart.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size);
    } else {
      setCart(cart.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const clearCart = () => setCart([]);

  // Calcular total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Contar items
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return {
    cart,
    cartTotal,
    cartItemsCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
}