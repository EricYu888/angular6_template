import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpService, UtilService } from '../../shared/';
import { LogoutService } from '../../shared/services/logout.service';

import { LogoutComponent } from './logout.component';
import { LogoutRoutingModule } from './logout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LogoutRoutingModule],
  declarations: [
    LogoutComponent
  ],
  providers: [
    HttpService, UtilService, LogoutService
  ]
})
export class LogoutModule { }
