import { City, TravelMode, JourneyDetails } from '../types';

/**
 * Calculates the great-circle distance between two points on the Earth's surface
 * using the Haversine formula, then adjusts it for realistic routing based on transportation.
 */
export function calculateDistance(city1: City, city2: City, mode: TravelMode): number {
  if (city1.name === city2.name && city1.province === city2.province) {
    return 0;
  }

  const R = 6371; // Earth's radius in km
  const dLat = ((city2.lat - city1.lat) * Math.PI) / 180;
  const dLon = ((city2.lng - city1.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((city1.lat * Math.PI) / 180) *
      Math.cos((city2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const directDistance = R * c;

  // Realism multi-plier: road routing (car/train) requires traveling along topography and roads
  if (mode === 'car' || mode === 'train') {
    return Math.round(directDistance * 1.28 * 10) / 10; // 28% road winding factor
  } else {
    // Air travel pathing includes minor navigation holding/vectoring
    return Math.round(directDistance * 1.06 * 10) / 10; // 6% air routing factor
  }
}

/**
 * Estimates overall transit duration in decimal hours based on transport speed and overhead times.
 */
export function estimateDuration(distanceKm: number, mode: TravelMode): number {
  if (distanceKm === 0) return 0;

  let speedKmh = 60;
  let overheadHours = 0;

  switch (mode) {
    case 'car':
      speedKmh = 65; // average speed accounting for tolls, traffic, and intersections
      overheadHours = 0.2; // brief departure overhead
      break;
    case 'train':
      speedKmh = 85; // intermediate state train speed
      overheadHours = 0.6; // station waits/transit buffer
      break;
    case 'air':
      speedKmh = 680; // commercial airliner speed
      overheadHours = 1.8; // airport pre-flight check-in and luggage processing buffer
      break;
  }

  const travelTime = distanceKm / speedKmh;
  const total = travelTime + overheadHours;
  return Math.round(total * 10) / 10; // round to 1 decimal place
}

/**
 * High-tier solver for Fiqh Safar prayer allowances.
 */
export function analyzeJourney(
  origin: City,
  destination: City,
  mode: TravelMode,
  departureTime: string = '08:00'
): JourneyDetails {
  const distanceKm = calculateDistance(origin, destination, mode);
  const durationHours = estimateDuration(distanceKm, mode);

  // Default threshold for Qashar/Jama' (Shafi'i/Maliki/Hanbali) is 16 Farsakh = approx 82km (specifically 80.64 - 82km depending on regional calculation)
  const isAllowedShafii = distanceKm >= 82;

  // Hanafi threshold is 3 days travel (strictly interpreted as 3 stages ~96km)
  const isAllowedHanafi = distanceKm >= 96;

  return {
    origin,
    destination,
    distanceKm,
    durationHours,
    isAllowedShafii,
    isAllowedHanafi,
    departureTime
  };
}

/**
 * Formats time in Indonesian readable style (e.g., 2.5 hours -> "2 Jam 30 Menit")
 */
export function formatDurationIndonesian(durationHours: number): string {
  if (durationHours === 0) return '0 Menit';
  const hours = Math.floor(durationHours);
  const minutes = Math.round((durationHours - hours) * 60);

  let output = '';
  if (hours > 0) output += `${hours} Jam `;
  if (minutes > 0) output += `${minutes} Menit`;
  return output.trim();
}
