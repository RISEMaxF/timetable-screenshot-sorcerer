import { TrainRepository } from '../repositories/TrainRepository';
import { TrainEntity, CreateTrainDto, UpdateTrainDto, TrainSearchParams } from '../entities/Train';
import { getApiConfig } from '../config/api';
import { ApiErrorHandler } from './ErrorHandlingService';

interface BackendTrain {
  id: string;
  advertised_train_number?: string;
  operator: string;
  from?: string;
  to?: string;
  country: string;
  arrivalTime?: string;
  newTime?: string;
  track?: string;
  newTrack?: string;
  otn?: string;
  newOperator?: string;
  notes?: string;
  latest?: string;
  updated?: string;
  highlighted?: boolean;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface BackendResponse {
  trains: BackendTrain[];
  total: number;
  hasMore: boolean;
}

export class FastApiTrainService implements TrainRepository {
  private baseUrl = getApiConfig().BASE_URL;
  private headers = getApiConfig().DEFAULT_HEADERS;

  async findAll(params?: TrainSearchParams): Promise<TrainEntity[]> {
    try {
      const url = this.buildSearchUrl(params);
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: BackendResponse = await response.json();
      return data.trains.map(this.mapBackendToEntity);
    } catch (error) {
      console.error('Error fetching trains:', error);
      throw new Error(ApiErrorHandler.handleApiError(error));
    }
  }

  async findById(id: string): Promise<TrainEntity | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: this.headers
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const train: BackendTrain = await response.json();
      return this.mapBackendToEntity(train);
    } catch (error) {
      console.error(`Error fetching train ${id}:`, error);
      throw new Error(ApiErrorHandler.handleApiError(error));
    }
  }

  async findByFilters(params: TrainSearchParams): Promise<TrainEntity[]> {
    return this.findAll(params);
  }

  async create(train: CreateTrainDto): Promise<TrainEntity> {
    try {
      const backendTrain = this.mapEntityToBackend(train);
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(backendTrain)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const createdTrain: BackendTrain = await response.json();
      return this.mapBackendToEntity(createdTrain);
    } catch (error) {
      console.error('Error creating train:', error);
      throw new Error(ApiErrorHandler.handleApiError(error));
    }
  }

  async update(id: string, updates: UpdateTrainDto): Promise<TrainEntity> {
    try {
      const backendUpdates = this.mapEntityToBackend(updates);
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(backendUpdates)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const updatedTrain: BackendTrain = await response.json();
      return this.mapBackendToEntity(updatedTrain);
    } catch (error) {
      console.error(`Error updating train ${id}:`, error);
      throw new Error(ApiErrorHandler.handleApiError(error));
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: this.headers
      });

      if (response.status === 404) {
        return false;
      }

      return response.ok;
    } catch (error) {
      console.error(`Error deleting train ${id}:`, error);
      throw new Error(ApiErrorHandler.handleApiError(error));
    }
  }

  async batchUpdate(ids: string[], updates: UpdateTrainDto): Promise<TrainEntity[]> {
    try {
      const backendUpdates = this.mapEntityToBackend(updates);
      const response = await fetch(`${this.baseUrl}/batch`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify({
          ids,
          updates: backendUpdates
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const updatedTrains: BackendTrain[] = await response.json();
      return updatedTrains.map(this.mapBackendToEntity);
    } catch (error) {
      console.error('Error batch updating trains:', error);
      throw new Error(ApiErrorHandler.handleApiError(error));
    }
  }

  async count(params?: TrainSearchParams): Promise<number> {
    try {
      const url = this.buildSearchUrl({ ...params, limit: 1, offset: 0 });
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: BackendResponse = await response.json();
      return data.total;
    } catch (error) {
      console.error('Error counting trains:', error);
      throw new Error(ApiErrorHandler.handleApiError(error));
    }
  }

  private buildSearchUrl(params?: TrainSearchParams): string {
    const searchParams = new URLSearchParams();
    
    if (params?.searchTerm) {
      searchParams.append('search_term', params.searchTerm);
    }
    
    if (params?.filters) {
      const { country, operator, from, to, completed, highlighted } = params.filters;
      if (country) searchParams.append('country', country);
      if (operator) searchParams.append('operator', operator);
      if (from) searchParams.append('from_station', from);
      if (to) searchParams.append('to_station', to);
      if (completed !== undefined) searchParams.append('completed', completed.toString());
      if (highlighted !== undefined) searchParams.append('highlighted', highlighted.toString());
    }
    
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());
    if (params?.sortBy) searchParams.append('sort_by', params.sortBy);
    if (params?.sortDirection) searchParams.append('sort_direction', params.sortDirection);

    const queryString = searchParams.toString();
    return queryString ? `${this.baseUrl}/search?${queryString}` : this.baseUrl;
  }

  private mapBackendToEntity(backendTrain: BackendTrain): TrainEntity {
    return {
      id: backendTrain.id,
      announcedTrainNumber: backendTrain.advertised_train_number,
      operator: backendTrain.operator,
      from: backendTrain.from,
      to: backendTrain.to,
      country: backendTrain.country,
      arrivalTime: backendTrain.arrivalTime,
      newTime: backendTrain.newTime,
      track: backendTrain.track,
      newTrack: backendTrain.newTrack,
      otn: backendTrain.otn,
      newOperator: backendTrain.newOperator,
      notes: backendTrain.notes,
      latest: backendTrain.latest,
      updated: backendTrain.updated,
      highlighted: backendTrain.highlighted,
      completed: backendTrain.completed,
      createdAt: backendTrain.createdAt ? new Date(backendTrain.createdAt) : undefined,
      updatedAt: backendTrain.updatedAt ? new Date(backendTrain.updatedAt) : undefined
    };
  }

  private mapEntityToBackend(entity: Partial<TrainEntity> | CreateTrainDto | UpdateTrainDto): Partial<BackendTrain> {
    const result: Partial<BackendTrain> = {
      operator: entity.operator,
      from: entity.from,
      to: entity.to,
      country: entity.country,
      arrivalTime: entity.arrivalTime,
      track: entity.track,
      otn: entity.otn,
      notes: entity.notes,
      highlighted: entity.highlighted,
      completed: entity.completed
    };

    // Handle id (only present in full entities and create DTOs)
    if ('id' in entity && entity.id) {
      result.id = entity.id;
    }

    // Handle announcedTrainNumber
    if ('announcedTrainNumber' in entity) {
      result.advertised_train_number = entity.announcedTrainNumber;
    }

    // Handle newTime (only in update DTOs and full entities)
    if ('newTime' in entity) {
      result.newTime = entity.newTime;
    }

    // Handle newTrack (only in update DTOs and full entities)
    if ('newTrack' in entity) {
      result.newTrack = entity.newTrack;
    }

    // Handle newOperator (only in update DTOs and full entities)
    if ('newOperator' in entity) {
      result.newOperator = entity.newOperator;
    }

    // Handle latest (only in full entities)
    if ('latest' in entity) {
      result.latest = entity.latest;
    }

    // Handle updated (only in full entities)
    if ('updated' in entity) {
      result.updated = entity.updated;
    }

    return result;
  }
}