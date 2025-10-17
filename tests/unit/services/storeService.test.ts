import { StoreService } from '../../../src/services/storeService';
import { StoreRepository } from '../../../src/repositories/storeRepository';
import { CallLogRepository } from '../../../src/repositories/callLogRepository';
import { DistanceService } from '../../../src/services/distanceService';
import { ValidationError, NotFoundError } from '../../../src/errors/customErrors';

describe('StoreService', () => {
  let service: StoreService;
  let storeRepository: StoreRepository;
  let callLogRepository: CallLogRepository;
  let distanceService: DistanceService;

  beforeEach(() => {
    storeRepository = new StoreRepository();
    callLogRepository = new CallLogRepository();
    distanceService = new DistanceService();
    service = new StoreService(storeRepository, callLogRepository, distanceService);
  });

  describe('findClosestStore', () => {
    it('should find closest store with valid coordinates', () => {
      // Usar coordenadas diferentes a store-001 para tener distancia > 0
      const result = service.findClosestStore(4.6500, -74.1000);

      expect(result).toHaveProperty('storeId');
      expect(result).toHaveProperty('storeName');
      expect(result).toHaveProperty('distanceKm');
      expect(result.distanceKm).toBeGreaterThanOrEqual(0);
    });

    it('should filter by open stores by default', () => {
      const result = service.findClosestStore(4.6500, -74.1000, true);
      expect(result.isOpen).toBe(true);
    });

    it('should log the call', () => {
      const initialLogCount = callLogRepository.getLogs().length;
      service.findClosestStore(4.6500, -74.1000);
      
      expect(callLogRepository.getLogs().length).toBe(initialLogCount + 1);
    });

    it('should throw ValidationError for invalid coordinates', () => {
      expect(() => service.findClosestStore(91, -74.0721)).toThrow(ValidationError);
      expect(() => service.findClosestStore(4.7110, 181)).toThrow(ValidationError);
    });

    it('should include distance in response', () => {
      const result = service.findClosestStore(4.8000, -74.1000);
      expect(typeof result.distanceKm).toBe('number');
      expect(result.distanceKm).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getAllStoresOrderedByDistance', () => {
    it('should return stores ordered by distance', () => {
      const stores = service.getAllStoresOrderedByDistance(4.6500, -74.1000);

      expect(Array.isArray(stores)).toBe(true);
      expect(stores.length).toBeGreaterThan(0);

      // Verificar que están ordenados
      for (let i = 0; i < stores.length - 1; i++) {
        expect(stores[i].distanceKm).toBeLessThanOrEqual(stores[i + 1].distanceKm);
      }
    });

    it('should throw ValidationError for invalid coordinates', () => {
      expect(() => service.getAllStoresOrderedByDistance(91, -74.0721)).toThrow(ValidationError);
    });

    it('should filter by open stores when requested', () => {
      const stores = service.getAllStoresOrderedByDistance(4.6500, -74.1000, true);
      stores.forEach((store) => {
        expect(store.isOpen).toBe(true);
      });
    });
  });
});
