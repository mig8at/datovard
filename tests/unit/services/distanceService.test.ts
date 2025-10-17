import { DistanceService } from '../../../src/services/distanceService';

describe('DistanceService', () => {
  let service: DistanceService;

  beforeEach(() => {
    service = new DistanceService();
  });

  describe('calculateDistance', () => {
    it('should calculate distance between two points correctly', () => {
      // Bogotá (4.7110, -74.0721) a Medellín (6.2442, -75.5812)
      // Distancia real: ~238km
      const distance = service.calculateDistance(
        4.7110,    // Bogotá lat
        -74.0721,  // Bogotá lon
        6.2442,    // Medellín lat
        -75.5812   // Medellín lon
      );

      expect(distance).toBeGreaterThan(230);
      expect(distance).toBeLessThan(250);
    });

    it('should return 0 when coordinates are the same', () => {
      const distance = service.calculateDistance(4.7110, -74.0721, 4.7110, -74.0721);
      expect(distance).toBe(0);
    });

    it('should return positive distance for different coordinates', () => {
      const distance = service.calculateDistance(
        0, 0,
        1, 1
      );
      expect(distance).toBeGreaterThan(0);
    });
  });

  describe('isValidCoordinates', () => {
    it('should validate correct coordinates', () => {
      expect(service.isValidCoordinates(4.7110, -74.0721)).toBe(true);
      expect(service.isValidCoordinates(0, 0)).toBe(true);
      expect(service.isValidCoordinates(-90, -180)).toBe(true);
      expect(service.isValidCoordinates(90, 180)).toBe(true);
    });

    it('should reject invalid latitude', () => {
      expect(service.isValidCoordinates(91, 0)).toBe(false);
      expect(service.isValidCoordinates(-91, 0)).toBe(false);
    });

    it('should reject invalid longitude', () => {
      expect(service.isValidCoordinates(0, 181)).toBe(false);
      expect(service.isValidCoordinates(0, -181)).toBe(false);
    });
  });
});
