
import { TrainEntity, CreateTrainDto, UpdateTrainDto, TrainSearchParams } from '../entities/Train';

export interface TrainRepository {
  findAll(params?: TrainSearchParams): Promise<TrainEntity[]>;
  findById(id: string): Promise<TrainEntity | null>;
  findByFilters(params: TrainSearchParams): Promise<TrainEntity[]>;
  create(train: CreateTrainDto): Promise<TrainEntity>;
  update(id: string, updates: UpdateTrainDto): Promise<TrainEntity>;
  delete(id: string): Promise<boolean>;
  batchUpdate(ids: string[], updates: UpdateTrainDto): Promise<TrainEntity[]>;
  count(params?: TrainSearchParams): Promise<number>;
}

export class InMemoryTrainRepository implements TrainRepository {
  private trains: TrainEntity[] = [];

  async findAll(params?: TrainSearchParams): Promise<TrainEntity[]> {
    let result = [...this.trains];
    
    if (params?.filters) {
      result = this.applyFilters(result, params.filters);
    }
    
    if (params?.searchTerm) {
      result = this.applySearch(result, params.searchTerm);
    }
    
    if (params?.sortBy) {
      result = this.applySorting(result, params.sortBy, params.sortDirection || 'asc');
    }
    
    if (params?.limit) {
      const offset = params.offset || 0;
      result = result.slice(offset, offset + params.limit);
    }
    
    return result;
  }

  async findById(id: string): Promise<TrainEntity | null> {
    return this.trains.find(train => train.id === id) || null;
  }

  async findByFilters(params: TrainSearchParams): Promise<TrainEntity[]> {
    return this.findAll(params);
  }

  async create(train: CreateTrainDto): Promise<TrainEntity> {
    const newTrain: TrainEntity = {
      ...train,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.trains.push(newTrain);
    return newTrain;
  }

  async update(id: string, updates: UpdateTrainDto): Promise<TrainEntity> {
    const index = this.trains.findIndex(train => train.id === id);
    if (index === -1) {
      throw new Error(`Train with id ${id} not found`);
    }
    
    this.trains[index] = {
      ...this.trains[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return this.trains[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.trains.findIndex(train => train.id === id);
    if (index === -1) {
      return false;
    }
    
    this.trains.splice(index, 1);
    return true;
  }

  async batchUpdate(ids: string[], updates: UpdateTrainDto): Promise<TrainEntity[]> {
    const updatedTrains: TrainEntity[] = [];
    
    for (const id of ids) {
      try {
        const updated = await this.update(id, updates);
        updatedTrains.push(updated);
      } catch (error) {
        console.warn(`Failed to update train ${id}:`, error);
      }
    }
    
    return updatedTrains;
  }

  async count(params?: TrainSearchParams): Promise<number> {
    const results = await this.findAll(params);
    return results.length;
  }

  // Seed method for testing
  seed(trains: TrainEntity[]): void {
    this.trains = trains.map(train => ({
      ...train,
      createdAt: train.createdAt || new Date(),
      updatedAt: train.updatedAt || new Date()
    }));
  }

  private applyFilters(trains: TrainEntity[], filters: any): TrainEntity[] {
    return trains.filter(train => {
      if (filters.country && train.country !== filters.country) return false;
      if (filters.operator && train.operator !== filters.operator) return false;
      if (filters.from && train.from !== filters.from) return false;
      if (filters.to && train.to !== filters.to) return false;
      if (filters.completed !== undefined && train.completed !== filters.completed) return false;
      if (filters.highlighted !== undefined && train.highlighted !== filters.highlighted) return false;
      return true;
    });
  }

  private applySearch(trains: TrainEntity[], searchTerm: string): TrainEntity[] {
    const term = searchTerm.toLowerCase();
    return trains.filter(train => 
      train.id.toLowerCase().includes(term) ||
      train.operator.toLowerCase().includes(term) ||
      train.from?.toLowerCase().includes(term) ||
      train.to?.toLowerCase().includes(term) ||
      train.announcedTrainNumber?.toLowerCase().includes(term)
    );
  }

  private applySorting(trains: TrainEntity[], sortBy: keyof TrainEntity, direction: 'asc' | 'desc'): TrainEntity[] {
    return trains.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return direction === 'asc' ? comparison : -comparison;
    });
  }
}
