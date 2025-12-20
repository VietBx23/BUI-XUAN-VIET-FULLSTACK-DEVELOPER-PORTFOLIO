// API Configuration
export const API_CONFIG = {
  // Local development
  LOCAL_EMAIL_API: 'http://localhost:3001/api/send-email',
  LOCAL_HEALTH_API: 'http://localhost:3001/api/health',
  
  // Production
  PRODUCTION_EMAIL_API: '/.netlify/functions/send-email',
  
  // Check if running locally
  isLocalDev: () => {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.port === '5173' ||
           window.location.href.includes('localhost') ||
           window.location.href.includes('127.0.0.1');
  },
  
  // Get appropriate API endpoint
  getEmailAPI: () => {
    return API_CONFIG.isLocalDev() ? API_CONFIG.LOCAL_EMAIL_API : API_CONFIG.PRODUCTION_EMAIL_API;
  }
};