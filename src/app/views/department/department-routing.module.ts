import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentComponent } from './department.compontent';
// import { DetailComponent } from './detail/detail.component';

const routes: Routes = [{
  path: '',
  data: {
    title: '部门管理'
  },
  children: [{
    path: '',
    component: DepartmentComponent,
    data: {
      title: ''
    }
  }
    // , {
    //   path: 'detail',
    //   component: DetailComponent,
    //   data: {
    //     title: '详细信息'
    //   }
    // }
  ]
}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
