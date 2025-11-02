/**
 * Order Service - Sistema de Gestión de Pedidos
 * Usa window.storage API para persistencia de datos
 */

export const orderService = {
  /**
   * Crear nuevo pedido
   * @param {string} userId - ID del usuario
   * @param {Array} cart - Items del carrito
   * @param {number} total - Total del pedido
   * @param {Object} shippingInfo - Información de envío (opcional)
   * @returns {Promise<Object>} { success: boolean, order?: Object, error?: string }
   */
  async createOrder(userId, cart, total, shippingInfo = {}) {
    try {
      // Validar datos
      if (!userId || !cart || cart.length === 0 || !total) {
        throw new Error('Datos de pedido incompletos');
      }

      // Crear pedido
      const order = {
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: item.image
        })),
        total,
        shippingInfo: {
          name: shippingInfo.name || '',
          address: shippingInfo.address || '',
          city: shippingInfo.city || '',
          province: shippingInfo.province || '',
          postalCode: shippingInfo.postalCode || '',
          phone: shippingInfo.phone || ''
        },
        status: 'pending', // pending, confirmed, shipped, delivered, cancelled
        paymentStatus: 'pending', // pending, paid, failed, refunded
        paymentMethod: shippingInfo.paymentMethod || 'transfer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Guardar pedido
      const saveResult = await window.storage.set(
        order.id,
        JSON.stringify(order)
      );

      if (!saveResult) {
        throw new Error('Error al guardar pedido');
      }

      // Actualizar lista de pedidos del usuario
      await this._addOrderToUserList(userId, order.id);

      console.log('✅ Pedido creado:', order.id);
      return { success: true, order };

    } catch (error) {
      console.error('❌ Error al crear pedido:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener pedido por ID
   * @param {string} orderId 
   * @returns {Promise<Object>} { success: boolean, order?: Object, error?: string }
   */
  async getOrder(orderId) {
    try {
      const result = await window.storage.get(orderId);
      
      if (!result || !result.value) {
        throw new Error('Pedido no encontrado');
      }

      const order = JSON.parse(result.value);
      return { success: true, order };

    } catch (error) {
      if (error.message.includes('Key not found')) {
        return { success: false, error: 'Pedido no encontrado' };
      }
      console.error('❌ Error al obtener pedido:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener todos los pedidos de un usuario
   * @param {string} userId 
   * @returns {Promise<Array>}
   */
  async getUserOrders(userId) {
    try {
      // Obtener lista de IDs de pedidos del usuario
      let orderIds = [];
      try {
        const result = await window.storage.get(`user_orders_${userId}`);
        if (result && result.value) {
          orderIds = JSON.parse(result.value);
        }
      } catch (error) {
        if (!error.message.includes('Key not found')) {
          throw error;
        }
      }

      // Cargar cada pedido
      const orders = [];
      for (const orderId of orderIds) {
        try {
          const orderResult = await window.storage.get(orderId);
          if (orderResult && orderResult.value) {
            orders.push(JSON.parse(orderResult.value));
          }
        } catch (error) {
          console.error(`Error al cargar pedido ${orderId}:`, error);
        }
      }

      // Ordenar por fecha (más reciente primero)
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return orders;

    } catch (error) {
      console.error('❌ Error al obtener pedidos del usuario:', error.message);
      return [];
    }
  },

  /**
   * Actualizar estado del pedido
   * @param {string} orderId 
   * @param {string} status - pending, confirmed, shipped, delivered, cancelled
   * @returns {Promise<Object>} { success: boolean, order?: Object, error?: string }
   */
  async updateOrderStatus(orderId, status) {
    try {
      // Validar status
      const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        throw new Error('Estado de pedido inválido');
      }

      // Obtener pedido
      const orderResult = await this.getOrder(orderId);
      if (!orderResult.success) {
        throw new Error('Pedido no encontrado');
      }

      const order = orderResult.order;
      order.status = status;
      order.updatedAt = new Date().toISOString();

      // Si el pedido se marca como entregado, actualizar paymentStatus
      if (status === 'delivered' && order.paymentStatus === 'pending') {
        order.paymentStatus = 'paid';
      }

      // Guardar pedido actualizado
      const saveResult = await window.storage.set(
        orderId,
        JSON.stringify(order)
      );

      if (!saveResult) {
        throw new Error('Error al actualizar pedido');
      }

      console.log('✅ Estado de pedido actualizado:', orderId, status);
      return { success: true, order };

    } catch (error) {
      console.error('❌ Error al actualizar estado:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Actualizar estado de pago
   * @param {string} orderId 
   * @param {string} paymentStatus - pending, paid, failed, refunded
   * @param {Object} paymentDetails - Detalles del pago (opcional)
   * @returns {Promise<Object>} { success: boolean, order?: Object, error?: string }
   */
  async updatePaymentStatus(orderId, paymentStatus, paymentDetails = {}) {
    try {
      // Validar paymentStatus
      const validStatuses = ['pending', 'paid', 'failed', 'refunded'];
      if (!validStatuses.includes(paymentStatus)) {
        throw new Error('Estado de pago inválido');
      }

      // Obtener pedido
      const orderResult = await this.getOrder(orderId);
      if (!orderResult.success) {
        throw new Error('Pedido no encontrado');
      }

      const order = orderResult.order;
      order.paymentStatus = paymentStatus;
      order.paymentDetails = {
        ...order.paymentDetails,
        ...paymentDetails,
        updatedAt: new Date().toISOString()
      };
      order.updatedAt = new Date().toISOString();

      // Si el pago es exitoso, confirmar el pedido
      if (paymentStatus === 'paid' && order.status === 'pending') {
        order.status = 'confirmed';
      }

      // Guardar pedido actualizado
      const saveResult = await window.storage.set(
        orderId,
        JSON.stringify(order)
      );

      if (!saveResult) {
        throw new Error('Error al actualizar pago');
      }

      console.log('✅ Estado de pago actualizado:', orderId, paymentStatus);
      return { success: true, order };

    } catch (error) {
      console.error('❌ Error al actualizar pago:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Cancelar pedido
   * @param {string} orderId 
   * @param {string} reason - Razón de cancelación
   * @returns {Promise<Object>} { success: boolean, order?: Object, error?: string }
   */
  async cancelOrder(orderId, reason = '') {
    try {
      const orderResult = await this.getOrder(orderId);
      if (!orderResult.success) {
        throw new Error('Pedido no encontrado');
      }

      const order = orderResult.order;

      // No permitir cancelar pedidos ya enviados o entregados
      if (['shipped', 'delivered'].includes(order.status)) {
        throw new Error('No se puede cancelar un pedido ya enviado o entregado');
      }

      order.status = 'cancelled';
      order.cancellationReason = reason;
      order.cancelledAt = new Date().toISOString();
      order.updatedAt = new Date().toISOString();

      // Si ya se pagó, marcar para reembolso
      if (order.paymentStatus === 'paid') {
        order.paymentStatus = 'refunded';
      }

      const saveResult = await window.storage.set(
        orderId,
        JSON.stringify(order)
      );

      if (!saveResult) {
        throw new Error('Error al cancelar pedido');
      }

      console.log('✅ Pedido cancelado:', orderId);
      return { success: true, order };

    } catch (error) {
      console.error('❌ Error al cancelar pedido:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener todos los pedidos (admin)
   * @param {Object} filters - Filtros opcionales { status, paymentStatus, userId }
   * @returns {Promise<Array>}
   */
  async getAllOrders(filters = {}) {
    try {
      const result = await window.storage.list('order_');
      
      if (!result || !result.keys) {
        return [];
      }

      const orders = [];
      for (const key of result.keys) {
        try {
          const orderResult = await window.storage.get(key);
          if (orderResult && orderResult.value) {
            const order = JSON.parse(orderResult.value);
            
            // Aplicar filtros
            let includeOrder = true;
            
            if (filters.status && order.status !== filters.status) {
              includeOrder = false;
            }
            
            if (filters.paymentStatus && order.paymentStatus !== filters.paymentStatus) {
              includeOrder = false;
            }
            
            if (filters.userId && order.userId !== filters.userId) {
              includeOrder = false;
            }

            if (includeOrder) {
              orders.push(order);
            }
          }
        } catch (error) {
          console.error(`Error al cargar pedido ${key}:`, error);
        }
      }

      // Ordenar por fecha (más reciente primero)
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return orders;

    } catch (error) {
      console.error('❌ Error al obtener todos los pedidos:', error.message);
      return [];
    }
  },

  /**
   * Obtener estadísticas de pedidos
   * @param {string} userId - Opcional, para estadísticas de un usuario específico
   * @returns {Promise<Object>}
   */
  async getOrderStats(userId = null) {
    try {
      const orders = userId 
        ? await this.getUserOrders(userId)
        : await this.getAllOrders();

      const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
        totalRevenue: orders
          .filter(o => o.paymentStatus === 'paid')
          .reduce((sum, o) => sum + o.total, 0),
        averageOrderValue: orders.length > 0
          ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length
          : 0
      };

      return stats;

    } catch (error) {
      console.error('❌ Error al obtener estadísticas:', error.message);
      return null;
    }
  },

  /**
   * Agregar tracking al pedido
   * @param {string} orderId 
   * @param {Object} trackingInfo - { carrier, trackingNumber, estimatedDelivery }
   * @returns {Promise<Object>}
   */
  async addTracking(orderId, trackingInfo) {
    try {
      const orderResult = await this.getOrder(orderId);
      if (!orderResult.success) {
        throw new Error('Pedido no encontrado');
      }

      const order = orderResult.order;
      order.tracking = {
        ...trackingInfo,
        addedAt: new Date().toISOString()
      };
      order.updatedAt = new Date().toISOString();

      // Actualizar estado a shipped si no lo está
      if (order.status === 'confirmed') {
        order.status = 'shipped';
      }

      const saveResult = await window.storage.set(
        orderId,
        JSON.stringify(order)
      );

      if (!saveResult) {
        throw new Error('Error al agregar tracking');
      }

      console.log('✅ Tracking agregado:', orderId);
      return { success: true, order };

    } catch (error) {
      console.error('❌ Error al agregar tracking:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Helper privado: Agregar pedido a la lista del usuario
   */
  async _addOrderToUserList(userId, orderId) {
    try {
      let orderIds = [];
      
      try {
        const result = await window.storage.get(`user_orders_${userId}`);
        if (result && result.value) {
          orderIds = JSON.parse(result.value);
        }
      } catch (error) {
        if (!error.message.includes('Key not found')) {
          throw error;
        }
      }

      orderIds.unshift(orderId); // Agregar al inicio (más reciente primero)

      await window.storage.set(
        `user_orders_${userId}`,
        JSON.stringify(orderIds)
      );

    } catch (error) {
      console.error('Error al actualizar lista de pedidos del usuario:', error);
    }
  }
};

export default orderService;