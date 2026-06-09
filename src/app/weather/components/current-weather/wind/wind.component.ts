import { Component, computed, inject, input } from '@angular/core';
import { VelocityUnits } from '../../../interfaces/units.interface';
import { WeatherService } from '../../../services/weather.service';
import { ChangeUnitsService } from '../../change-units-menu/change-units.service';

@Component({
  selector: 'weather-wind',
  imports: [],
  templateUrl: './wind.component.html',
  styles: ``
})
export class WindComponent {
  weatherServive = inject(WeatherService)
  changeUnitsService = inject(ChangeUnitsService)

  title = input('')
  originalValue = input(0)
  imperialValue = input(0)

  currentValue = computed(() => {
    if(this.changeUnitsService.velocityUnit() === VelocityUnits.Imperial) {
      return `${this.imperialValue()} mph`
    }
    return `${this.originalValue()} km/h`
  })
}
