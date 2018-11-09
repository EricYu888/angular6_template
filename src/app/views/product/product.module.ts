import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HttpService, UtilService } from '../../shared/';
import { ProductService } from '../../shared/services/product.service';
import { AppValidatorModule } from '../../components';
import { ProductComponent } from './product.component';
import { DetailComponent } from './detail/detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { CommonCommunicationService } from './../../shared/services/listener-service/observable-service';
import { AppListenerModule } from './../../components/app-listener/app-listener.module'
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AppValidatorModule,
    AlertModule.forRoot(),
    ProductRoutingModule,
    AppListenerModule
  ],
  declarations: [ProductComponent, DetailComponent],
  providers: [
    HttpService, UtilService, ProductService, CommonCommunicationService
  ],
  // exports:[AppListenerComponent]
})
export class ProductModule { }
