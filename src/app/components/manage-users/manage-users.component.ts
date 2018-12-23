import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../shared/services/validation.service';
declare var $;


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  studentList: any = [];
  studentForm: FormGroup;
  mode: string = 'mode';

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private toster: ToastrService
  ) { }

  ngOnInit() {

    /**
     * This method is used to get all student list
     */
    this.getAllLists();

    this.createStudentFormControl();
  }

  getAllLists() {
    this.dataService.geStudentList().subscribe(res => {
      this.studentList = res;
    });
  }

  createStudentFormControl() {
    this.studentForm = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      email:[null, ValidationService.emailValidator],
      class: [null, Validators.required],
      enrollmantYear: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required]
    });
  }

  editUser(obj) {
    this.mode = 'edit';
    $('#addEditPopup').modal('toggle');
    this.studentForm.patchValue(obj);
  }

  addStudent() {
    this.mode = 'add';
    this.studentForm.reset();
    $('#addEditPopup').modal('toggle');
  }

  deleteUser(id) {
    this.dataService.deleteUser(id).subscribe(res => {
      this.toster.success('successfully deleted');
      this.getAllLists();
    });
  }

  updateStudentForm() {
    if (this.mode == 'add') {
      this.dataService.addUser(this.studentForm.value).subscribe(res => {
        this.getAllLists();
        this.toster.success('successfully Added');
        $('#addEditPopup').modal('toggle');
      }, err => {
        this.toster.error('Student Id already exist');
      });
    } else {
      this.dataService.updateUser(this.studentForm.value).subscribe(res => {
        this.getAllLists();
        this.toster.success('successfully updated');
        $('#addEditPopup').modal('toggle');
      });
    }


  }

}
