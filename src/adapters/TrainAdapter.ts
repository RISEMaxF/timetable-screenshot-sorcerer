
import { Train } from '../types/train';
import { TrainEntity, CreateTrainDto, UpdateTrainDto } from '../entities/Train';

export class TrainAdapter {
  static toEntity(train: Train): TrainEntity {
    return {
      id: train.id,
      announcedTrainNumber: train.announcedTrainNumber,
      operator: train.operator,
      from: train.from,
      to: train.to,
      country: train.country,
      arrivalTime: train.arrivalTime,
      newTime: train.newTime,
      track: train.track,
      newTrack: train.newTrack,
      otn: train.otn,
      newOperator: train.newOperator,
      notes: train.notes,
      latest: train.latest,
      updated: train.updated,
      highlighted: train.highlighted,
      completed: train.completed
    };
  }

  static fromEntity(entity: TrainEntity): Train {
    return {
      id: entity.id,
      announcedTrainNumber: entity.announcedTrainNumber,
      operator: entity.operator,
      from: entity.from,
      to: entity.to,
      country: entity.country,
      arrivalTime: entity.arrivalTime,
      newTime: entity.newTime,
      track: entity.track,
      newTrack: entity.newTrack,
      otn: entity.otn,
      newOperator: entity.newOperator,
      notes: entity.notes,
      latest: entity.latest,
      updated: entity.updated,
      highlighted: entity.highlighted,
      completed: entity.completed
    };
  }

  static toCreateDto(train: Partial<Train>): CreateTrainDto {
    if (!train.id || !train.operator || !train.country) {
      throw new Error('Missing required fields for train creation');
    }

    return {
      id: train.id,
      operator: train.operator,
      country: train.country,
      announcedTrainNumber: train.announcedTrainNumber,
      from: train.from,
      to: train.to,
      arrivalTime: train.arrivalTime,
      track: train.track,
      otn: train.otn,
      notes: train.notes,
      highlighted: train.highlighted,
      completed: train.completed
    };
  }

  static toUpdateDto(train: Partial<Train>): UpdateTrainDto {
    return {
      announcedTrainNumber: train.announcedTrainNumber,
      operator: train.operator,
      from: train.from,
      to: train.to,
      country: train.country,
      arrivalTime: train.arrivalTime,
      newTime: train.newTime,
      track: train.track,
      newTrack: train.newTrack,
      otn: train.otn,
      newOperator: train.newOperator,
      notes: train.notes,
      latest: train.latest,
      highlighted: train.highlighted,
      completed: train.completed
    };
  }

  static fromEntityList(entities: TrainEntity[]): Train[] {
    return entities.map(entity => this.fromEntity(entity));
  }

  static toEntityList(trains: Train[]): TrainEntity[] {
    return trains.map(train => this.toEntity(train));
  }
}
