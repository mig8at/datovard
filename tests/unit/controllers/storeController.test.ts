import { StoreController } from '../../../src/controllers/storeController';
import { StoreService } from '../../../src/services/storeService';
import { StoreRepository } from '../../../src/repositories/storeRepository';
import { CallLogRepository } from '../../../src/repositories/callLogRepository';
import { DistanceService } from '../../../src/services/distanceService';
import { Request, Response } from 'express';

describe('StoreController', () => {
  let controller: StoreController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    const storeRepository = new StoreRepository();
    const callLogRepository = new CallLogRepository();
    const distanceService = new DistanceService();
    const service = new StoreService(storeRepository, callLogRepository, distanceService);
    controller = new StoreController(service);

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('findClosestStore', () => {
    it('should return closest store with valid coordinates', () => {
      mockReq = {
        query: {
          latitude: '4.7110',
          longitude: '-74.0721',
        },
      };

      controller.findClosestStore(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
      const response = (mockRes.json as jest.Mock).mock.calls[0][0];
      expect(response).toHaveProperty('storeId');
      expect(response).toHaveProperty('distanceKm');
    });

    it('should return 400 for missing coordinates', () => {
      mockReq = {
        query: {
          latitude: '4.7110',
        },
      };

      controller.findClosestStore(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('should return 400 for invalid coordinates', () => {
      mockReq = {
        query: {
          latitude: 'invalid',
          longitude: '-74.0721',
        },
      };

      controller.findClosestStore(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe('getAllStoresOrderedByDistance', () => {
    it('should return stores ordered by distance', () => {
      mockReq = {
        query: {
          latitude: '4.7110',
          longitude: '-74.0721',
        },
      };

      controller.getAllStoresOrderedByDistance(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
      const response = (mockRes.json as jest.Mock).mock.calls[0][0];
      expect(response).toHaveProperty('stores');
      expect(response).toHaveProperty('totalStores');
    });
  });
});
