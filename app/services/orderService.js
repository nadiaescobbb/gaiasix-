export const authService = {
  /**
   * Registrar nuevo usuario
   */
  async register(userData) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await window.storage.get(`user_${userData.email}`);
      if (existingUser) {
        throw new Error('Este email ya está registrado');
      }

      // Guardar usuario
      const userWithDate = {
        ...userData,
        createdAt: new Date().toISOString()
      };
      
      await window.storage.set(`user_${userData.email}`, JSON.stringify(userWithDate));
      
      // Establecer sesión
      await window.storage.set('current_user', JSON.stringify(userWithDate));
      
      return { success: true, user: userWithDate };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Iniciar sesión
   */
  async login(email, password) {
    try {
      const result = await window.storage.get(`user_${email}`);
      
      if (!result) {
        throw new Error('Usuario no encontrado');
      }

      const userData = JSON.parse(result.value);
      
      if (userData.password !== password) {
        throw new Error('Contraseña incorrecta');
      }

      // Establecer sesión
      await window.storage.set('current_user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      await window.storage.delete('current_user');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener usuario actual
   */
  async getCurrentUser() {
    try {
      const result = await window.storage.get('current_user');
      if (result) {
        return { success: true, user: JSON.parse(result.value) };
      }
      return { success: false, user: null };
    } catch (error) {
      return { success: false, user: null };
    }
  },

  /**
   * Actualizar información de usuario
   */
  async updateUser(email, updatedData) {
    try {
      const result = await window.storage.get(`user_${email}`);
      if (!result) {
        throw new Error('Usuario no encontrado');
      }

      const userData = JSON.parse(result.value);
      const updatedUser = { ...userData, ...updatedData };
      
      await window.storage.set(`user_${email}`, JSON.stringify(updatedUser));
      await window.storage.set('current_user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};