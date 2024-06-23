import { Geocoding } from '@/types/openWeather';

const LOCATION_KEY = 'weather-app:location' as const;

export function getLocation() {
  const str = localStorage.getItem(LOCATION_KEY) ?? '';
  if (!str) {
    return null;
  }

  let res = null;

  try {
    res = JSON.parse(str) as Geocoding;
  } catch (error) {
    console.error(error);
  }

  return res;
}

export function storeLocation(location: Geocoding) {
  localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
}
