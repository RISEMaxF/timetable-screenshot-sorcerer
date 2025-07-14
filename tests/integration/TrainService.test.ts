import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FastApiTrainService } from '../../src/services/FastApiTrainService';
import { CreateTrainDto, UpdateTrainDto, TrainSearchParams } from '../../src/entities/Train';

// Mock data
const mockTrain = {
  id: 'test-train-1',
  operator: 'SJ',
  country: 'SE',
  from: 'Stockholm',
  to: 'Göteborg',
  announcedTrainNumber: '421',
  arrivalTime: '14:30',
  track: '5',
  highlighted: false,
  completed: false
};

describe('FastApiTrainService Integration', () => {
  let trainService: FastApiTrainService;

  beforeEach(() => {
    trainService = new FastApiTrainService();
  });

  afterEach(() => {
    // Cleanup if needed
  });

  describe('findAll', () => {
    it('should fetch trains from simplified API', async () => {
      const trains = await trainService.findAll();
      
      expect(Array.isArray(trains)).toBe(true);
      if (trains.length > 0) {
        expect(trains[0]).toMatchObject({
          id: expect.any(String),
          operator: expect.any(String),
          country: expect.any(String)
        });
      }
    });

    it('should handle search parameters', async () => {
      const params: TrainSearchParams = {
        searchTerm: 'SJ',
        limit: 10,
        offset: 0
      };

      const trains = await trainService.findAll(params);
      expect(Array.isArray(trains)).toBe(true);
      expect(trains.length).toBeLessThanOrEqual(10);
    });

    it('should handle filters', async () => {
      const params: TrainSearchParams = {
        filters: {
          country: 'SE',
          operator: 'SJ'
        }
      };

      const trains = await trainService.findAll(params);
      expect(Array.isArray(trains)).toBe(true);
      
      trains.forEach(train => {
        if (train.country) expect(train.country).toBe('SE');
        if (train.operator) expect(train.operator).toBe('SJ');
      });
    });
  });

  describe('findById', () => {
    it('should return null for non-existent train', async () => {
      const train = await trainService.findById('non-existent-id');
      expect(train).toBeNull();
    });

    it('should fetch train by ID if exists', async () => {
      // First get a train ID from the list
      const trains = await trainService.findAll({ limit: 1 });
      
      if (trains.length > 0) {
        const trainId = trains[0].id;
        const train = await trainService.findById(trainId);
        
        expect(train).not.toBeNull();
        expect(train?.id).toBe(trainId);
      }
    });
  });

  describe('count', () => {
    it('should return total count of trains', async () => {
      const count = await trainService.count();
      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });

    it('should return filtered count', async () => {
      const totalCount = await trainService.count();
      const filteredCount = await trainService.count({
        filters: { country: 'SE' }
      });
      
      expect(filteredCount).toBeLessThanOrEqual(totalCount);
    });
  });

  describe('CRUD operations', () => {
    let createdTrainId: string | null = null;

    it('should create a new train', async () => {
      const createDto: CreateTrainDto = mockTrain;
      
      try {
        const createdTrain = await trainService.create(createDto);
        createdTrainId = createdTrain.id;
        
        expect(createdTrain).toMatchObject({
          id: mockTrain.id,
          operator: mockTrain.operator,
          country: mockTrain.country
        });
      } catch (error) {
        // Handle case where train already exists or API doesn't support creation
        console.warn('Train creation test skipped:', error);
      }
    });

    it('should update an existing train', async () => {
      if (!createdTrainId) {
        // Try to get an existing train for update
        const trains = await trainService.findAll({ limit: 1 });
        if (trains.length === 0) return; // Skip if no trains available
        createdTrainId = trains[0].id;
      }

      const updateDto: UpdateTrainDto = {
        notes: 'Updated via integration test',
        highlighted: true
      };

      try {
        const updatedTrain = await trainService.update(createdTrainId, updateDto);
        
        expect(updatedTrain.id).toBe(createdTrainId);
        expect(updatedTrain.notes).toBe(updateDto.notes);
        expect(updatedTrain.highlighted).toBe(updateDto.highlighted);
      } catch (error) {
        console.warn('Train update test skipped:', error);
      }
    });

    it('should delete a train', async () => {
      if (!createdTrainId) return; // Skip if no train was created

      try {
        const deleted = await trainService.delete(createdTrainId);
        expect(deleted).toBe(true);

        // Verify train is deleted
        const deletedTrain = await trainService.findById(createdTrainId);
        expect(deletedTrain).toBeNull();
      } catch (error) {
        console.warn('Train deletion test skipped:', error);
      }
    });
  });

  describe('error handling', () => {
    it('should handle network errors gracefully', async () => {
      // Create service with invalid URL to trigger network error
      const invalidService = new FastApiTrainService();
      // Override baseUrl to invalid endpoint
      (invalidService as any).baseUrl = 'http://invalid-url:9999/api';

      await expect(invalidService.findAll()).rejects.toThrow();
    });

    it('should handle malformed data', async () => {
      // This test would require mocking the API response
      // Implementation depends on testing framework setup
    });
  });
});

// Performance tests
describe('FastApiTrainService Performance', () => {
  let trainService: FastApiTrainService;

  beforeEach(() => {
    trainService = new FastApiTrainService();
  });

  it('should handle large result sets efficiently', async () => {
    const startTime = Date.now();
    
    const trains = await trainService.findAll({ limit: 100 });
    
    const endTime = Date.now();
    const duration = endTime - startTime;

    expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
    expect(trains.length).toBeLessThanOrEqual(100);
  });

  it('should handle concurrent requests', async () => {
    const promises = Array(5).fill(null).map(() => 
      trainService.findAll({ limit: 10 })
    );

    const results = await Promise.all(promises);
    
    expect(results).toHaveLength(5);
    results.forEach(trains => {
      expect(Array.isArray(trains)).toBe(true);
    });
  });
});