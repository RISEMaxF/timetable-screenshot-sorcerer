
import { BaseDataLoader } from './DataLoader';
import { TrainEntity, TrainSearchParams } from '../entities/Train';

export interface TrainDataResponse {
  trains: TrainEntity[];
  total: number;
  hasMore: boolean;
}

export class TrainDataLoader extends BaseDataLoader<TrainDataResponse, TrainSearchParams> {
  private apiUrl: string;

  constructor(apiUrl: string = '/api/trains') {
    super();
    this.apiUrl = apiUrl;
    // Set shorter cache for real-time train data
    this.setCacheTimeout(30 * 1000); // 30 seconds
  }

  async fetchData(params?: TrainSearchParams): Promise<TrainDataResponse> {
    console.log('Fetching train data from API...', params);
    
    const url = new URL(this.apiUrl, window.location.origin);
    
    if (params) {
      if (params.searchTerm) url.searchParams.set('search', params.searchTerm);
      if (params.limit) url.searchParams.set('limit', params.limit.toString());
      if (params.offset) url.searchParams.set('offset', params.offset.toString());
      if (params.sortBy) url.searchParams.set('sortBy', params.sortBy);
      if (params.sortDirection) url.searchParams.set('sortDirection', params.sortDirection);
      
      if (params.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.set(key, value.toString());
          }
        });
      }
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

// Fallback to mock data during development
export class MockTrainDataLoader extends BaseDataLoader<TrainDataResponse, TrainSearchParams> {
  private mockData: TrainEntity[];

  constructor(mockData: TrainEntity[]) {
    super();
    this.mockData = mockData;
    this.setCacheTimeout(10 * 1000); // 10 seconds for mock data
  }

  async fetchData(params?: TrainSearchParams): Promise<TrainDataResponse> {
    console.log('Using mock train data...', params);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    let filteredData = [...this.mockData];
    
    // Apply basic filtering for demo
    if (params?.searchTerm) {
      const term = params.searchTerm.toLowerCase();
      filteredData = filteredData.filter(train => 
        train.id.toLowerCase().includes(term) ||
        train.operator.toLowerCase().includes(term) ||
        train.from?.toLowerCase().includes(term) ||
        train.to?.toLowerCase().includes(term)
      );
    }
    
    if (params?.filters?.country) {
      filteredData = filteredData.filter(train => train.country === params.filters!.country);
    }
    
    // Apply pagination
    const offset = params?.offset || 0;
    const limit = params?.limit || filteredData.length;
    const paginatedData = filteredData.slice(offset, offset + limit);
    
    return {
      trains: paginatedData,
      total: filteredData.length,
      hasMore: offset + limit < filteredData.length
    };
  }
}
