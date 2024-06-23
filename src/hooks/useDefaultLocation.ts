import { DEFAULT_LOCATION } from '@/constants/defaultLocation';
import { getLocation, storeLocation } from '@/utils/storage';
import { useEffect } from 'react';

export default function useDefaultLocation() {
  useEffect(() => {
    if (!getLocation()) {
      storeLocation(DEFAULT_LOCATION);
    }
  }, []);
}
