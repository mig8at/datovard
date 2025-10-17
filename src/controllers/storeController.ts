import { Request, Response } from 'express';
import { StoreService } from '../services/storeService';
import { ValidationError, NotFoundError, InternalError } from '../errors/customErrors';

export class StoreController {
  constructor(private storeService: StoreService) {}

  /**
   * Endpoint para encontrar la tienda más cercana
   * Query params: latitude, longitude, filterByOpen (optional)
   */
  findClosestStore = (req: Request, res: Response): void => {
    try {
      const { latitude, longitude, filterByOpen } = req.query;

      // Validar parámetros requeridos
      if (!latitude || !longitude) {
        res.status(400).json({
          error: 'Missing required parameters: latitude and longitude',
        });
        return;
      }

      const lat = parseFloat(latitude as string);
      const lon = parseFloat(longitude as string);
      const filter = filterByOpen !== 'false';

      // Validar que sean números
      if (isNaN(lat) || isNaN(lon)) {
        res.status(400).json({
          error: 'Invalid coordinates: latitude and longitude must be numbers',
        });
        return;
      }

      const closestStore = this.storeService.findClosestStore(lat, lon, filter);

      res.status(200).json({
        storeId: closestStore.storeId,
        storeName: closestStore.storeName,
        isOpen: closestStore.isOpen,
        coordinates: {
          latitude: closestStore.latitude,
          longitude: closestStore.longitude,
        },
        nextDeliveryTime: closestStore.nextDeliveryTime.toISOString(),
        distanceKm: closestStore.distanceKm,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  /**
   * Endpoint para obtener todas las tiendas ordenadas por distancia
   */
  getAllStoresOrderedByDistance = (req: Request, res: Response): void => {
    try {
      const { latitude, longitude, filterByOpen } = req.query;

      if (!latitude || !longitude) {
        res.status(400).json({
          error: 'Missing required parameters: latitude and longitude',
        });
        return;
      }

      const lat = parseFloat(latitude as string);
      const lon = parseFloat(longitude as string);
      const filter = filterByOpen !== 'false';

      if (isNaN(lat) || isNaN(lon)) {
        res.status(400).json({
          error: 'Invalid coordinates: latitude and longitude must be numbers',
        });
        return;
      }

      const stores = this.storeService.getAllStoresOrderedByDistance(lat, lon, filter);

      res.status(200).json({
        stores: stores.map((store) => ({
          storeId: store.storeId,
          storeName: store.storeName,
          isOpen: store.isOpen,
          coordinates: {
            latitude: store.latitude,
            longitude: store.longitude,
          },
          nextDeliveryTime: store.nextDeliveryTime.toISOString(),
          distanceKm: store.distanceKm,
        })),
        totalStores: stores.length,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  /**
   * Manejo centralizado de errores
   */
  private handleError(error: unknown, res: Response): void {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof InternalError) {
      res.status(500).json({ error: error.message });
    } else {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ error: message });
    }
  }
}
