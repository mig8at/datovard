import express from 'express';
import dotenv from 'dotenv';
import { StoreRepository } from './repositories/storeRepository';
import { CallLogRepository } from './repositories/callLogRepository';
import { DistanceService } from './services/distanceService';
import { StoreService } from './services/storeService';
import { StoreController } from './controllers/storeController';
import { createStoreRoutes } from './routes/storeRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Inicializar repositorios y servicios
const storeRepository = new StoreRepository();
const callLogRepository = new CallLogRepository();
const distanceService = new DistanceService();
const storeService = new StoreService(
  storeRepository,
  callLogRepository,
  distanceService
);
const storeController = new StoreController(storeService);

// Rutas
app.use('/api/stores', createStoreRoutes(storeController));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 InstaStore running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;
