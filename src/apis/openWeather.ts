import { Geocoding, Weather } from '@/types/openWeather';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_KEY = import.meta.env.VITE_API_OPEN_WEATHER_KEY;
const UNITS = 'metric';
const OPEN_WEATHER_ENDPOINT = 'https://api.openweathermap.org';

export async function getCurrentWeatherData(lat: number, lon: number) {
  const res = await axios.get<Weather>(
    `${OPEN_WEATHER_ENDPOINT}/data/2.5/weather?units=${UNITS}&lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );
  return res.data;
}

export async function getForecast5DayByLocation(lat: number, lon: number) {
  const res = await axios.get<{ list: Weather[] }>(
    `${OPEN_WEATHER_ENDPOINT}/data/2.5/forecast?units=${UNITS}&lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );

  return res.data.list.map((item) => ({ ...item, id: uuidv4() }));
}

export async function getGeocoding(q: string) {
  const res = await axios.get<Geocoding[]>(
    `${OPEN_WEATHER_ENDPOINT}/geo/1.0/direct?q=${q}&appid=${API_KEY}`,
  );
  return res.data;
}
