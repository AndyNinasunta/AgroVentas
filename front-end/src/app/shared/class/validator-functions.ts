import { FormGroup } from '@angular/forms';

export class ValidatorFunctions {
    validatedCI(cIdentification) {
        if (cIdentification.length !== 10) {
            if (cIdentification.length !== 13) {
                return 2;
            } else {
                return 0;
            }
        } else {
            let thirdDigit = parseInt(cIdentification.substring(2, 3));
            if (thirdDigit < 6) {
                let coefValCI = [2, 1, 2, 1, 2, 1, 2, 1, 2];
                let verificator = parseInt(cIdentification.substring(9, 10));
                let sum: number = 0;
                let digit: number = 0;
                for (let i = 0; i < cIdentification.length - 1; i++) {
                    digit =
                        parseInt(cIdentification.substring(i, i + 1)) *
                        coefValCI[i];
                    sum +=
                        parseInt((digit % 10) + '') + parseInt(digit / 10 + '');
                }
                sum = Math.round(sum);
                if (
                    Math.round(sum % 10) == 0 &&
                    Math.round(sum % 10) == verificator
                ) {
                    return 0;
                } else if (10 - Math.round(sum % 10) == verificator) {
                    return 0;
                } else {
                    return 2;
                }
            } else {
                return 2;
            }
        }
    }

    validatedRUC(cedula: string) {
        if (cedula.length == 13) {
            return 1;
        } else {
            return 3;
        }
    }
}

export class FormGroupError {
    getErrorValidateMessage(_form: FormGroup, p_control: any) {
        let message = '';
        if (_form.get(p_control).hasError('identification')) {
            switch (_form.get(p_control).getError('identification')) {
                case 2:
                    message =
                        'El número de cédula o RUC ingresado es incorrecto.';
                    break;
                case 3:
                    message = 'El número de RUC ingresado es incorrecto.';
                    break;
                default:
                    message =
                        'El número de identificación ingresado es incorrecto';
                    break;
            }
            return message;
        }

        message = _form.get(p_control).hasError('required')
            ? 'El campo es requerido'
            : _form.get(p_control).hasError('email')
            ? 'No pertenece a un correo valido'
            : _form.get(p_control).hasError('maxlength')
            ? `La longitud maxima es: ${
                  _form.get(p_control).getError('maxlength').requiredLength
              }`
            : _form.get(p_control).hasError('minlength')
            ? `La longitud mínima es:
                            ${
                                _form.get(p_control).getError('minlength')
                                    .requiredLength
                            }`
            : '';

        return message;
    }
}
