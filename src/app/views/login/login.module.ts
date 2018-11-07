import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HttpService, UtilService } from '../../shared/';
import { LoginService } from '../../shared/services/login.service';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    AlertModule.forRoot()
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    HttpService, UtilService, LoginService
  ]
})
export class LoginModule { }
