import { TrainEntity } from '../entities/Train';
import { getApiConfig } from '../config/api';
import { ApiErrorHandler } from './ErrorHandlingService';

export interface TrainUpdateEvent {
  type: 'train_updated' | 'train_created' | 'train_deleted';
  train: TrainEntity;
  timestamp: string;
}

export interface RealTimeConfig {
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
  heartbeatInterval?: number;
}

export class RealTimeService {
  private eventSource?: EventSource;
  private reconnectAttempts = 0;
  private isConnected = false;
  private listeners: Map<string, Set<(event: TrainUpdateEvent) => void>> = new Map();
  private config: Required<RealTimeConfig>;
  private heartbeatTimer?: NodeJS.Timeout;

  constructor(config: RealTimeConfig = {}) {
    this.config = {
      maxReconnectAttempts: config.maxReconnectAttempts ?? 5,
      reconnectDelay: config.reconnectDelay ?? 3000,
      heartbeatInterval: config.heartbeatInterval ?? 30000
    };
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      const apiConfig = getApiConfig();
      const streamUrl = `${apiConfig.BASE_URL.replace('/api/v1/trains/simplified', '')}/api/v1/events/stream`;
      
      this.eventSource = new EventSource(streamUrl);
      
      this.eventSource.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.startHeartbeat();
        console.log('Real-time connection established');
      };

      this.eventSource.onmessage = (event) => {
        try {
          const trainEvent: TrainUpdateEvent = JSON.parse(event.data);
          this.handleTrainUpdate(trainEvent);
        } catch (error) {
          ApiErrorHandler.logError('RealTimeService.onmessage', error, { eventData: event.data });
        }
      };

      this.eventSource.onerror = (event) => {
        this.isConnected = false;
        this.stopHeartbeat();
        
        if (this.reconnectAttempts < this.config.maxReconnectAttempts) {
          this.reconnectAttempts++;
          console.warn(`Real-time connection error. Reconnecting... (${this.reconnectAttempts}/${this.config.maxReconnectAttempts})`);
          
          setTimeout(() => {
            this.connect();
          }, this.config.reconnectDelay * this.reconnectAttempts);
        } else {
          console.error('Real-time connection failed after maximum reconnect attempts');
          this.disconnect();
        }
      };

    } catch (error) {
      ApiErrorHandler.logError('RealTimeService.connect', error);
      throw error;
    }
  }

  disconnect(): void {
    this.isConnected = false;
    this.stopHeartbeat();
    
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = undefined;
    }
    
    this.listeners.clear();
    console.log('Real-time connection closed');
  }

  subscribe(eventType: string, callback: (event: TrainUpdateEvent) => void): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    
    this.listeners.get(eventType)!.add(callback);
    
    // Auto-connect when first subscriber is added
    if (!this.isConnected && this.getTotalListeners() === 1) {
      this.connect().catch(error => {
        ApiErrorHandler.logError('RealTimeService.auto-connect', error);
      });
    }

    // Return unsubscribe function
    return () => {
      const eventListeners = this.listeners.get(eventType);
      if (eventListeners) {
        eventListeners.delete(callback);
        if (eventListeners.size === 0) {
          this.listeners.delete(eventType);
        }
      }
      
      // Auto-disconnect when no listeners remain
      if (this.getTotalListeners() === 0) {
        this.disconnect();
      }
    };
  }

  subscribeToTrainUpdates(callback: (train: TrainEntity) => void): () => void {
    return this.subscribe('train_updated', (event) => callback(event.train));
  }

  subscribeToTrainCreations(callback: (train: TrainEntity) => void): () => void {
    return this.subscribe('train_created', (event) => callback(event.train));
  }

  subscribeToTrainDeletions(callback: (train: TrainEntity) => void): () => void {
    return this.subscribe('train_deleted', (event) => callback(event.train));
  }

  subscribeToAllTrainEvents(callback: (event: TrainUpdateEvent) => void): () => void {
    const unsubscribeFunctions = [
      this.subscribe('train_updated', callback),
      this.subscribe('train_created', callback),
      this.subscribe('train_deleted', callback)
    ];

    return () => {
      unsubscribeFunctions.forEach(unsub => unsub());
    };
  }

  isConnectionActive(): boolean {
    return this.isConnected;
  }

  getConnectionStatus(): {
    connected: boolean;
    reconnectAttempts: number;
    totalListeners: number;
  } {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      totalListeners: this.getTotalListeners()
    };
  }

  private handleTrainUpdate(event: TrainUpdateEvent): void {
    const eventListeners = this.listeners.get(event.type);
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          ApiErrorHandler.logError('RealTimeService.handleTrainUpdate', error, { event });
        }
      });
    }
  }

  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.eventSource?.readyState !== EventSource.OPEN) {
        this.isConnected = false;
        this.connect().catch(error => {
          ApiErrorHandler.logError('RealTimeService.heartbeat-reconnect', error);
        });
      }
    }, this.config.heartbeatInterval);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = undefined;
    }
  }

  private getTotalListeners(): number {
    return Array.from(this.listeners.values())
      .reduce((total, listeners) => total + listeners.size, 0);
  }
}

// Singleton instance for global use
export const realTimeService = new RealTimeService();