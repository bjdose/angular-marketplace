import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  FloatLabelType,
  MatFormFieldAppearance,
} from '@angular/material/form-field';
import { InputError } from '@app/core/interfaces';
import { InputType } from '@app/core/types';

@Component({
  selector: 'app-input-field',
  template: `
    <mat-form-field
      class="fw"
      [appearance]="appearance"
      [formGroup]="formGroup"
      [floatLabel]="floatLabel"
    >
      <mat-label>{{ label || placeholder }}</mat-label>
      <input
        matInput
        [type]="type"
        [placeholder]="placeholder"
        [formControlName]="controlName"
        [maxlength]="maxLength"
        [minLength]="minLength"
        (keydown.enter)="onEnter($event)"
      />
      <mat-error *ngFor="let inputError of inputErrors">
        <mat-error *ngIf="control.errors && control.errors[inputError.error]">
          {{ inputError.message }}
        </mat-error>
      </mat-error>
    </mat-form-field>
  `,
})
export class InputFieldComponent implements OnInit {
  @Input() placeholder = '';
  @Input() label = '';
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() controlName = '';
  @Input() type: InputType = 'text';
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() hide = true;
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() maxLength = 15;
  @Input() minLength = 0;

  @Output() enter = new EventEmitter();

  get control(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

  inputErrors: InputError[] = [];

  ngOnInit(): void {
    this.inputErrors = this.initErrors();
  }

  onEnter(event: Event): void {
    event.preventDefault();
    if (this.control.invalid) {
      this.control.markAllAsTouched();
    }
    this.enter.emit();
  }

  resetInput(): void {
    this.control.reset();
  }

  initErrors(): InputError[] {
    return [
      {
        error: 'required',
        message: 'Campo requerido',
      },
      {
        error: 'minlength',
        message: `Mínimo ${this.minLength} caracteres`,
      },
      {
        error: 'maxlength',
        message: `Máximo ${this.maxLength} caracteres`,
      },
      {
        error: 'pattern',
        message: 'Formato incorrecto',
      },
      {
        error: 'mismatch',
        message: 'Contraseñas no coinciden',
      },
    ];
  }
}
