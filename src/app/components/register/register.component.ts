import { Component, OnInit, Directive, Output, HostListener, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonService } from '../../shared/services/common.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isValidInfo: boolean = false;
  isValidName: boolean = false;
  isValidPassword: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService,
    private toster: ToastrService,
    private commonService: CommonService
  ) {

   }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: [null, Validators.required],
      middlename: [null, Validators.required],
      lastname: [null, Validators.required],
      mobileNo: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirmPassword') });
  }

  /**
	 * This method used to compare passwords
	 * @param passwordKey - Password
	 * @param confirmPasswordKey - Confirm Password
	 */
	matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
		return (group: FormGroup): { [key: string]: any } => {
			let password = group.controls[passwordKey];
			let confirmPassword = group.controls[confirmPasswordKey];

			if (confirmPassword.value) {
				if (password.value !== confirmPassword.value) {
					this.registerForm.get('password').setErrors({ mismatchedPasswords: true });
					return {
						mismatchedPasswords: true
					};
				}else{
					this.registerForm.get('confirmPassword').setErrors(null);
				}
			}
		}
	}

  /**
   * This method use for submit login using API
   * @param formData - Login form data
   */
  onSubmit(formData) {

    this.dataService.onRegister(formData).subscribe((res:Response) =>{
      console.log(res);
      if(res){
        this.router.navigate(['../login'],{relativeTo: this.route})
      }
   })
  }

}
