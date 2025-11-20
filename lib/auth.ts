import { type User, type PasswordValidationResult } from './types';
// ==========================================
// MOCK FUNCTIONS PARA DESARROLLO (CLIENTE)
// ==========================================

/**
 * Mock de hashPassword para desarrollo en cliente
 */
export const hashPassword = async (password: string): Promise<string> => {
  // En producción, esto debería hacerse en el servidor
  console.warn('⚠️  Hash de contraseña en cliente - Solo para desarrollo');
  return `mock-hashed-${password}-${Date.now()}`;
};

/**
 * Mock de verifyPassword para desarrollo en cliente
 */
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  // Para desarrollo, comparación simple
  if (hashedPassword.startsWith('mock-hashed-')) {
    const originalPassword = hashedPassword.replace(/^mock-hashed-(.+)-(\d+)$/, '$1');
    return password === originalPassword;
  }
  
  // Para contraseñas en texto plano (compatibilidad)
  return password === hashedPassword;
};

/**
 * Valida fortaleza de contraseña (igual)
 */
export const validatePasswordStrength = (password: string): PasswordValidationResult => {
  if (!password || password.length < 6) {
    return { valid: false, error: 'La contraseña debe tener al menos 6 caracteres' };
  }
  
  return { valid: true };
};

/**
 * Mock de migrateUserPassword
 */
export const migrateUserPassword = async (user: User): Promise<User> => {
  // En desarrollo, no hacer migración real
  console.warn('⚠️  Migración de usuario en cliente - Solo para desarrollo');
  return user;
};