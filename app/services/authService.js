/**
 * Auth Service - Sistema de Autenticación
 * Usa window.storage API para persistencia de datos
 */

export const authService = {
  /**
   * Registrar nuevo usuario
   * @param {Object} userData - Datos del usuario { name, email, password, phone }
   * @returns {Promise<Object>} { success: boolean, user?: Object, error?: string }
   */
  async register(userData) {
    try {
      // Validar datos básicos
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('Faltan datos requeridos');
      }

      // Verificar si el usuario ya existe
      try {
        const existingUser = await window.storage.get(`user_${userData.email}`);
        if (existingUser) {
          throw new Error('Este email ya está registrado');
        }
      } catch (error) {
        // Si el error es porque no existe la key, continuamos
        if (!error.message.includes('Key not found')) {
          throw error;
        }
      }

      // Crear nuevo usuario con timestamp
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password, // ⚠️ 
        phone: userData.phone || '',
        address: userData.address || '',
        createdAt: new Date().toISOString(),
        orders: []
      };

      // Guardar usuario en storage
      const saveResult = await window.storage.set(
        `user_${userData.email}`,
        JSON.stringify(newUser)
      );

      if (!saveResult) {
        throw new Error('Error al guardar usuario');
      }

      // Establecer sesión actual
      const sessionResult = await window.storage.set(
        'current_user',
        JSON.stringify(newUser)
      );

      if (!sessionResult) {
        throw new Error('Error al crear sesión');
      }

      console.log('✅ Usuario registrado:', newUser.email);
      return { success: true, user: newUser };

    } catch (error) {
      console.error('❌ Error en register:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Iniciar sesión
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>} { success: boolean, user?: Object, error?: string }
   */
  async login(email, password) {
    try {
      // Validar inputs
      if (!email || !password) {
        throw new Error('Email y contraseña son requeridos');
      }

      // Buscar usuario
      let userData;
      try {
        const result = await window.storage.get(`user_${email}`);
        if (!result || !result.value) {
          throw new Error('Usuario no encontrado');
        }
        userData = JSON.parse(result.value);
      } catch (error) {
        if (error.message.includes('Key not found')) {
          throw new Error('Usuario no encontrado');
        }
        throw error;
      }

      // Verificar contraseña
      if (userData.password !== password) {
        throw new Error('Contraseña incorrecta');
      }

      // Establecer sesión
      const sessionResult = await window.storage.set(
        'current_user',
        JSON.stringify(userData)
      );

      if (!sessionResult) {
        throw new Error('Error al crear sesión');
      }

      console.log('✅ Login exitoso:', userData.email);
      return { success: true, user: userData };

    } catch (error) {
      console.error('❌ Error en login:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Cerrar sesión
   * @returns {Promise<Object>} { success: boolean }
   */
  async logout() {
    try {
      await window.storage.delete('current_user');
      console.log('✅ Sesión cerrada');
      return { success: true };
    } catch (error) {
      console.error('❌ Error en logout:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener usuario actual de la sesión
   * @returns {Promise<Object>} { success: boolean, user?: Object }
   */
  async getCurrentUser() {
    try {
      const result = await window.storage.get('current_user');
      
      if (!result || !result.value) {
        return { success: false, user: null };
      }

      const user = JSON.parse(result.value);
      console.log('✅ Usuario actual:', user.email);
      return { success: true, user };

    } catch (error) {
      // Si la key no existe, no es un error crítico
      if (error.message.includes('Key not found')) {
        console.log('ℹ️ No hay sesión activa');
        return { success: false, user: null };
      }
      
      console.error('❌ Error al obtener usuario:', error.message);
      return { success: false, user: null };
    }
  },

  /**
   * Actualizar información del usuario
   * @param {string} email - Email del usuario a actualizar
   * @param {Object} updatedData - Datos a actualizar
   * @returns {Promise<Object>} { success: boolean, user?: Object, error?: string }
   */
  async updateUser(email, updatedData) {
    try {
      // Obtener usuario actual
      let userData;
      try {
        const result = await window.storage.get(`user_${email}`);
        if (!result || !result.value) {
          throw new Error('Usuario no encontrado');
        }
        userData = JSON.parse(result.value);
      } catch (error) {
        if (error.message.includes('Key not found')) {
          throw new Error('Usuario no encontrado');
        }
        throw error;
      }

      // Actualizar datos (mantener id, email, createdAt)
      const updatedUser = {
        ...userData,
        ...updatedData,
        id: userData.id, // No cambiar
        email: userData.email, // No cambiar
        createdAt: userData.createdAt, // No cambiar
        updatedAt: new Date().toISOString()
      };

      // Guardar usuario actualizado
      const saveResult = await window.storage.set(
        `user_${email}`,
        JSON.stringify(updatedUser)
      );

      if (!saveResult) {
        throw new Error('Error al actualizar usuario');
      }

      // Actualizar sesión si es el usuario actual
      const currentSession = await window.storage.get('current_user');
      if (currentSession && currentSession.value) {
        const currentUser = JSON.parse(currentSession.value);
        if (currentUser.email === email) {
          await window.storage.set('current_user', JSON.stringify(updatedUser));
        }
      }

      console.log('✅ Usuario actualizado:', email);
      return { success: true, user: updatedUser };

    } catch (error) {
      console.error('❌ Error al actualizar usuario:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Verificar si un email ya está registrado
   * @param {string} email 
   * @returns {Promise<boolean>}
   */
  async emailExists(email) {
    try {
      const result = await window.storage.get(`user_${email}`);
      return !!result;
    } catch (error) {
      return false;
    }
  },

  /**
   * Cambiar contraseña
   * @param {string} email 
   * @param {string} oldPassword 
   * @param {string} newPassword 
   * @returns {Promise<Object>} { success: boolean, error?: string }
   */
  async changePassword(email, oldPassword, newPassword) {
    try {
      // Obtener usuario
      let userData;
      try {
        const result = await window.storage.get(`user_${email}`);
        if (!result || !result.value) {
          throw new Error('Usuario no encontrado');
        }
        userData = JSON.parse(result.value);
      } catch (error) {
        if (error.message.includes('Key not found')) {
          throw new Error('Usuario no encontrado');
        }
        throw error;
      }

      // Verificar contraseña actual
      if (userData.password !== oldPassword) {
        throw new Error('Contraseña actual incorrecta');
      }

      // Validar nueva contraseña
      if (newPassword.length < 6) {
        throw new Error('La nueva contraseña debe tener al menos 6 caracteres');
      }

      // Actualizar contraseña
      userData.password = newPassword;
      userData.updatedAt = new Date().toISOString();

      const saveResult = await window.storage.set(
        `user_${email}`,
        JSON.stringify(userData)
      );

      if (!saveResult) {
        throw new Error('Error al cambiar contraseña');
      }

      console.log('✅ Contraseña cambiada:', email);
      return { success: true };

    } catch (error) {
      console.error('❌ Error al cambiar contraseña:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Eliminar cuenta de usuario (soft delete)
   * @param {string} email 
   * @returns {Promise<Object>} { success: boolean, error?: string }
   */
  async deleteAccount(email) {
    try {
      // Obtener usuario
      let userData;
      try {
        const result = await window.storage.get(`user_${email}`);
        if (!result || !result.value) {
          throw new Error('Usuario no encontrado');
        }
        userData = JSON.parse(result.value);
      } catch (error) {
        if (error.message.includes('Key not found')) {
          throw new Error('Usuario no encontrado');
        }
        throw error;
      }

      // Marcar como eliminado (soft delete)
      userData.deleted = true;
      userData.deletedAt = new Date().toISOString();

      await window.storage.set(`user_${email}`, JSON.stringify(userData));

      // Cerrar sesión
      await this.logout();

      console.log('✅ Cuenta eliminada:', email);
      return { success: true };

    } catch (error) {
      console.error('❌ Error al eliminar cuenta:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener todos los usuarios (admin only)
   * @returns {Promise<Array>}
   */
  async getAllUsers() {
    try {
      const result = await window.storage.list('user_');
      
      if (!result || !result.keys) {
        return [];
      }

      const users = [];
      for (const key of result.keys) {
        try {
          const userResult = await window.storage.get(key);
          if (userResult && userResult.value) {
            const user = JSON.parse(userResult.value);
            // No incluir usuarios eliminados
            if (!user.deleted) {
              // No incluir la contraseña en la respuesta
              const { password, ...userWithoutPassword } = user;
              users.push(userWithoutPassword);
            }
          }
        } catch (error) {
          console.error(`Error al cargar usuario ${key}:`, error);
        }
      }

      return users;

    } catch (error) {
      console.error('❌ Error al obtener usuarios:', error.message);
      return [];
    }
  }
};

/**
 * Hook personalizado para usar en React
 * Ejemplo de uso:
 * 
 * import { useAuth } from './services/authService';
 * 
 * function MyComponent() {
 *   const { user, loading, login, logout } = useAuth();
 *   
 *   if (loading) return <div>Cargando...</div>;
 *   
 *   return (
 *     <div>
 *       {user ? (
 *         <button onClick={logout}>Cerrar sesión</button>
 *       ) : (
 *         <button onClick={() => login(email, password)}>Iniciar sesión</button>
 *       )}
 *     </div>
 *   );
 * }
 */
export const useAuth = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const result = await authService.getCurrentUser();
      if (result.success) {
        setUser(result.user);
      }
      setLoading(false);
    };
    
    loadUser();
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const register = async (userData) => {
    const result = await authService.register(userData);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const logout = async () => {
    const result = await authService.logout();
    if (result.success) {
      setUser(null);
    }
    return result;
  };

  const updateUser = async (updatedData) => {
    if (!user) return { success: false, error: 'No hay usuario en sesión' };
    
    const result = await authService.updateUser(user.email, updatedData);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser
  };
};

export default authService;