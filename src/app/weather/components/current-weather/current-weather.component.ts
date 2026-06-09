import { Component, computed, inject } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { DatePipe } from '@angular/common';
import { ConvertUnitsService } from '../../services/convert-units.service';
import { FeelsLikeComponent } from "./feels-like/feels-like.component";
import { HumidityComponent } from './humidity/humidity.component';
import { PrecipitationComponent } from "./precipitation/precipitation.component";
import { WindComponent } from "./wind/wind.component";
import { ChangeUnitsService } from '../change-units-menu/change-units.service';
import { WeatherUnits } from '../../interfaces/units.interface';

@Component({
  selector: 'current-weather',
  imports: [DatePipe, FeelsLikeComponent, HumidityComponent, PrecipitationComponent, WindComponent],
  templateUrl: './current-weather.component.html',
})
export class CurrentWeatherComponent {
  weatherServive = inject(WeatherService)
  converUnitsService = inject(ConvertUnitsService)
  changeUnitsService = inject(ChangeUnitsService)

  isLoading = computed(() => this.weatherServive.isLoading())

  weatherDaily = computed(() => this.weatherServive.weatherInfo()?.daily)
  weatherHoury = computed(() => this.weatherServive.weatherInfo()?.hourly)

  locationInfo = computed(() => ({
    name: this.weatherServive.locationInfo()?.display_name ?? '',
    date: this.weatherDaily()?.time[0] ?? '',
  }))

  weather = computed(() => ({
    current: Number(this.weatherDaily()?.temperature_2m_max[0] ?? 0),
    humidity: Number(this.weatherHoury()?.relative_humidity_2m[0] ?? 0),
    feelsLike: Number(this.weatherDaily()?.apparent_temperature_mean[0]),
    wind: Number(this.weatherDaily()?.wind_speed_10m_max[0] ?? 0),
    precipitation: Number(this.weatherDaily()?.precipitation_sum[0] ?? 0)
  }))

  weatherToImperial = computed(() => ({
    current: this.converUnitsService.celsiusToFahrenheit(this.weather().current),
    feelsLike: this.converUnitsService.celsiusToFahrenheit(this.weather().feelsLike),
    wind: this.converUnitsService.kmhToMph(this.weather().wind),
    precipitation: this.converUnitsService.mmToIn(this.weather().precipitation)
  }))

  showCurrentWeather = computed(() => {
    if(this.changeUnitsService.weatherUnit() === WeatherUnits.Fahrenheit) {
      return `${this.weatherToImperial().current} °F`
    }
    return `${this.weather().current} °C`
  })


  additionalDataTitles = ['feelsLike', 'humidity', 'wind', 'precipitation']

}


/**
 *
 * weather = computed(() => ({
    name: this.weatherServive.locationInfo()?.display_name ?? '',
    date: this.weatherServive.weatherInfo()?.daily.time[0] ?? '',
    current: this.weatherServive.weatherInfo()?.daily.temperature_2m_max[0] ?? '',
    additionalData: [
      this.weatherServive.weatherInfo()?.daily.apparent_temperature_mean[0] ?? '',
      this.weatherServive.weatherInfo()?.hourly.relative_humidity_2m[0] ?? '',
      this.weatherServive.weatherInfo()?.daily.wind_speed_10m_max[0] ?? '',
      this.weatherServive.weatherInfo()?.daily.precipitation_sum[0] ?? '',
    ],
    additionalDataUnits: [
      this.weatherServive.weatherInfo()?.daily_units.apparent_temperature_mean,
      this.weatherServive.weatherInfo()?.hourly_units.relative_humidity_2m,
      this.weatherServive.weatherInfo()?.daily_units.wind_speed_10m_max,
      this.weatherServive.weatherInfo()?.daily_units.precipitation_sum
    ]
 */
