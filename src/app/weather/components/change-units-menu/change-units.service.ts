import { Injectable, signal } from '@angular/core';
import { WeatherUnits, VelocityUnits, PrecipitationUnits } from '../../interfaces/units.interface';


@Injectable({
  providedIn: 'root'
})
export class ChangeUnitsService {
  weatherUnit = signal<WeatherUnits>(WeatherUnits.Celsius)
  velocityUnit = signal<VelocityUnits>(VelocityUnits.Si)
  precipitationUnit = signal<PrecipitationUnits>(PrecipitationUnits.Si)

  changeWeatherUnits(value: string) {
    this.weatherUnit.set(value as WeatherUnits)
  }

  changeVelocityUnits(value: string) {
    this.velocityUnit.set(value as VelocityUnits)
  }

  changePrecipitationUnits(value: string) {
    this.precipitationUnit.set(value as PrecipitationUnits)
  }

  switchToImperial() {
    this.weatherUnit.set(WeatherUnits.Fahrenheit)
    this.velocityUnit.set(VelocityUnits.Imperial)
    this.precipitationUnit.set(PrecipitationUnits.Imperial)
  }
}
