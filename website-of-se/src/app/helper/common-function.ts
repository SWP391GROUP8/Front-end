import { FormControl, FormGroup } from '@angular/forms';
import { CommonObject } from './common-object';

export class CommonFunction {
  public static removeNull(object) {
    const filteredEntries = Object.entries(object).filter(
      ([_key, value]) => value !== null
    );
    return Object.fromEntries(filteredEntries);
  }
  public static convertPathArrToString(childPath: string[]) {
    return childPath.join('/');
  }
  public static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  public static createBadRequestErrors(errorList: any[], formControls: any) {
    const fields = Object.keys(formControls);

    errorList.forEach((error: any) => {
      if (fields.includes(error.fieldName.toLowerCase())) {
        formControls[error.fieldName.toLowerCase()].setErrors({
          bqFromServer: ['Error.' + error.fieldName + '.' + error.messageCode],
        });
      }
    });
  }
  public static checkEmailValid(email) {
    if (email.match(CommonObject.regexEmail)) return email;
    return '';
  }
}
