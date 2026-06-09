import { Component, inject, signal } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'weather-search-place',
  imports: [],
  templateUrl: './search-place.component.html',
})
export class SearchPlaceComponent {
  weatherService = inject(WeatherService)

  query = signal('')

  searchPlace() {
    this.weatherService.getCoordinatesByPlace(this.query())
      .subscribe()
  }

}
