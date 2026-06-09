import { Component, computed, inject, input } from '@angular/core';
import { PrecipitationUnits } from '../../../interfaces/units.interface';
import { WeatherService } from '../../../services/weather.service';
import { ChangeUnitsService } from '../../change-units-menu/change-units.service';


@Component({
  selector: 'weather-precipitation',
  imports: [],
  templateUrl: './precipitation.component.html',
  styles: ``
})
export class PrecipitationComponent {
  weatherServive = inject(WeatherService)
  changeUnitsService = inject(ChangeUnitsService)

  title = input('')
  originalValue = input(0)
  imperialValue = input(0)

  currentValue = computed(() => {
    if(this.changeUnitsService.precipitationUnit() === PrecipitationUnits.Imperial) {
      return `${this.imperialValue()} in`
    }
    return `${this.originalValue()} mm`
  })
}
