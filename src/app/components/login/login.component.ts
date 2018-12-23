import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit, Directive, Output, HostListener, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CommonService } from '../../shared/services/common.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isValidInfo: boolean = false;
  isValidName: boolean = false;
  isValidPassword: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private toster: ToastrService,
    private commonService: CommonService
  ) {

   }

  ngOnInit() {

    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });

  }

  /**
   * This method use for submit login using API
   * @param formData - Login form data
   */
  onSubmit(formData) {

    this.isValidInfo = false;
    this.isValidName = false;
    this.isValidPassword = false;

    // If form is valid then call API
    if (this.loginForm.valid) {

      this.loading = true;

      this.dataService.login().subscribe(
        res => {
          // If got the response then save info and redirect to home
          this.loading = false;
          var results = res.filter(function (obj) { return obj.email == formData.userName && obj.password == formData.password; });
          if (results.length > 0) {
            this.saveToken(results[0]);
          } else {
            this.toster.error('Invalid Credentials');
          }
        },
        // If got any errors from API
        err => {
          this.loading = false;
        });
    } else {
      // Check whether value entered or not
      if (formData.userName === '' || formData.userName === null)
        this.isValidName = true;
      if (formData.password === '' || formData.password === null)
        this.isValidPassword = true;
      else
        this.isValidInfo = true;
    }
  }

  /**
   * This method is use for save details and redirect to home page
   * @param res - API response
   */
  saveToken(res) {
    localStorage.setItem('currentUser', 'true');
    this.router.navigate(['/manage-user']);
  }
}
