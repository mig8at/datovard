import { StoreRepository } from '../repositories/storeRepository';
import { CallLogRepository } from '../repositories/callLogRepository';
import { DistanceService } from './distanceService';
import { StoreWithDistance } from '../types/store';
import { NotFoundError, ValidationError } from '../errors/customErrors';

export class StoreService {
  constructor(
    private storeRepository: StoreRepository,
    private callLogRepository: CallLogRepository,
    private distanceService: DistanceService
  ) {}


  findClosestStore(
    latitude: number,
    longitude: number,
    filterByOpen: boolean = true
  ): StoreWithDistance {
    // Validar coordenadas
    if (!this.distanceService.isValidCoordinates(latitude, longitude)) {
      throw new ValidationError('Invalid coordinates: latitude and longitude must be within valid ranges');
    }

    // Obtener tiendas
    let stores = this.storeRepository.getAllStores();

    if (filterByOpen) {
      stores = stores.filter((store) => store.isOpen);
    }

    if (stores.length === 0) {
      throw new NotFoundError(
        filterByOpen
          ? 'No open stores available'
          : 'No stores available'
      );
    }

    // Calcular distancias
    let closestStore: StoreWithDistance | null = null;
    let minDistance = Infinity;

    for (const store of stores) {
      const distance = this.distanceService.calculateDistance(
        latitude,
        longitude,
        store.latitude,
        store.longitude
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestStore = {
          ...store,
          distanceKm: distance,
        };
      }
    }

    if (!closestStore) {
      throw new NotFoundError('Could not find closest store');
    }

    // Registrar la llamada
    this.callLogRepository.log({
      clientLatitude: latitude,
      clientLongitude: longitude,
      selectedStoreId: closestStore.storeId,
      selectedStoreName: closestStore.storeName,
      distanceKm: closestStore.distanceKm,
      timestamp: new Date(),
    });

    return closestStore;
  }

  /**
   * Obtiene todas las tiendas ordenadas por distancia
   */
  getAllStoresOrderedByDistance(
    latitude: number,
    longitude: number,
    filterByOpen: boolean = true
  ): StoreWithDistance[] {
    if (!this.distanceService.isValidCoordinates(latitude, longitude)) {
      throw new ValidationError('Invalid coordinates');
    }

    let stores = this.storeRepository.getAllStores();

    if (filterByOpen) {
      stores = stores.filter((store) => store.isOpen);
    }

    const storesWithDistance: StoreWithDistance[] = stores.map((store) => ({
      ...store,
      distanceKm: this.distanceService.calculateDistance(
        latitude,
        longitude,
        store.latitude,
        store.longitude
      ),
    }));

    return storesWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);
  }
}
