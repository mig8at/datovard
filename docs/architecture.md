# Architecture Overview

## Structure
```
src/
├── types/              # Interfaces y tipos TypeScript
├── errors/             # Errores personalizados
├── repositories/       # Acceso a datos (in-memory DB)
├── services/           # Lógica de negocio
├── controllers/        # Handlers HTTP
├── routes/             # Definición de rutas
└── index.ts            # Entry point
```

## Data Flow
```
HTTP Request
    ↓
StoreController (validación y parseo)
    ↓
StoreService (lógica de negocio)
    ↓
StoreRepository + DistanceService (cálculos)
    ↓
CallLogRepository (registro de llamadas)
    ↓
HTTP Response
```

## Components

### 1. **Repositories**
- `StoreRepository`: Gestiona datos de tiendas (in-memory)
- `CallLogRepository`: Registra cada consulta realizada

### 2. **Services**
- `DistanceService`: Calcula distancias usando Haversine
- `StoreService`: Orquesta la búsqueda de tienda más cercana

### 3. **Controller**
- `StoreController`: Maneja requests HTTP y errores

### 4. **Types**
- Interfaces para Store, CallLog, StoreWithDistance

## In-Memory Database

La "base de datos" es una simple lista de objetos Store en memoria:
```typescript
stores: Store[] = [
  {
    storeId: 'store-001',
    storeName: 'Store Name',
    isOpen: true,
    latitude: 4.7110,
    longitude: -74.0721,
    nextDeliveryTime: Date,
  }
]
```

**Ventajas:**
- Rápido (< 300ms)
- Fácil de testear
- Suficiente para prueba técnica
- Fácil migrar a BD real después

## SOLID Principles Applied

✅ **Single Responsibility**: Cada clase hace una cosa

✅ **Open/Closed**: Fácil extender sin modificar

✅ **Liskov Substitution**: Interfaces bien definidas

✅ **Interface Segregation**: Métodos específicos

✅ **Dependency Inversion**: Services reciben dependencias

## Geospatial Features

- Cálculo de distancia Haversine
- Validación de coordenadas
- Ordenamiento por distancia
- Filtro de tiendas abiertas
