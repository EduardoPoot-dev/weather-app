import { Component, computed, inject, signal } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { weatherCodes } from '../../constants/weather-codes';
import { DatePipe } from '@angular/common';
import { ChangeDaySelectComponent } from "./change-day-select/change-day-select.component";
import { ShowByHourComponent } from './show-by-hour/show-by-hour.component';

@Component({
  selector: 'weather-houry-forecast',
  imports: [DatePipe, ChangeDaySelectComponent, ShowByHourComponent],
  templateUrl: './houry-forecast.component.html',
})
export class HouryForecastComponent {
  weatherServive = inject(WeatherService)
  weatherCodes = weatherCodes

  isLoading = computed(() => this.weatherServive.isLoading())

  weather = computed(() => this.weatherServive.weatherInfo()?.hourly)
  weatherUnits = computed(() => this.weatherServive.weatherInfo()?.hourly_units)

  dayNumber = signal(1)
  daysToHours = 24
  endArr = computed(() => (this.dayNumber() * this.daysToHours) )
  startArr = computed(() => this.endArr() - 24)

  weather24Hours = computed(() =>  this.weather()?.temperature_2m.slice(this.startArr(), this.endArr()))
  time24Hours = computed(() =>  this.weather()?.time.slice(this.startArr(), this.endArr()))
  weatherCode24Hours = computed(() =>  this.weather()?.weather_code.slice(this.startArr(), this.endArr()))

  tenHours = [1,2,3,4,5,6,7]

  changeDayNumber(value: number) {
    this.dayNumber.set(value)
  }

}
