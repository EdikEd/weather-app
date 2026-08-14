import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.local';
import { WeatherApiResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://data.api.xweather.com';
  private readonly clientId = environment.xweather.clientId;
  private readonly clientSecret = environment.xweather.clientSecret;


  getCurrentWeather(city: string) {
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('units', 'metric')
      return this.http.get<WeatherApiResponse>(
        `${this.baseUrl}/observations/${encodeURIComponent(city)}`,
        { params }
      )
  }

  constructor() { }
}
