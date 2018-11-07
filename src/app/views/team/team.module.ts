import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { HttpService, UtilService } from '../../shared/';
import { TeamService } from '../../shared/services/team.service';
import { ShopService } from '../../shared/services/shop.service';


import { AppValidatorModule } from '../../components';

import { TeamComponent } from './team.component';
import { DetailComponent } from './detail/detail.component';

import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TeamRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AppValidatorModule,
    AlertModule.forRoot()
  ],
  declarations: [ TeamComponent, DetailComponent ],
  providers: [ HttpService, UtilService, TeamService, ShopService ]
})
export class TeamModule { }
