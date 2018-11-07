import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [{
  path: '',
  data: {
    title: '理财产品管理'
  },
  children: [{
    path: '',
    component: ProductComponent,
    data: {
      title: ''
    }
  }, {
    path: 'detail',
    component: DetailComponent,
    data: {
      title: '详细信息'
    }
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
