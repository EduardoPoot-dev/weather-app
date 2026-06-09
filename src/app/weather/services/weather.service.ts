import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Weather } from '../interfaces/weather.interface';
import { Location } from '../interfaces/location.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient)

  initialPlace = 'berlin'

  locationInfo = signal<Location | null>(null)
  weatherInfo = signal<Weather | null>(null)
  isLoading = signal(false)
  isError = signal(false)

  onSearchPlace = effect(() => {
    const placeSuscription =
      this.getCoordinatesByPlace(this.initialPlace)
        .subscribe()
  })

  getCoordinatesByPlace(query: string) : Observable<Weather>  {
    this.isLoading.set(true)
    this.isError.set(false)

    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`
    return this.http.get<Location[]>(url)
      .pipe(
        map((resp) => resp[0]),
        tap(location => this.locationInfo.set(location)),
        switchMap(({lat, lon}) => this.getWeatherByCoordintes(+lat, +lon)),
        catchError(() => {
          this.isError.set(true)
          return throwError(() => new Error('has a error'))
        })
      )
  }

  getWeatherByCoordintes(lat: number, lng: number): Observable<Weather> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=weather_code,temperature_2m,relative_humidity_2m&daily=weather_code,wind_speed_10m_max,precipitation_sum,temperature_2m_max,temperature_2m_min,apparent_temperature_mean&timezone=auto&forecast_days=7`
    return this.http.get<Weather>(url)
      .pipe(
        tap(resp => this.weatherInfo.set(resp)),
        //tap(resp => console.log(resp)),
        tap(() => this.isLoading.set(false)),
      )
  }

}
