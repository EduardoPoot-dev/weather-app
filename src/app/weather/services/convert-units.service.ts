import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConvertUnitsService {
  kmhToMph(kmh: number): number {
    const mph = kmh * 0.621371;
    return Number(mph.toFixed(1));
  }

  mmToIn(mm: number): number {
    const pulgadas = mm / 25.4;
    return Number(pulgadas.toFixed(1));
  }

  celsiusToFahrenheit(celsius: number): number {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return Number(fahrenheit.toFixed(1));
  }
}
