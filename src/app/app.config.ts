import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { weatherFeature } from './features/weather/state/weather.reducer';
import { loadWeather } from './features/weather/state/weather.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(weatherFeature),
    provideEffects({loadWeather}),
    provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
  }),
  ]
};
