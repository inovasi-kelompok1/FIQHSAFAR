export interface City {
  name: string;
  province: string;
  lat: number;
  lng: number;
}

export type TravelMode = 'car' | 'train' | 'air';

export interface TravelModeConfig {
  id: TravelMode;
  name: string;
  speedKmh: number; // Average speed
  icon: string;
  label: string;
}

export interface JourneyDetails {
  origin: City;
  destination: City;
  distanceKm: number;
  durationHours: number;
  isAllowedShafii: boolean;
  isAllowedHanafi: boolean;
  departureTime: string; // e.g. "08:00"
}

export interface NiatItem {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
}

export interface DalilItem {
  source: string;
  arabic: string;
  translation: string;
  explanation: string;
}
