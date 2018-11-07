import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ProfileRoutingModule } from './profile-routing.module';
import { HttpService, UtilService } from '../../shared/';
import { AppValidatorModule } from '../../components';

import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AppValidatorModule,
    AlertModule.forRoot()
  ],
  declarations: [ProfileComponent],
  providers: [
    HttpService, UtilService
  ]
})
export class ProfileModule { }
