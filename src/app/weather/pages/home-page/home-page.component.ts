import { Component, computed, inject } from '@angular/core';
import { SearchPlaceComponent } from "../../components/search-place/search-place.component";
import { CurrentWeatherComponent } from "../../components/current-weather/current-weather.component";
import { DailyForecastComponent } from "../../components/daily-forecast/daily-forecast.component";
import { HouryForecastComponent } from '../../components/houry-forecast/houry-forecast.component';
import { ChangeUnitsMenuComponent } from "../../components/change-units-menu/change-units-menu.component";
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home-page',
  imports: [SearchPlaceComponent, CurrentWeatherComponent, DailyForecastComponent, HouryForecastComponent, ChangeUnitsMenuComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  weatherService = inject(WeatherService)

  isError = computed(() => this.weatherService.isError())
}
