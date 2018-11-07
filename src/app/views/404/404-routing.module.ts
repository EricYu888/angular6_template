import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { _404Component } from './404.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    component: _404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class _404RoutingModule {}
