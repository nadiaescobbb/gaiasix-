// utils/stockValidation.ts - CORREGIDO

import { Product } from '../lib/types';

/**
 * Verifica si un producto tiene stock disponible
 * @param {Product} product - Producto a verificar
 * @returns {boolean}
 */
export const hasStock = (product: Product | null | undefined): boolean => {
  if (!product) return false;

  // Si stock no está definido, asumimos sin stock
  if (product.stock === undefined || product.stock === null) {
    return false;
  }

  return product.stock > 0;
};

/**
 * Obtiene el stock disponible de un producto
 * @param {Product} product - Producto a verificar
 * @returns {number}
 */
export const getAvailableStock = (product: Product | null | undefined): number => {
  if (!product) return 0;
  
  return product.stock || 0;
};

/**
 * Verifica si hay suficiente stock para una cantidad específica
 * @param {Product} product - Producto a verificar
 * @param {number} quantity - Cantidad deseada
 * @returns {boolean}
 */
export const hasEnoughStock = (product: Product | null | undefined, quantity: number): boolean => {
  if (!product || quantity <= 0) return false;
  
  const availableStock = getAvailableStock(product);
  return availableStock >= quantity;
};

/**
 * Reduce el stock de un producto
 * @param {Product} product - Producto a actualizar
 * @param {number} quantity - Cantidad a reducir
 * @returns {Product} - Producto con stock actualizado
 */
export const reduceStock = (product: Product, quantity: number): Product => {
  if (!hasEnoughStock(product, quantity)) {
    throw new Error(`Stock insuficiente para ${product.name}. Stock disponible: ${product.stock}, solicitado: ${quantity}`);
  }
  
  return {
    ...product,
    stock: product.stock - quantity
  };
};