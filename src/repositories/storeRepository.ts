import { Store } from '../types/store';

export class StoreRepository {
  private stores: Store[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.stores = [
      {
        storeId: 'store-001',
        storeName: 'Convenience Store Downtown',
        isOpen: true,
        latitude: 4.7110,
        longitude: -74.0721,
        nextDeliveryTime: new Date(Date.now() + 30 * 60000),
      },
      {
        storeId: 'store-002',
        storeName: 'Convenience Store North',
        isOpen: true,
        latitude: 4.7500,
        longitude: -74.0300,
        nextDeliveryTime: new Date(Date.now() + 45 * 60000),
      },
      {
        storeId: 'store-003',
        storeName: 'Convenience Store South',
        isOpen: false,
        latitude: 4.6500,
        longitude: -74.0800,
        nextDeliveryTime: new Date(Date.now() + 60 * 60000),
      },
      {
        storeId: 'store-004',
        storeName: 'Convenience Store East',
        isOpen: true,
        latitude: 4.7200,
        longitude: -74.0200,
        nextDeliveryTime: new Date(Date.now() + 20 * 60000),
      },
      {
        storeId: 'store-005',
        storeName: 'Convenience Store West',
        isOpen: true,
        latitude: 4.7000,
        longitude: -74.1000,
        nextDeliveryTime: new Date(Date.now() + 50 * 60000),
      },
    ];
  }

  getAllStores(): Store[] {
    return this.stores;
  }

  getStoreById(id: string): Store | null {
    return this.stores.find((store) => store.storeId === id) || null;
  }

  getOpenStores(): Store[] {
    return this.stores.filter((store) => store.isOpen);
  }

  addStore(store: Store): void {
    this.stores.push(store);
  }

  getAllStoresForGeoSearch(): Store[] {
    return this.stores;
  }
}
