import { CallLogRepository } from '../../../src/repositories/callLogRepository';

describe('CallLogRepository', () => {
  let repository: CallLogRepository;

  beforeEach(() => {
    repository = new CallLogRepository();
  });

  describe('log', () => {
    it('should log a call', () => {
      repository.log({
        clientLatitude: 4.7110,
        clientLongitude: -74.0721,
        selectedStoreId: 'store-001',
        selectedStoreName: 'Test Store',
        distanceKm: 2.5,
        timestamp: new Date(),
      });

      expect(repository.getLogs().length).toBe(1);
    });

    it('should create unique ids for each log', () => {
      const now = new Date();
      repository.log({
        clientLatitude: 4.7110,
        clientLongitude: -74.0721,
        selectedStoreId: 'store-001',
        selectedStoreName: 'Test Store',
        distanceKm: 2.5,
        timestamp: now,
      });

      repository.log({
        clientLatitude: 4.7200,
        clientLongitude: -74.0800,
        selectedStoreId: 'store-002',
        selectedStoreName: 'Test Store 2',
        distanceKm: 3.0,
        timestamp: now,
      });

      const logs = repository.getLogs();
      expect(logs[0].id).not.toBe(logs[1].id);
    });
  });

  describe('getLogs', () => {
    it('should return empty array initially', () => {
      expect(repository.getLogs().length).toBe(0);
    });
  });

  describe('getLogsByStoreId', () => {
    it('should filter logs by store id', () => {
      const now = new Date();
      repository.log({
        clientLatitude: 4.7110,
        clientLongitude: -74.0721,
        selectedStoreId: 'store-001',
        selectedStoreName: 'Test Store',
        distanceKm: 2.5,
        timestamp: now,
      });

      repository.log({
        clientLatitude: 4.7200,
        clientLongitude: -74.0800,
        selectedStoreId: 'store-002',
        selectedStoreName: 'Test Store 2',
        distanceKm: 3.0,
        timestamp: now,
      });

      const logs = repository.getLogsByStoreId('store-001');
      expect(logs.length).toBe(1);
      expect(logs[0].selectedStoreId).toBe('store-001');
    });
  });

  describe('clearLogs', () => {
    it('should clear all logs', () => {
      repository.log({
        clientLatitude: 4.7110,
        clientLongitude: -74.0721,
        selectedStoreId: 'store-001',
        selectedStoreName: 'Test Store',
        distanceKm: 2.5,
        timestamp: new Date(),
      });

      repository.clearLogs();
      expect(repository.getLogs().length).toBe(0);
    });
  });
});
