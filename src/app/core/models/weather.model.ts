export interface WeatherApiResponse {
  success: boolean;
  error: WeatherApiError | null;
  response: CurrentWeather;
}

export interface WeatherApiError {
  code: string;
  description: string;
}

export interface CurrentWeather {
  place: WeatherPlace;
  ob: WeatherObservation;
}

export interface WeatherPlace {
  name: string;
  city: string;
  country: string;
}

export interface WeatherObservation {
  weather: string;
  tempC: number;
  humidity: number;
  windSpeedKPH: number;
}