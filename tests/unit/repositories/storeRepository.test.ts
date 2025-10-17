import { StoreRepository } from '../../../src/repositories/storeRepository';

describe('StoreRepository', () => {
  let repository: StoreRepository;

  beforeEach(() => {
    repository = new StoreRepository();
  });

  describe('getAllStores', () => {
    it('should return array of stores', () => {
      const stores = repository.getAllStores();
      expect(Array.isArray(stores)).toBe(true);
      expect(stores.length).toBeGreaterThan(0);
    });

    it('should return stores with all required fields', () => {
      const stores = repository.getAllStores();
      stores.forEach((store) => {
        expect(store).toHaveProperty('storeId');
        expect(store).toHaveProperty('storeName');
        expect(store).toHaveProperty('isOpen');
        expect(store).toHaveProperty('latitude');
        expect(store).toHaveProperty('longitude');
        expect(store).toHaveProperty('nextDeliveryTime');
      });
    });
  });

  describe('getStoreById', () => {
    it('should return store by id', () => {
      const store = repository.getStoreById('store-001');
      expect(store).not.toBeNull();
      expect(store?.storeId).toBe('store-001');
    });

    it('should return null for non-existent id', () => {
      const store = repository.getStoreById('non-existent');
      expect(store).toBeNull();
    });
  });

  describe('getOpenStores', () => {
    it('should return only open stores', () => {
      const openStores = repository.getOpenStores();
      openStores.forEach((store) => {
        expect(store.isOpen).toBe(true);
      });
    });

    it('should return at least one open store', () => {
      const openStores = repository.getOpenStores();
      expect(openStores.length).toBeGreaterThan(0);
    });
  });

  describe('addStore', () => {
    it('should add a new store', () => {
      const initialCount = repository.getAllStores().length;
      
      repository.addStore({
        storeId: 'new-store',
        storeName: 'New Store',
        isOpen: true,
        latitude: 4.7110,
        longitude: -74.0721,
        nextDeliveryTime: new Date(),
      });

      expect(repository.getAllStores().length).toBe(initialCount + 1);
      expect(repository.getStoreById('new-store')).not.toBeNull();
    });
  });
});
