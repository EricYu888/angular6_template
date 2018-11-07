import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HttpService, UtilService } from '../../shared/';
import { ShopService } from '../../shared/services/shop.service';
import { AppValidatorModule } from '../../components';
import { ShopComponent } from './shop.component';
import { DetailComponent } from './detail/detail.component';
import { ShopRoutingModule } from './shop-routing.module';
import {CommonCommunicationService} from './../../shared/services/listener-service/observable-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShopRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AppValidatorModule,
    AlertModule.forRoot()
  ],
  declarations: [ ShopComponent, DetailComponent ],
  providers: [ 
    HttpService, UtilService, ShopService,CommonCommunicationService
  ]
})
export class ShopModule { }
