import { createActionGroup, props } from '@ngrx/store';
import { CurrentWeather } from '../../../core/models/weather.model';
import { Forecast } from '../../../core/models/forecast.model';

export const WeatherActions = createActionGroup({
  source: 'Weather',
  events: {
    'Load Weather': props<{ city: string }>(),
    'Load Weather Success': props<{ weather: CurrentWeather | null, forecast: Forecast | null}>(),
    'Load Weather Failure': props<{ error: string }>(),
  },
});