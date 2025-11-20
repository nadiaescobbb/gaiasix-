import bcrypt from 'bcryptjs';
import { type User, type PasswordValidationResult } from './types';

const SALT_ROUNDS = 12;

export interface PasswordValidationResult {
  valid: boolean;
  error?: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  orders?: any[];
  createdAt: string;
}

/**
 * Hashea una contraseña usando bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Error al crear la contraseña');
  }
};

/**
 * Verifica una contraseña contra su hash
 */
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    if (!hashedPassword || !password) return false;
    
    // Si la contraseña no está hasheada (usuarios antiguos), hacer migración on-the-fly
    if (!hashedPassword.startsWith('$2a$') && !hashedPassword.startsWith('$2b$')) {
      return password === hashedPassword; // Compatibilidad temporal
    }
    
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
};

/**
 * Valida fortaleza de contraseña
 */
export const validatePasswordStrength = (password: string): PasswordValidationResult => {
  if (!password || password.length < 6) {
    return { valid: false, error: 'La contraseña debe tener al menos 6 caracteres' };
  }
  
  return { valid: true };
};

/**
 * Migra un usuario de texto plano a contraseña hasheada
 */
export const migrateUserPassword = async (user: User): Promise<User> => {
  try {
    // Si ya está hasheado, no hacer nada
    if (user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'))) {
      return user;
    }
    
    // Hashear contraseña en texto plano
    const hashedPassword = await hashPassword(user.password);
    return { ...user, password: hashedPassword };
  } catch (error) {
    console.error('Error migrating user password:', error);
    return user; // Devolver usuario sin cambios en caso de error
  }
};