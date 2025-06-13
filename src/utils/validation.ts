
import { TrainEntity, CreateTrainDto, UpdateTrainDto } from '../entities/Train';

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateTrainId = (id: string): void => {
  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    throw new ValidationError('Train ID is required and must be a non-empty string', 'id');
  }
  
  if (id.length > 50) {
    throw new ValidationError('Train ID must be 50 characters or less', 'id');
  }
};

export const validateOperator = (operator: string): void => {
  if (!operator || typeof operator !== 'string' || operator.trim().length === 0) {
    throw new ValidationError('Operator is required and must be a non-empty string', 'operator');
  }
  
  if (operator.length > 10) {
    throw new ValidationError('Operator must be 10 characters or less', 'operator');
  }
};

export const validateCountry = (country: string): void => {
  const validCountries = ['SE', 'NO', 'DK', 'FI'];
  
  if (!country || typeof country !== 'string') {
    throw new ValidationError('Country is required and must be a string', 'country');
  }
  
  if (!validCountries.includes(country)) {
    throw new ValidationError(`Country must be one of: ${validCountries.join(', ')}`, 'country');
  }
};

export const validateTime = (time: string): void => {
  if (time && typeof time === 'string') {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      throw new ValidationError('Time must be in HH:MM format', 'time');
    }
  }
};

export const validateTrack = (track: string): void => {
  if (track && typeof track === 'string') {
    if (track.length > 10) {
      throw new ValidationError('Track must be 10 characters or less', 'track');
    }
  }
};

export const validateStation = (station: string, fieldName: string): void => {
  if (station && typeof station === 'string') {
    if (station.length > 100) {
      throw new ValidationError(`${fieldName} must be 100 characters or less`, fieldName);
    }
  }
};

export const validateCreateTrainDto = (dto: CreateTrainDto): void => {
  validateTrainId(dto.id);
  validateOperator(dto.operator);
  validateCountry(dto.country);
  
  if (dto.arrivalTime) validateTime(dto.arrivalTime);
  if (dto.track) validateTrack(dto.track);
  if (dto.from) validateStation(dto.from, 'from');
  if (dto.to) validateStation(dto.to, 'to');
};

export const validateUpdateTrainDto = (dto: UpdateTrainDto): void => {
  if (dto.operator !== undefined) validateOperator(dto.operator);
  if (dto.country !== undefined) validateCountry(dto.country);
  if (dto.arrivalTime) validateTime(dto.arrivalTime);
  if (dto.newTime) validateTime(dto.newTime);
  if (dto.track) validateTrack(dto.track);
  if (dto.newTrack) validateTrack(dto.newTrack);
  if (dto.from) validateStation(dto.from, 'from');
  if (dto.to) validateStation(dto.to, 'to');
};

export const sanitizeString = (input: string | undefined): string | undefined => {
  if (!input || typeof input !== 'string') return input;
  return input.trim().substring(0, 1000); // Prevent extremely long strings
};

export const sanitizeTrainData = (data: any): any => {
  if (!data || typeof data !== 'object') return data;
  
  const sanitized = { ...data };
  
  // Sanitize string fields
  const stringFields = ['id', 'operator', 'from', 'to', 'arrivalTime', 'newTime', 'track', 'newTrack', 'otn', 'newOperator', 'notes', 'latest', 'updated'];
  
  stringFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = sanitizeString(sanitized[field]);
    }
  });
  
  return sanitized;
};
