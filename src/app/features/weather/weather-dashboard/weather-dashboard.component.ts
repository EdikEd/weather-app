import { Component, inject } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { CurrentWeather } from '../../../core/models/weather.model';
import { Forecast } from '../../../core/models/forecast.model';
import { WeatherService } from '../../../core/services/weather.service';
import { ForecastComponent } from '../forecast/forecast.component';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
import { FormsModule } from '@angular/forms';
import { weatherFeature } from '../state/weather.reducer';
import { Store } from '@ngrx/store';
import { WeatherActions } from '../state/weather.actions';

@Component({
  selector: 'app-weather-dashboard',
  imports: [CurrentWeatherComponent, ForecastComponent, WeatherDashboardComponent, FormsModule],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss'
})
export class WeatherDashboardComponent {
  title = 'Weather App';
  
  private weatherService = inject(WeatherService);  
  private readonly store = inject(Store);

  readonly weather = this.store.selectSignal(weatherFeature.selectWeather);
  readonly forecast = this.store.selectSignal(weatherFeature.selectForecast);
  readonly loading = this.store.selectSignal(weatherFeature.selectLoading);
  readonly error = this.store.selectSignal(weatherFeature.selectError);
  

  city = 'new york, ny';
  
  cities = [
    { label: 'New York', value: 'new+york,ny' },
    { label: 'London', value: 'london,uk' },
    { label: 'Bratislava', value: 'bratislava,sk' },
    { label: 'Berlin', value: 'berlin,de' },
  ];

  selectCity(city: string) {
    this.city = city;
    this.loadWeather();
  }

  

  constructor() {

  }

  loadForecast() {
    this.weatherService.getForecast(this.city).subscribe({
      next: (result) => console.log(result),
      error: (error) => console.error(error),
    });
  }
  
  loadWeather() {
    this.store.dispatch(
      WeatherActions.loadWeather({ city: this.city }),
    );
  }

  ngOnInit() {
    this.loadWeather();    
  }


}
