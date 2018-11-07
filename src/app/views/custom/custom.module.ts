import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { HttpService, UtilService } from '../../shared/';
import { CustomService } from '../../shared/services/custom.service';
import { ShopService } from '../../shared/services/shop.service';

import { AppValidatorModule } from '../../components';

import { CustomComponent } from './custom.component';
import { DetailComponent } from './detail/detail.component';

import { CustomRoutingModule } from './custom-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AppValidatorModule,
    AlertModule.forRoot()
  ],
  declarations: [ CustomComponent, DetailComponent ],
  providers: [ HttpService, UtilService, CustomService, ShopService ]
})
export class CustomModule { }
