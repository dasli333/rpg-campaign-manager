import {AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function minSelectedCheckboxes(min = 1): ValidatorFn {
  const validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let totalSelected = 0;

    if (control instanceof FormArray || control instanceof FormGroup) {
      totalSelected = Object.values(control.controls)
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
    }

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
