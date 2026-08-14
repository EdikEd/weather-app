import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WeatherDashboardComponent } from './features/weather/weather-dashboard/weather-dashboard.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {

}
