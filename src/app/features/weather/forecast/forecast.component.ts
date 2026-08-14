import { Component, input } from '@angular/core';
import { Forecast } from '../../../core/models/forecast.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-forecast',
  imports: [DatePipe],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent {
  forecast = input<Forecast | null>(null);
}
