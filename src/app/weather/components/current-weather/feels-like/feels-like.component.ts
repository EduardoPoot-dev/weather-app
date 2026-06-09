import { Component, computed, inject, input } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';
import { ChangeUnitsService } from '../../change-units-menu/change-units.service';
import { WeatherUnits } from '../../../interfaces/units.interface';

@Component({
  selector: 'weather-feels-like',
  imports: [],
  templateUrl: './feels-like.component.html',
  styles: ``
})
export class FeelsLikeComponent {
  weatherServive = inject(WeatherService)
  changeUnitsService = inject(ChangeUnitsService)

  title = input('')
  originalValue = input(0)
  imperialValue = input(0)

  currentValue = computed(() => {
    if(this.changeUnitsService.weatherUnit() === WeatherUnits.Fahrenheit) {
      return `${this.imperialValue()} °F`
    }
    return `${this.originalValue()} °C`
  })

}
