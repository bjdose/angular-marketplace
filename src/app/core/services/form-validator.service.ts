import { FormGroup, ValidationErrors } from '@angular/forms';

export class ValidatorService {
  static mustMatch(
    firstControlName: string,
    seconControlName: string
  ): ValidationErrors | null {
    return (g: FormGroup): ValidationErrors | null => {
      const firstControl = g.controls[firstControlName];
      const secondControl = g.controls[seconControlName];
      if (!firstControl.value || !secondControl.value) {
        return null;
      }
      if (firstControl.value === secondControl.value) {
        secondControl.setErrors(null);
        return null;
      }
      secondControl.setErrors({ mismatch: true });
      return { mismatch: true };
    };
  }

  static emailRegexExp(): RegExp {
    return /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z ]{2,10}$/;
  }
}
