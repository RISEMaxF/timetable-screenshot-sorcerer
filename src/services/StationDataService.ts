// Station Data Service - Centralized management of station data
// Designed to be easily replaceable with API calls in the future

import { stationData, StationInfo, getStationsByCountry, getStationById, searchStations } from "@/data/stationData";

export interface StationService {
  getStationsByCountry(countryCode: string): Promise<StationInfo[]>;
  getStationById(stationId: string, countryCode?: string): Promise<StationInfo | undefined>;
  searchStations(query: string, countryCode?: string): Promise<StationInfo[]>;
  getAllStations(): Promise<StationInfo[]>;
}

/**
 * In-memory station service that works with mock data
 * This implementation is used in the frontend-only environment
 */
class InMemoryStationService implements StationService {
  private mockDelay(): Promise<void> {
    const delay = parseInt(import.meta.env.VITE_MOCK_DELAY_MS || '100');
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  async getStationsByCountry(countryCode: string): Promise<StationInfo[]> {
    await this.mockDelay();
    
    if (import.meta.env.VITE_LOG_LEVEL === 'debug') {
      console.log(`[StationService] Getting stations for country: ${countryCode}`);
    }
    
    return getStationsByCountry(countryCode);
  }

  async getStationById(stationId: string, countryCode?: string): Promise<StationInfo | undefined> {
    await this.mockDelay();
    
    if (import.meta.env.VITE_LOG_LEVEL === 'debug') {
      console.log(`[StationService] Getting station by ID: ${stationId}, country: ${countryCode}`);
    }
    
    return getStationById(stationId, countryCode);
  }

  async searchStations(query: string, countryCode?: string): Promise<StationInfo[]> {
    await this.mockDelay();
    
    if (import.meta.env.VITE_LOG_LEVEL === 'debug') {
      console.log(`[StationService] Searching stations: query="${query}", country="${countryCode}"`);
    }
    
    return searchStations(query, countryCode);
  }

  async getAllStations(): Promise<StationInfo[]> {
    await this.mockDelay();
    
    if (import.meta.env.VITE_LOG_LEVEL === 'debug') {
      console.log(`[StationService] Getting all stations`);
    }
    
    return stationData;
  }
}

/**
 * API-based station service for production environment
 * This will be used when connected to the real backend
 */
class ApiStationService implements StationService {
  private baseUrl: string;

  constructor(baseUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:8000') {
    this.baseUrl = baseUrl;
  }

  async getStationsByCountry(countryCode: string): Promise<StationInfo[]> {
    const response = await fetch(`${this.baseUrl}/api/v1/stations?country=${countryCode}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch stations for country ${countryCode}`);
    }
    return response.json();
  }

  async getStationById(stationId: string, countryCode?: string): Promise<StationInfo | undefined> {
    const params = new URLSearchParams({ id: stationId });
    if (countryCode) {
      params.append('country', countryCode);
    }
    
    const response = await fetch(`${this.baseUrl}/api/v1/stations/single?${params}`);
    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(`Failed to fetch station ${stationId}`);
    }
    return response.json();
  }

  async searchStations(query: string, countryCode?: string): Promise<StationInfo[]> {
    const params = new URLSearchParams({ q: query });
    if (countryCode && countryCode !== 'ALL') {
      params.append('country', countryCode);
    }
    
    const response = await fetch(`${this.baseUrl}/api/v1/stations/search?${params}`);
    if (!response.ok) {
      throw new Error(`Failed to search stations with query "${query}"`);
    }
    return response.json();
  }

  async getAllStations(): Promise<StationInfo[]> {
    const response = await fetch(`${this.baseUrl}/api/v1/stations`);
    if (!response.ok) {
      throw new Error('Failed to fetch all stations');
    }
    return response.json();
  }
}

// Service factory - chooses implementation based on environment
const createStationService = (): StationService => {
  const useRealApi = import.meta.env.PROD || import.meta.env.VITE_USE_REAL_API === 'true';
  
  if (useRealApi) {
    if (import.meta.env.VITE_LOG_LEVEL === 'debug') {
      console.log('[StationService] Using API-based station service');
    }
    return new ApiStationService();
  } else {
    if (import.meta.env.VITE_LOG_LEVEL === 'debug') {
      console.log('[StationService] Using in-memory station service');
    }
    return new InMemoryStationService();
  }
};

// Export singleton instance
export const stationService = createStationService();

// Export types and utility functions
export type { StationInfo };
export { getStationsByCountry, getStationById, searchStations };