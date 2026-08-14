import { Component, input } from '@angular/core';
import { CurrentWeather } from '../../../core/models/weather.model';

@Component({
  selector: 'app-current-weather',
  imports: [],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent {
  weather = input<CurrentWeather | null>(null);
}
