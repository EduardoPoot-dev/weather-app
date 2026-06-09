import { Component, computed, inject, input } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';
import { ChangeUnitsService } from '../../change-units-menu/change-units.service';

@Component({
  selector: 'weather-humidity',
  imports: [],
  templateUrl: './humidity.component.html',
  styles: ``
})
export class HumidityComponent {
  weatherServive = inject(WeatherService)
  changeUnitsService = inject(ChangeUnitsService)

  title = input('')
  originalValue = input(0)

  currentValue = computed(() => {
    return `${this.originalValue()} %`
  })
}
