export const logger = {
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
  }
};

export const logErrorWithContext = (context: string, error: any) => {
  logger.error(`[${context}]`, error);
};