import { DEFAULT_LOCATION } from '@/constants/defaultLocation';
import { Geocoding } from '@/types/openWeather';

const LOCATION_KEY = 'weather-app:location' as const;
const HISTORY_KEY = 'weather-app:history' as const;

export function getLocation() {
  const str = localStorage.getItem(LOCATION_KEY) ?? '';
  if (!str) {
    storeLocation(DEFAULT_LOCATION);
    return DEFAULT_LOCATION;
  }

  let res = DEFAULT_LOCATION;

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

export function getHistorySearch() {
  const str = localStorage.getItem(HISTORY_KEY) ?? '';
  if (!str) {
    return null;
  }

  let res = null;

  try {
    res = JSON.parse(str) as Geocoding[];
  } catch (error) {
    console.error(error);
  }

  return res;
}

export function storeHistorySearch(locations: Geocoding[]) {
  if (!locations?.length) {
    localStorage.removeItem(HISTORY_KEY);
    return;
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(locations));
}
