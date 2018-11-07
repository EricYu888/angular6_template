import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { _404Component } from './404.component';
import { _404RoutingModule } from './404-routing.module';

@NgModule({
  imports: [
    CommonModule,
    _404RoutingModule],
  declarations: [
    _404Component
  ],
  providers: []
})
export class _404Module { }
