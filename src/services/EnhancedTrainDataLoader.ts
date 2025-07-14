import { BaseDataLoader } from './DataLoader';
import { TrainEntity, TrainSearchParams } from '../entities/Train';
import { FastApiTrainService } from './FastApiTrainService';
import { InMemoryTrainRepository } from '../repositories/TrainRepository';
import { realTimeService } from './RealTimeService';
import { ApiErrorHandler } from './ErrorHandlingService';

export interface TrainDataResponse {
  trains: TrainEntity[];
  total: number;
  hasMore: boolean;
  lastUpdated: Date;
}

export class EnhancedTrainDataLoader extends BaseDataLoader<TrainDataResponse, TrainSearchParams> {
  private trainService: FastApiTrainService;
  private isRealTimeEnabled = false;
  private realTimeUnsubscribe?: () => void;

  constructor(useRealApi = true) {
    super();
    this.setCacheTimeout(30 * 1000); // 30 seconds for train data
    
    if (useRealApi) {
      this.trainService = new FastApiTrainService();
      this.setupRealTimeUpdates();
    } else {
      // Fallback to in-memory repository for development
      this.trainService = new InMemoryTrainRepository() as any;
    }
  }

  async fetchData(params?: TrainSearchParams): Promise<TrainDataResponse> {
    try {
      const [trains, total] = await Promise.all([
        this.trainService.findByFilters(params || {}),
        this.trainService.count(params)
      ]);

      const limit = params?.limit || trains.length;
      const offset = params?.offset || 0;
      const hasMore = offset + limit < total;

      return {
        trains,
        total,
        hasMore,
        lastUpdated: new Date()
      };
    } catch (error) {
      ApiErrorHandler.logError('EnhancedTrainDataLoader.fetchData', error, { params });
      throw error;
    }
  }

  enableRealTimeUpdates(): void {
    if (this.isRealTimeEnabled) return;

    this.realTimeUnsubscribe = realTimeService.subscribeToAllTrainEvents((event) => {
      // Invalidate cache when train data changes
      this.invalidateCache();
      
      // Optionally trigger a reload
      if (this.shouldAutoReload(event.type)) {
        this.reload().catch(error => {
          ApiErrorHandler.logError('EnhancedTrainDataLoader.auto-reload', error);
        });
      }
    });

    this.isRealTimeEnabled = true;
  }

  disableRealTimeUpdates(): void {
    if (this.realTimeUnsubscribe) {
      this.realTimeUnsubscribe();
      this.realTimeUnsubscribe = undefined;
    }
    this.isRealTimeEnabled = false;
  }

  private setupRealTimeUpdates(): void {
    // Enable real-time updates by default for FastAPI service
    this.enableRealTimeUpdates();
  }

  private shouldAutoReload(eventType: string): boolean {
    // Auto-reload for create/delete events, but not for updates (too frequent)
    return eventType === 'train_created' || eventType === 'train_deleted';
  }

  private invalidateCache(): void {
    // Force next load to fetch fresh data
    this['lastFetch'] = 0;
  }

  destroy(): void {
    this.disableRealTimeUpdates();
  }
}

// Enhanced mock data loader for development
export class MockEnhancedTrainDataLoader extends BaseDataLoader<TrainDataResponse, TrainSearchParams> {
  private mockData: TrainEntity[];

  constructor(mockData: TrainEntity[]) {
    super();
    this.setCacheTimeout(10 * 1000); // 10 seconds for mock data
    this.mockData = mockData;
  }

  async fetchData(params?: TrainSearchParams): Promise<TrainDataResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

    let filteredData = [...this.mockData];

    // Apply search
    if (params?.searchTerm) {
      const term = params.searchTerm.toLowerCase();
      filteredData = filteredData.filter(train =>
        train.id.toLowerCase().includes(term) ||
        train.operator.toLowerCase().includes(term) ||
        train.from?.toLowerCase().includes(term) ||
        train.to?.toLowerCase().includes(term) ||
        train.announcedTrainNumber?.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (params?.filters) {
      const { country, operator, from, to, completed, highlighted } = params.filters;
      filteredData = filteredData.filter(train => {
        if (country && train.country !== country) return false;
        if (operator && train.operator !== operator) return false;
        if (from && train.from !== from) return false;
        if (to && train.to !== to) return false;
        if (completed !== undefined && train.completed !== completed) return false;
        if (highlighted !== undefined && train.highlighted !== highlighted) return false;
        return true;
      });
    }

    // Apply sorting
    if (params?.sortBy) {
      const direction = params.sortDirection || 'asc';
      filteredData.sort((a, b) => {
        const aVal = a[params.sortBy!];
        const bVal = b[params.sortBy!];
        
        if (aVal === undefined || aVal === null) return 1;
        if (bVal === undefined || bVal === null) return -1;
        
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return direction === 'asc' ? comparison : -comparison;
      });
    }

    const total = filteredData.length;
    
    // Apply pagination
    const limit = params?.limit || total;
    const offset = params?.offset || 0;
    const paginatedData = filteredData.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    return {
      trains: paginatedData,
      total,
      hasMore,
      lastUpdated: new Date()
    };
  }
}