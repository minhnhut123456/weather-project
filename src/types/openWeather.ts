export type Geocoding = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type Weather = {
  id?: string;
  dt: number;
  dt_txt: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
};
