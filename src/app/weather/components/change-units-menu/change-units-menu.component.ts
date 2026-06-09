import { Component, inject, signal } from '@angular/core';
import { ChangeUnitsService } from './change-units.service';
import { NgClass } from '@angular/common';



@Component({
  selector: 'app-change-units-menu',
  imports: [NgClass],
  templateUrl: './change-units-menu.component.html',
})
export class ChangeUnitsMenuComponent {

  showMenu = signal(false)

  changeUnitsSerive = inject(ChangeUnitsService)


}
