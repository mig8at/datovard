# InstaStore API Documentation

## Overview
Microservice para encontrar la tienda de conveniencia más cercana basado en coordenadas geográficas.

## Endpoints

### 1. Find Closest Store

**Endpoint:** `GET /api/stores/closest`

**Description:** Encuentra la tienda más cercana a las coordenadas dadas.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| latitude | number | Yes | Latitud del cliente (-90 a 90) |
| longitude | number | Yes | Longitud del cliente (-180 a 180) |
| filterByOpen | boolean | No | Filtrar solo tiendas abiertas (default: true) |

**Success Response (200 OK):**
```json
{
  "storeId": "store-001",
  "storeName": "Convenience Store Downtown",
  "isOpen": true,
  "coordinates": {
    "latitude": 4.7110,
    "longitude": -74.0721
  },
  "nextDeliveryTime": "2024-10-17T15:30:00.000Z",
  "distanceKm": 2.50
}
```

**Error Responses:**
- `400 Bad Request`: Parámetros inválidos o faltantes
- `404 Not Found`: No hay tiendas disponibles
- `500 Internal Server Error`: Error del servidor

**Examples:**
```bash
# Find closest open store
curl "http://localhost:3000/api/stores/closest?latitude=4.7110&longitude=-74.0721"

# Find closest store (including closed ones)
curl "http://localhost:3000/api/stores/closest?latitude=4.7110&longitude=-74.0721&filterByOpen=false"
```

---

### 2. Get All Stores Ordered by Distance

**Endpoint:** `GET /api/stores/nearby`

**Description:** Obtiene todas las tiendas ordenadas por distancia a las coordenadas dadas.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| latitude | number | Yes | Latitud del cliente |
| longitude | number | Yes | Longitud del cliente |
| filterByOpen | boolean | No | Filtrar solo tiendas abiertas (default: true) |

**Success Response (200 OK):**
```json
{
  "stores": [
    {
      "storeId": "store-001",
      "storeName": "Convenience Store Downtown",
      "isOpen": true,
      "coordinates": {
        "latitude": 4.7110,
        "longitude": -74.0721
      },
      "nextDeliveryTime": "2024-10-17T15:30:00.000Z",
      "distanceKm": 2.50
    }
  ],
  "totalStores": 1
}
```

**Examples:**
```bash
# Get all nearby stores ordered by distance
curl "http://localhost:3000/api/stores/nearby?latitude=4.7110&longitude=-74.0721"
```

---

### 3. Health Check

**Endpoint:** `GET /health`

**Description:** Verifica que el servicio está funcionando.

**Success Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2024-10-17T15:30:00.000Z"
}
```

---

## Error Handling

All errors follow this format:
```json
{
  "error": "Error message describing what went wrong"
}
```

## Distance Calculation

La distancia se calcula usando la **fórmula de Haversine**, que computa la distancia de círculo máximo entre dos puntos en una esfera dada su longitud y latitud.

Formula:
```
a = sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)
c = 2 * atan2(√a, √(1−a))
d = R * c

donde R = 6371 km (radio de la Tierra)
```

## Response Time

- Target: < 300ms
- In-memory database ensures fast queries
