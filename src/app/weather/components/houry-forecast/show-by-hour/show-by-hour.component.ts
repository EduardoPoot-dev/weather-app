import { Component, computed, inject, input } from '@angular/core';
import { ConvertUnitsService } from '../../../services/convert-units.service';
import { ChangeUnitsService } from '../../change-units-menu/change-units.service';
import { WeatherUnits } from '../../../interfaces/units.interface';

@Component({
  selector: 'weather-show-by-hour',
  imports: [],
  templateUrl: './show-by-hour.component.html',
})
export class ShowByHourComponent {
  convertUnitsService = inject(ConvertUnitsService)
  changeUnitsService = inject(ChangeUnitsService)

  weather = input(0)

  imperialWeather = computed(() => this.convertUnitsService.celsiusToFahrenheit(this.weather()))

  showWeather = computed(() => {
    if(this.changeUnitsService.weatherUnit() === WeatherUnits.Fahrenheit) {
      return `${this.imperialWeather()} °F`
    }
    return `${this.weather()} °C`
  })

}
