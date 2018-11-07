import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './change-password.component'


const routes: Routes = [{
    path: '',
    data: {
        title: '修改密码'
    },
    children: [{
        path: '',
        component: ChangepasswordComponent,
        data: {
            title: ''
        }
    }]
}]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }
