import { AbstractControl } from '@angular/forms';
import { ValidatorFunctions } from '../class/validator-functions';

export function ValidCI(
  control: AbstractControl
): { [key: string]: number } | null {
  let validatorFunctions: ValidatorFunctions = new ValidatorFunctions();

  let identification = control.value ? control.value.toString() : '';

  if (identification === '') {
    return null;
  }

  let valida = validatorFunctions.validatedCI(identification);
  if (valida == 0 || valida == 1) {
    return null;
  }
  return { identification: valida };
}

export function ValidRUC(
  control: AbstractControl
): { [key: string]: number } | null {
  let validatorFunctions: ValidatorFunctions = new ValidatorFunctions();

  let identification = control.value ? control.value.toString() : '';

  if (identification === '') {
    return null;
  }

  let valida = validatorFunctions.validatedRUC(identification);
  if (valida == 0 || valida == 1) {
    return null;
  }
  return { identification: valida };
}
