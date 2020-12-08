import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductForm {
  form: FormGroup = this.createForm();

  @Output() submitForm = new EventEmitter<FormGroup>();

  createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      sku: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form);
  }
}
