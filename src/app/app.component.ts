import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './core/services/weather.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Weather App';
  private weatherService = inject(WeatherService);

  constructor() {
    this.weatherService.getCurrentWeather('bratislava,sk').subscribe(
      res => console.log(res)
    )
  }


}
