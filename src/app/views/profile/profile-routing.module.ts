import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import {AppValidatorInputComponent} from './../../components'

const routes: Routes = [{
    path: '',
    data: {
        title: '用户信息'
    },
    children: [
        {
            path: "",
            component: ProfileComponent
        }
    ]

}];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
