import { createFeature, createReducer, on } from '@ngrx/store';
import { CurrentWeather } from '../../../core/models/weather.model';
import { WeatherActions } from './weather.actions';
import { Forecast } from '../../../core/models/forecast.model';

export interface WeatherState {
  weather: CurrentWeather | null;
  forecast: Forecast | null;
  loading: boolean;
  error: string | null;
}



const initialState: WeatherState = {
  weather: null,
  forecast: null,
  loading: false,
  error: null,
};

export const weatherFeature = createFeature({
  name: 'weather',
  reducer: createReducer(
    initialState,

    on(WeatherActions.loadWeather, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(WeatherActions.loadWeatherSuccess, (state, { weather, forecast }) => ({
      ...state,
      weather,
      forecast,
      loading: false,
    })),

    on(WeatherActions.loadWeatherFailure, (state, { error }) => ({
      ...state,
      weather: null,
      forecast: null,
      loading: false,
      error,
    })),
  ),
});