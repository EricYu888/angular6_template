import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DepartmentRoutingModule } from './department-routing.module';
import { HttpService, UtilService } from '../../shared/';
import { AppValidatorModule } from '../../components';

import { DepartmentComponent } from './department.compontent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DepartmentRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AppValidatorModule,
    AlertModule.forRoot()
  ],
  declarations: [DepartmentComponent],
  providers: [
    HttpService, UtilService
  ]
})
export class DepartmentModule { }
