"use client";

import { useLocalStorage } from './uselocalStorage';

export function useAuth() {
  const [currentUser, setCurrentUser] = useLocalStorage('gaia-current-user', null);
  const [users, setUsers] = useLocalStorage('gaia-users', []);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, error: 'Credenciales incorrectas' };
  };

  const register = (userData) => {
    // Verificar si el email ya existe
    const emailExists = users.some(u => u.email === userData.email);
    if (emailExists) {
      return { success: false, error: 'El email ya está registrado' };
    }

    const newUser = { 
      ...userData, 
      id: Date.now(),
      orders: [],
      createdAt: new Date().toISOString()
    };
    
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserOrders = (orderId, orderData) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      orders: [...(currentUser.orders || []), { id: orderId, ...orderData }]
    };

    // Actualizar en la lista de usuarios
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    // Actualizar usuario actual
    setCurrentUser(updatedUser);
  };

  return { 
    currentUser, 
    login, 
    register, 
    logout,
    updateUserOrders
  };
}