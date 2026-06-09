import { DatePipe } from '@angular/common';
import { Component, computed, inject, output, signal } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';

@Component({
  selector: 'weather-change-day-select',
  imports: [DatePipe],
  templateUrl: './change-day-select.component.html',
})
export class ChangeDaySelectComponent {
  weatherService = inject(WeatherService)

  weekDays = computed(() => this.weatherService.weatherInfo()?.daily.time)

  inputValue = signal(1)

  dayNumber = output<number>()

  handleChange(e: Event) {
    const element = e.target as HTMLSelectElement;

    this.inputValue.set(Number(element.value))
    this.dayNumber.emit(Number(element.value))

    console.log(this.inputValue())
  }
}
