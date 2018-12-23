import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DataService } from 'src/app/services/data.service';
import { CommonService } from '../../shared/services/common.service';

import *as moment from 'moment';
declare var $;
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private dataService: DataService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {

  }


  /**
	 * Marks all controls in a form group as touched
	 * @param formGroup - The group to caress
	*/
  markFormGroupTouched(formGroup: FormGroup) {
    if (Reflect.getOwnPropertyDescriptor(formGroup, 'controls')) {
      (<any>Object).values(formGroup.controls).forEach(control => {
        if (control instanceof FormGroup) {
          // FormGroup
          this.markFormGroupTouched(control);
        }
        // FormControl
        control.markAsTouched();
      });
    }
  }

}
