
import { TrainRepository } from '../repositories/TrainRepository';
import { TrainEntity, CreateTrainDto, UpdateTrainDto, TrainSearchParams } from '../entities/Train';

export class TrainService {
  constructor(private trainRepository: TrainRepository) {}

  async getAllTrains(params?: TrainSearchParams): Promise<TrainEntity[]> {
    return this.trainRepository.findAll(params);
  }

  async getTrainById(id: string): Promise<TrainEntity | null> {
    return this.trainRepository.findById(id);
  }

  async searchTrains(params: TrainSearchParams): Promise<{
    trains: TrainEntity[];
    total: number;
    hasMore: boolean;
  }> {
    const [trains, total] = await Promise.all([
      this.trainRepository.findByFilters(params),
      this.trainRepository.count(params)
    ]);

    const hasMore = params.limit ? 
      (params.offset || 0) + params.limit < total : 
      false;

    return { trains, total, hasMore };
  }

  async createTrain(train: CreateTrainDto): Promise<TrainEntity> {
    this.validateTrainData(train);
    return this.trainRepository.create(train);
  }

  async updateTrain(id: string, updates: UpdateTrainDto): Promise<TrainEntity> {
    const existingTrain = await this.trainRepository.findById(id);
    if (!existingTrain) {
      throw new Error(`Train with id ${id} not found`);
    }

    this.validateTrainUpdates(updates);
    return this.trainRepository.update(id, updates);
  }

  async deleteTrain(id: string): Promise<boolean> {
    const existingTrain = await this.trainRepository.findById(id);
    if (!existingTrain) {
      throw new Error(`Train with id ${id} not found`);
    }

    return this.trainRepository.delete(id);
  }

  async batchUpdateTrains(ids: string[], updates: UpdateTrainDto): Promise<TrainEntity[]> {
    this.validateTrainUpdates(updates);
    return this.trainRepository.batchUpdate(ids, updates);
  }

  async updateTrainTrack(trainId: string, newTrack: string): Promise<TrainEntity> {
    return this.updateTrain(trainId, { newTrack });
  }

  async updateTrainTime(trainId: string, newTime: string): Promise<TrainEntity> {
    return this.updateTrain(trainId, { newTime });
  }

  async updateTrainStatus(trainId: string, completed: boolean): Promise<TrainEntity> {
    return this.updateTrain(trainId, { completed });
  }

  async addTrainNotes(trainId: string, notes: string): Promise<TrainEntity> {
    return this.updateTrain(trainId, { notes });
  }

  async highlightTrain(trainId: string, highlighted: boolean): Promise<TrainEntity> {
    return this.updateTrain(trainId, { highlighted });
  }

  private validateTrainData(train: CreateTrainDto): void {
    if (!train.id?.trim()) {
      throw new Error('Train ID is required');
    }
    if (!train.operator?.trim()) {
      throw new Error('Train operator is required');
    }
    if (!train.country?.trim()) {
      throw new Error('Train country is required');
    }
  }

  private validateTrainUpdates(updates: UpdateTrainDto): void {
    if (updates.operator !== undefined && !updates.operator?.trim()) {
      throw new Error('Train operator cannot be empty');
    }
    if (updates.country !== undefined && !updates.country?.trim()) {
      throw new Error('Train country cannot be empty');
    }
  }
}
