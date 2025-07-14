import { useEffect, useState, useCallback } from 'react';
import { Train } from '../types/train';
import { realTimeService, TrainUpdateEvent } from '../services/RealTimeService';
import { TrainAdapter } from '../adapters/TrainAdapter';
import { useTrainData } from '../providers/TrainDataProvider';

export interface UseRealTimeTrainsOptions {
  enableAutoRefresh?: boolean;
  refreshDelay?: number;
}

export interface UseRealTimeTrainsReturn {
  isConnected: boolean;
  lastUpdate: Date | null;
  connectionStatus: {
    connected: boolean;
    reconnectAttempts: number;
    totalListeners: number;
  };
  enableRealTime: () => void;
  disableRealTime: () => void;
}

export function useRealTimeTrains(options: UseRealTimeTrainsOptions = {}): UseRealTimeTrainsReturn {
  const { enableAutoRefresh = true, refreshDelay = 1000 } = options;
  const { refreshTrains } = useTrainData();
  
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [connectionStatus, setConnectionStatus] = useState({
    connected: false,
    reconnectAttempts: 0,
    totalListeners: 0
  });

  const updateConnectionStatus = useCallback(() => {
    setConnectionStatus(realTimeService.getConnectionStatus());
  }, []);

  const handleTrainUpdate = useCallback((event: TrainUpdateEvent) => {
    setLastUpdate(new Date());
    
    if (enableAutoRefresh) {
      // Debounce refresh to avoid too many rapid updates
      setTimeout(() => {
        refreshTrains().catch(error => {
          console.error('Failed to refresh trains after real-time update:', error);
        });
      }, refreshDelay);
    }
  }, [enableAutoRefresh, refreshDelay, refreshTrains]);

  const enableRealTime = useCallback(() => {
    realTimeService.subscribeToAllTrainEvents(handleTrainUpdate);
    updateConnectionStatus();
  }, [handleTrainUpdate, updateConnectionStatus]);

  const disableRealTime = useCallback(() => {
    realTimeService.disconnect();
    updateConnectionStatus();
  }, [updateConnectionStatus]);

  useEffect(() => {
    // Monitor connection status
    const interval = setInterval(updateConnectionStatus, 2000);
    
    return () => {
      clearInterval(interval);
    };
  }, [updateConnectionStatus]);

  return {
    isConnected: connectionStatus.connected,
    lastUpdate,
    connectionStatus,
    enableRealTime,
    disableRealTime
  };
}

// Hook for subscribing to specific train updates
export function useTrainUpdates(trainId?: string): {
  lastUpdate: Date | null;
  isConnected: boolean;
} {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = realTimeService.subscribeToTrainUpdates((train) => {
      if (!trainId || train.id === trainId) {
        setLastUpdate(new Date());
      }
    });

    // Monitor connection status
    const statusInterval = setInterval(() => {
      setIsConnected(realTimeService.isConnectionActive());
    }, 2000);

    return () => {
      unsubscribe();
      clearInterval(statusInterval);
    };
  }, [trainId]);

  return { lastUpdate, isConnected };
}