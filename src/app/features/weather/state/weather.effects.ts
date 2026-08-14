import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';

import { WeatherService } from '../../../core/services/weather.service';
import { WeatherActions } from './weather.actions';

export const loadWeather = createEffect(
  (
    actions$ = inject(Actions),
    weatherService = inject(WeatherService),
  ) =>
    actions$.pipe(
      ofType(WeatherActions.loadWeather),

      switchMap(({ city }) =>
  forkJoin({
    current: weatherService.getCurrentWeather(city),
    forecast: weatherService.getForecast(city),
  }).pipe(
    map(({ current, forecast }) =>
      WeatherActions.loadWeatherSuccess({
        weather: current.response?.place ? current.response : null,
        forecast: forecast.response[0] ?? null,
      }),
    ),

    catchError(() =>
      of(
        WeatherActions.loadWeatherFailure({
          error: 'Could not load weather data for this location.',
        }),
      ),
    ),
  ),
),
    ),
  { functional: true },
);