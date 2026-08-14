import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './core/services/weather.service';
import { FormsModule } from '@angular/forms';
import { CurrentWeather } from './core/models/weather.model';
import { CurrentWeatherComponent } from './features/weather/current-weather/current-weather.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CurrentWeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Weather App';
  private weatherService = inject(WeatherService);  
  weather: CurrentWeather | null = null;
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

  loadWeather() {
    this.loading = true;
    this.error = '';

    this.weatherService.getCurrentWeather(this.city)
      .subscribe({
        next: (result) => {
        this.weather = result.response?.place ? result.response : null;
        this.loading = false;
      },
      })
      error: () => {
        this.error = 'Could not load weather for this location';
        this.loading = false;
      }
  }

  ngOnInit() {
    this.loadWeather();
  }


}
