// lib/logger.ts
export const logger = {
  // Métodos básicos
  log: (message: string, data?: any) => {
    console.log(`[LOG] ${message}`, data || '');
  },
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error || '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data || '');
  },
  success: (message: string, data?: any) => {
    console.log(`[SUCCESS] ✅ ${message}`, data || '');
  },
  debug: (message: string, data?: any) => {
    console.log(`[DEBUG] ${message}`, data || '');
  }
};

// Función para secciones
export const logSection = (section: string): void => {
  console.log(`\n📁 ===== ${section} =====\n`);
};

// Función para errores con contexto
export const logErrorWithContext = (error: unknown, context?: Record<string, any>): void => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`[ERROR] ${errorMessage}`, {
    ...context,
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString()
  });
};

export const logUserAction = (action: string, data?: Record<string, any>): void => {
  console.log(`[USER_ACTION] ${action}`, {
    ...data,
    timestamp: new Date().toISOString()
  });
};