
export const API_CONFIG = {
  // Base API URL - will be different for FastAPI vs Supabase
  BASE_URL: 'http://localhost:8000/api/v1/trains/simplified',
  
  // API endpoints
  ENDPOINTS: {
    TRAINS: '',
    TRAIN_CARS: '/train-cars',
    STATIONS: '/stations',
    OPERATORS: '/operators',
  },
  
  // Request configuration
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  
  // Cache configuration
  CACHE_DURATION: {
    TRAINS: 30 * 1000,      // 30 seconds - real-time data
    STATIONS: 60 * 60 * 1000, // 1 hour - static data
    OPERATORS: 60 * 60 * 1000, // 1 hour - static data
  }
};

// Environment-specific configurations
export const getApiConfig = () => {
  const env = process.env.NODE_ENV;
  
  switch (env) {
    case 'development':
      return {
        ...API_CONFIG,
        BASE_URL: 'http://localhost:8000/api/v1/trains/simplified', // FastAPI development server
      };
    case 'production':
      return {
        ...API_CONFIG,
        BASE_URL: process.env.REACT_APP_API_URL || API_CONFIG.BASE_URL,
      };
    default:
      return API_CONFIG;
  }
};
