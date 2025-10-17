# InstaStore

Microservice para encontrar la tienda de conveniencia más cercana a entregar órdenes B2B.

## Instalación
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```

Abre `http://localhost:3000/health`

## Build
```bash
npm run build
npm start
```

## Endpoints

### Encontrar tienda más cercana
```bash
curl "http://localhost:3000/api/stores/closest?latitude=4.7110&longitude=-74.0721"
```

### Ver todas las tiendas por distancia
```bash
curl "http://localhost:3000/api/stores/nearby?latitude=4.7110&longitude=-74.0721"
```

### Health check
```bash
curl "http://localhost:3000/health"
```

## Documentación

Ver `/docs/api.md` para documentación completa de endpoints
Ver `/docs/architecture.md` para detalles arquitectónicos

## Features

✅ Búsqueda de tienda más cercana
✅ Cálculo de distancia geoespacial (Haversine)
✅ Filtro de tiendas abiertas
✅ Registro de llamadas
✅ Respuesta < 300ms
✅ Validación de coordenadas
✅ Manejo de errores

## Technologies

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: In-Memory
- **Geospatial**: Haversine formula
