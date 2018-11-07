import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HttpService, UtilService } from '../../shared/';
import { ChangepasswordComponent } from './change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { AppValidatorModule } from './../../components/app-validator/app-validator.module'
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChangePasswordRoutingModule,
        AlertModule.forRoot(),
        AppValidatorModule
    ],
    declarations: [
        ChangepasswordComponent
    ],
    providers: [
        HttpService,UtilService
    ]
})
export class ChangePasswordModule { }
