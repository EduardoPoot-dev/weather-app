import { Component, computed, effect, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { DatePipe } from '@angular/common';
import { weatherCodes } from '../../constants/weather-codes';
import { ConvertUnitsService } from '../../services/convert-units.service';
import { ChangeUnitsService } from '../change-units-menu/change-units.service';
import { WeatherUnits } from '../../interfaces/units.interface';

@Component({
  selector: 'weather-daily-forecast',
  imports: [DatePipe],
  templateUrl: './daily-forecast.component.html',
})
export class DailyForecastComponent {
  weatherServive = inject(WeatherService)
  convertUnitsService = inject(ConvertUnitsService)
  changeUnitsService = inject(ChangeUnitsService)

  weatherCodes = weatherCodes

  isLoading = computed(() => this.weatherServive.isLoading())

  sevenDays = [1, 2, 3, 4, 5, 6, 7]
  weather = computed(() => this.weatherServive.weatherInfo()?.daily)
  days = computed(() => this.weather()?.time ?? [])

  maxWeatherByDay = computed(() => this.weather()?.temperature_2m_max)
  minWeatherByDay = computed(() => this.weather()?.temperature_2m_min)
  maxWeatherByDayImperialUnits = computed(() => {
    return this.maxWeatherByDay()?.map((el) => this.convertUnitsService.celsiusToFahrenheit(Number(el)))
  })
  minWeatherByDayImperialUnits = computed(() => {
    return this.minWeatherByDay()?.map((el) => this.convertUnitsService.celsiusToFahrenheit(Number(el)))
  })

  showWeather = computed(() => {
    if (this.changeUnitsService.weatherUnit() === WeatherUnits.Fahrenheit) {
      return {
        max: this.maxWeatherByDayImperialUnits()?.map((el => `${el} °F`)),
        min: this.minWeatherByDayImperialUnits()?.map((el => `${el} °F`))
      }
    }
    return {
      max: this.maxWeatherByDay()?.map((el => `${el} °C`)),
      min: this.minWeatherByDay()?.map((el => `${el} °C`))
    }
  })

  testEffect = effect(() => {
    console.log(this.showWeather())
  })

}
