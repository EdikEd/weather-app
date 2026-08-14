export interface ForecastApiResponse {
  success: boolean;
  error: ForecastApiError | null;
  response: Forecast[];
}

export interface ForecastApiError {
  code: string;
  description: string;
}

export interface Forecast {
  place: ForecastPlace;
  periods: ForecastPeriod[];
}

export interface ForecastPlace {
  name: string;
  state: string;
  country: string;
}

export interface ForecastPeriod {
  dateTimeISO: string;
  weather: string;
  icon: string;
  maxTempC: number;
  minTempC: number;
  pop: number;
  windSpeedKPH: number;
}