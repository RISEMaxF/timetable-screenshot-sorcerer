import React, { createContext, useContext, useEffect, useState } from 'react';
import { TrainService } from '../services/TrainService';
import { InMemoryTrainRepository } from '../repositories/TrainRepository';
import { TrainAdapter } from '../adapters/TrainAdapter';
import { trainData } from '../data/trainData';
import { Train } from '../types/train';
import { TrainSearchParams } from '../entities/Train';
import { TrainDataLoader, MockTrainDataLoader } from '../services/TrainDataLoader';

interface TrainDataContextType {
  trainService: TrainService;
  trains: Train[];
  loading: boolean;
  error: string | null;
  refreshTrains: () => Promise<void>;
  searchTrains: (params: TrainSearchParams) => Promise<Train[]>;
  updateTrain: (train: Train) => Promise<void>;
  batchUpdateTrains: (trainIds: string[], updates: Partial<Train>) => Promise<void>;
}

const TrainDataContext = createContext<TrainDataContextType | undefined>(undefined);

export const useTrainData = () => {
  const context = useContext(TrainDataContext);
  if (!context) {
    throw new Error('useTrainData must be used within a TrainDataProvider');
  }
  return context;
};

interface TrainDataProviderProps {
  children: React.ReactNode;
}

export const TrainDataProvider = ({ children }: TrainDataProviderProps) => {
  // Initialize data loader - use mock for now, easily switchable to real API
  const [dataLoader] = useState(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      // Use mock data loader during development
      return new MockTrainDataLoader(TrainAdapter.toEntityList(trainData));
    } else {
      // Use real API loader in production
      return new TrainDataLoader(process.env.REACT_APP_API_URL || '/api/trains');
    }
  });

  // Keep existing service for operations that don't need external API
  const [trainService] = useState(() => {
    const repository = new InMemoryTrainRepository();
    repository.seed(TrainAdapter.toEntityList(trainData));
    return new TrainService(repository);
  });

  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTrains = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await dataLoader.reload();
      setTrains(TrainAdapter.fromEntityList(response.trains));
    } catch (err) {
      console.error('Failed to refresh trains:', err);
      setError(err instanceof Error ? err.message : 'Failed to load trains');
    } finally {
      setLoading(false);
    }
  };

  const searchTrains = async (params: TrainSearchParams): Promise<Train[]> => {
    try {
      const response = await dataLoader.load(params);
      return TrainAdapter.fromEntityList(response.trains);
    } catch (err) {
      console.error('Failed to search trains:', err);
      return [];
    }
  };

  // Keep existing update methods using the service
  const updateTrain = async (train: Train) => {
    try {
      const updateDto = TrainAdapter.toUpdateDto(train);
      const updatedEntity = await trainService.updateTrain(train.id, updateDto);
      const updatedTrain = TrainAdapter.fromEntity(updatedEntity);
      
      setTrains(prev => 
        prev.map(t => t.id === train.id ? updatedTrain : t)
      );
    } catch (err) {
      console.error('Failed to update train:', err);
      throw err;
    }
  };

  const batchUpdateTrains = async (trainIds: string[], updates: Partial<Train>) => {
    try {
      const updateDto = TrainAdapter.toUpdateDto(updates);
      const updatedEntities = await trainService.batchUpdateTrains(trainIds, updateDto);
      const updatedTrains = TrainAdapter.fromEntityList(updatedEntities);
      
      setTrains(prev => 
        prev.map(train => {
          const updated = updatedTrains.find(u => u.id === train.id);
          return updated || train;
        })
      );
    } catch (err) {
      console.error('Failed to batch update trains:', err);
      throw err;
    }
  };

  useEffect(() => {
    refreshTrains();
  }, []);

  const value: TrainDataContextType = {
    trainService,
    trains,
    loading,
    error,
    refreshTrains,
    searchTrains,
    updateTrain,
    batchUpdateTrains
  };

  return (
    <TrainDataContext.Provider value={value}>
      {children}
    </TrainDataContext.Provider>
  );
};
