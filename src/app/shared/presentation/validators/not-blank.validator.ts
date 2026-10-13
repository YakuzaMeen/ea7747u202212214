import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Validator that rejects values containing only whitespace.
 * @author Oskar Sosa
 */
export const notBlankValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  typeof control.value === 'string' && control.value.length > 0 && control.value.trim().length === 0
    ? {blank: true}
    : null;
