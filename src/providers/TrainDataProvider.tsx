import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Train } from '../types/train';
import { TrainSearchParams } from '../entities/Train';
import { TrainService } from '../services/TrainService';
import { InMemoryTrainRepository, TrainRepository } from '../repositories/TrainRepository';
import { EnhancedTrainDataLoader, MockEnhancedTrainDataLoader } from '../services/EnhancedTrainDataLoader';
import { FastApiTrainService } from '../services/FastApiTrainService';
import { TrainAdapter } from '../adapters/TrainAdapter';
import { realTimeService } from '../services/RealTimeService';
import { ApiErrorHandler } from '../services/ErrorHandlingService';
import { trainData } from '../data/trainData';

interface TrainDataContextType {
  trainService: TrainService;
  trains: Train[];
  loading: boolean;
  error: string | null;
  isRealTimeConnected: boolean;
  lastUpdated: Date | null;
  refreshTrains: () => Promise<void>;
  searchTrains: (params: TrainSearchParams) => Promise<Train[]>;
  updateTrain: (train: Train) => Promise<void>;
  batchUpdateTrains: (trainIds: string[], updates: Partial<Train>) => Promise<void>;
  enableRealTime: () => void;
  disableRealTime: () => void;
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
  children: ReactNode;
}

export function TrainDataProvider({ children }: TrainDataProviderProps) {
  // Initialize data loader and service based on environment
  const useRealApi = process.env.NODE_ENV === 'production' || process.env.REACT_APP_USE_REAL_API === 'true';
  
  const [dataLoader] = useState(() => {
    if (useRealApi) {
      return new EnhancedTrainDataLoader(true);
    } else {
      return new MockEnhancedTrainDataLoader(TrainAdapter.toEntityList(trainData));
    }
  });
  
  const [trainRepository] = useState<TrainRepository>(() => {
    return useRealApi ? new FastApiTrainService() : new InMemoryTrainRepository();
  });
  
  const [trainService] = useState(() => new TrainService(trainRepository));
  
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRealTimeConnected, setIsRealTimeConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refreshTrains = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await dataLoader.load();
      const trainEntities = data.trains;
      const adaptedTrains = TrainAdapter.fromEntityList(trainEntities);
      
      setTrains(adaptedTrains);
      setLastUpdated(data.lastUpdated);
      
      // Seed the in-memory repository with the loaded data
      if (trainRepository instanceof InMemoryTrainRepository) {
        trainRepository.seed(trainEntities);
      }
    } catch (err) {
      const errorMessage = ApiErrorHandler.handleApiError(err);
      setError(errorMessage);
      ApiErrorHandler.logError('TrainDataProvider.refreshTrains', err);
    } finally {
      setLoading(false);
    }
  };

  const searchTrains = async (params: TrainSearchParams): Promise<Train[]> => {
    try {
      const data = await dataLoader.load(params);
      const trainEntities = data.trains;
      return TrainAdapter.fromEntityList(trainEntities);
    } catch (err) {
      const errorMessage = ApiErrorHandler.handleApiError(err);
      setError(errorMessage);
      ApiErrorHandler.logError('TrainDataProvider.searchTrains', err, { params });
      return [];
    }
  };

  const updateTrain = async (train: Train): Promise<void> => {
    try {
      const trainEntity = TrainAdapter.toEntity(train);
      const updatedEntity = await trainService.updateTrain(trainEntity.id, TrainAdapter.toUpdateDto(train));
      const updatedTrain = TrainAdapter.fromEntity(updatedEntity);
      
      setTrains(prevTrains => 
        prevTrains.map(t => t.id === updatedTrain.id ? updatedTrain : t)
      );
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = ApiErrorHandler.handleApiError(err);
      setError(errorMessage);
      ApiErrorHandler.logError('TrainDataProvider.updateTrain', err, { trainId: train.id });
    }
  };

  const batchUpdateTrains = async (trainIds: string[], updates: Partial<Train>): Promise<void> => {
    try {
      const updateDto = TrainAdapter.toUpdateDto(updates);
      const updatedEntities = await trainService.batchUpdateTrains(trainIds, updateDto);
      const updatedTrains = TrainAdapter.fromEntityList(updatedEntities);
      
      setTrains(prevTrains => 
        prevTrains.map(train => {
          const updatedTrain = updatedTrains.find(ut => ut.id === train.id);
          return updatedTrain || train;
        })
      );
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = ApiErrorHandler.handleApiError(err);
      setError(errorMessage);
      ApiErrorHandler.logError('TrainDataProvider.batchUpdateTrains', err, { trainIds, updates });
    }
  };

  const enableRealTime = (): void => {
    if (dataLoader instanceof EnhancedTrainDataLoader) {
      dataLoader.enableRealTimeUpdates();
      setIsRealTimeConnected(true);
    }
  };

  const disableRealTime = (): void => {
    if (dataLoader instanceof EnhancedTrainDataLoader) {
      dataLoader.disableRealTimeUpdates();
      setIsRealTimeConnected(false);
    }
  };

  // Load initial data
  useEffect(() => {
    refreshTrains();
  }, []);

  // Setup real-time connection status monitoring
  useEffect(() => {
    if (!useRealApi) return;

    const checkRealTimeStatus = () => {
      const status = realTimeService.getConnectionStatus();
      setIsRealTimeConnected(status.connected);
    };

    // Check initial status
    checkRealTimeStatus();

    // Monitor connection status
    const interval = setInterval(checkRealTimeStatus, 5000);

    return () => {
      clearInterval(interval);
      if (dataLoader instanceof EnhancedTrainDataLoader) {
        dataLoader.destroy();
      }
    };
  }, [useRealApi, dataLoader]);

  const contextValue: TrainDataContextType = {
    trainService,
    trains,
    loading,
    error,
    isRealTimeConnected,
    lastUpdated,
    refreshTrains,
    searchTrains,
    updateTrain,
    batchUpdateTrains,
    enableRealTime,
    disableRealTime
  };

  return (
    <TrainDataContext.Provider value={contextValue}>
      {children}
    </TrainDataContext.Provider>
  );
}
