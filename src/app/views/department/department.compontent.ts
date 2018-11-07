import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../shared/';
import { DepartmentService } from '../../shared/services/department.service';
import { AppModalService } from '../../components';
import { roleCode } from '../../shared/code';


@Component({
  templateUrl: 'department.compontent.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DepartmentService]
})
export class DepartmentComponent implements OnInit {
  department: any;
  totalItems: number;
  pageNum: number;
  pageSize: number;
  listitems = [];
  loading: boolean;
  alertsDismiss: any = [];
  currentTeamItem;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public util: UtilService,
    public appModalService: AppModalService,
    public service: DepartmentService) {
  }
  ngOnInit() {
    this.bindDeptAll();
  }
  bindDeptAll() {

  }


  jumpToAddDept() {

  }

  jumpToDetail(item) {

  }
  jumpToModify(item) {

  }
  deleteDept(item) {

  }
}
