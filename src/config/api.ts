
export const API_CONFIG = {
  // Base API URL - will be different for FastAPI vs Supabase
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // API endpoints matching your backend plan
  ENDPOINTS: {
    TRAINS: '/api/v1/trains/simplified',
    TRAIN_SEARCH: '/api/v1/trains/simplified/search',
    TRAIN_DETAIL: '/api/v1/trains/simplified',
    TRAIN_BATCH: '/api/v1/trains/simplified/batch',
    TRAIN_CARS: '/api/v1/trains/train-cars',
    STATIONS: '/api/v1/trains/stations',
    OPERATORS: '/api/v1/trains/operators',
    EVENTS: '/api/v1/events/train',
    EVENTS_STREAM: '/api/v1/events/stream',
    TIMELINE: '/api/v1/events/train',
    HEALTH: '/health'
  },
  
  // Request configuration
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  
  // Cache configuration
  CACHE_DURATION: {
    TRAINS: 30 * 1000,      // 30 seconds - real-time data
    STATIONS: 60 * 60 * 1000, // 1 hour - static data
    OPERATORS: 60 * 60 * 1000, // 1 hour - static data
    EVENTS: 5 * 60 * 1000   // 5 minutes - event data
  },
  
  // Real-time configuration
  REALTIME: {
    MAX_RECONNECT_ATTEMPTS: 5,
    RECONNECT_DELAY: 3000,
    HEARTBEAT_INTERVAL: 30000
  }
};

// Environment-specific configurations
export const getApiConfig = () => {
  const env = import.meta.env.MODE;
  
  switch (env) {
    case 'development':
      return {
        ...API_CONFIG,
        BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1/trains/simplified',
      };
    case 'production':
      return {
        ...API_CONFIG,
        BASE_URL: import.meta.env.VITE_API_URL || 'https://your-production-api.com/api/v1/trains/simplified',
      };
    case 'test':
      return {
        ...API_CONFIG,
        BASE_URL: 'http://localhost:8001/api/v1/trains/simplified',
        REALTIME: {
          ...API_CONFIG.REALTIME,
          MAX_RECONNECT_ATTEMPTS: 1
        }
      };
    default:
      return API_CONFIG;
  }
};

// Utility function to get full endpoint URL
export const getEndpointUrl = (endpoint: keyof typeof API_CONFIG.ENDPOINTS): string => {
  const config = getApiConfig();
  const baseUrl = config.BASE_URL.replace('/api/v1/trains/simplified', '');
  return `${baseUrl}${config.ENDPOINTS[endpoint]}`;
};
