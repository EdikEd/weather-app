import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './core/services/weather.service';
import { FormsModule } from '@angular/forms';
import { CurrentWeather } from './core/models/weather.model';
import { CurrentWeatherComponent } from './features/weather/current-weather/current-weather.component';
import { Forecast } from './core/models/forecast.model';
import { finalize, forkJoin } from 'rxjs';
import { ForecastComponent } from './features/weather/forecast/forecast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CurrentWeatherComponent, ForecastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Weather App';
  
  private weatherService = inject(WeatherService);  

  weather: CurrentWeather | null = null;
  forecast: Forecast | null = null;

  city = 'new york, ny';
  
  error = '';
  loading = false;

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
  this.loading = true;
  this.error = '';

  forkJoin({
    current: this.weatherService.getCurrentWeather(this.city),
    forecast: this.weatherService.getForecast(this.city),
  })
    .pipe(finalize(() => (this.loading = false)))
    .subscribe({
      next: ({ current, forecast }) => {
        this.weather = current.response?.place
          ? current.response
          : null;

        this.forecast = forecast.response[0] ?? null;
      },
      error: () => {
        this.weather = null;
        this.forecast = null;
        this.error = 'Could not load weather data for this location.';
      },
    });
}

  ngOnInit() {
    this.loadWeather();    
  }


}
