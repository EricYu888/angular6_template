import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomComponent } from './custom.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '客户管理'
    },
    children: [
      {
      path: '',
      component: CustomComponent,
      data: {
        title: ''
      }
    },
    {
      path: 'detail',
      component: DetailComponent,
      data: {
        title: '详细信息'
      }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomRoutingModule {}
