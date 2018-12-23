
import { CommonService } from './../../shared/services/common.service';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';
import { Route } from '@angular/compiler/src/core';
import { DataService } from '../../services/data.service';
declare var $;

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  isClosed: boolean = false;
  userName: string = "";
  userRoleArr = [];
  loginDate: any;

  constructor(
    private dataService: DataService,
    public commonService: CommonService
  ) {

  }

  ngOnInit() {
  }

  /**
   * This method is use for log out application
   */
  onLogOut() {
    console.log('click');
    this.dataService.logOut();
  }

}
