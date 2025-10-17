import { Router } from 'express';
import { StoreController } from '../controllers/storeController';

export const createStoreRoutes = (controller: StoreController): Router => {
  const router = Router();

  /**
   * Encuentra la tienda más cercana a las coordenadas dadas
   */
  router.get('/closest', controller.findClosestStore);

  /**
   * Obtiene todas las tiendas ordenadas por distancia
   */
  router.get('/nearby', controller.getAllStoresOrderedByDistance);

  return router;
};
