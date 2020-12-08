import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @ViewChild(MatStepper, { static: false }) private stepper!: MatStepper;

  constructor() {}

  ngOnInit(): void {}

  goSignInStep(): void {
    this.stepper.selectedIndex = 1;
  }

  goSignUpStep(): void {
    this.stepper.selectedIndex = 2;
  }

  isFirsStep(): boolean {
    if (!this.stepper) {
      return true;
    }
    return this.stepper.selectedIndex === 0;
  }

  getStepLabel(): string {
    if (!this.stepper) {
      return 'Crear una cuenta';
    }
    return this.stepper.selected.label;
  }
}
