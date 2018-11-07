import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { HttpService, UtilService } from '../../shared/';
import { UserService } from '../../shared/services/user.service';
import { TeamService } from '../../shared/services/team.service';
import { ShopService } from '../../shared/services/shop.service';

import { AppValidatorModule } from '../../components';

import { UserComponent } from './user.component';
import { DetailComponent } from './detail/detail.component';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AppValidatorModule,
    AlertModule.forRoot()
  ],
  declarations: [UserComponent, DetailComponent],
  providers: [
    HttpService, UtilService, UserService, TeamService, ShopService
  ]
})
export class UserModule { }
