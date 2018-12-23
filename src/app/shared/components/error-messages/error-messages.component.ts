import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'error-messages',
  template: `<div class="errorMsg" *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
  styles: [``]
})
export class ErrorMessagesComponent implements OnInit {

	@Input() control: FormControl;

	constructor() { }

	ngOnInit(){

	}

	/**
	 * This method is use to return validation errors
	 */
	get errorMessage() {
		for (let propertyName in this.control.errors) {
			if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
				return ValidationService.getValidatorErrorMessage(this.getName(this.control), propertyName, this.control.errors[propertyName]);
			}
		}

		return null;
	}


	/**
	 * This method used to find the control name
	 * @param control - AbstractControl
	 */
	private getName(control: AbstractControl): string | null {
		let group = <FormGroup>control.parent;

		if (!group) {
			return null;
		}

		let name: string;

		Object.keys(group.controls).forEach(key => {
			let childControl = group.get(key);

			if (childControl !== control) {
				return;
			}

			if(key === 'code')
				name = 'this field';
			else
				name = key;
		});

		return name;
	}

}
