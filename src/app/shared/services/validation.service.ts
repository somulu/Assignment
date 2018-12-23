import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class ValidationService {

	/**
	 * This method is use for return validation messages
	 * @param validatorName - get form controls name eg. firstName, etc..
	 * @param validatorValue - get validators type eg. required, maxlength, etc..
	 */
  static getValidatorErrorMessage(controlName, validatorName: string, validatorValue?: any) {
    let config = {
      // error list
      required: `${_.startCase(controlName)} is Required`,
      invalidEmail: 'Invalid email address',
      invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength} characters`,
      maxlength: `Cannot exceed ${validatorValue.requiredLength} characters`,
    }

    return config[validatorName];
  }

  // Email validation
  static emailValidator(control: FormControl) {
    if (control.value) {
      const matches = control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
      return matches ? null : { 'invalidEmail': true };
    } else {
      return null;
    }
  }

  static mobileNumberValidation(control: AbstractControl) {
    // RFC 2822 compliant regex
    if (control.value && control.value.match(/^[0-9]{10,10}$/)) {
      return '';
    } else {
      return { 'invalidNumber': true };
    }
  }
}
