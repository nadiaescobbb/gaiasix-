"use client";

import { useState, useEffect } from 'react';

/**
 * Hook para persistir estado en localStorage
 * @param {string} key - Clave del localStorage
 * @param {*} initialValue - Valor inicial
 */
export function useLocalStorage(key, initialValue) {
  // Estado que sincroniza con localStorage
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el estado y localStorage
  const setValue = (value) => {
    try {
      // Permite que value sea una función como en useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}