
export interface TrainEntity {
  id: string;
  announcedTrainNumber?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTrainDto {
  id: string;
  operator: string;
  country: string;
  announcedTrainNumber?: string;
  from?: string;
  to?: string;
  arrivalTime?: string;
  track?: string;
  otn?: string;
  notes?: string;
  highlighted?: boolean;
  completed?: boolean;
}

export interface UpdateTrainDto {
  announcedTrainNumber?: string;
  operator?: string;
  from?: string;
  to?: string;
  country?: string;
  arrivalTime?: string;
  newTime?: string;
  track?: string;
  newTrack?: string;
  otn?: string;
  newOperator?: string;
  notes?: string;
  latest?: string;
  highlighted?: boolean;
  completed?: boolean;
}

export interface TrainFilters {
  country?: string;
  operator?: string;
  from?: string;
  to?: string;
  completed?: boolean;
  highlighted?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface TrainSearchParams {
  searchTerm?: string;
  filters?: TrainFilters;
  sortBy?: keyof TrainEntity;
  sortDirection?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}
