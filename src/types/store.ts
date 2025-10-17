export interface Store {
  storeId: string;
  storeName: string;
  isOpen: boolean;
  latitude: number;
  longitude: number;
  nextDeliveryTime: Date;
}

export interface CallLog {
  id: string;
  clientLatitude: number;
  clientLongitude: number;
  selectedStoreId: string;
  selectedStoreName: string;
  distanceKm: number;
  timestamp: Date;
}

export interface StoreWithDistance extends Store {
  distanceKm: number;
}
