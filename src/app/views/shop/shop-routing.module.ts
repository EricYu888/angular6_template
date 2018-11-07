import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '店铺管理'
    },
    children: [{
      path: '',
      component: ShopComponent,
      data: {
        title: ''
      }
    },{
      path: 'detail',
      component: DetailComponent,
      data: {
        title: '详细信息'
      }
    }]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {}
