import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from './../../components';
import { UtilService } from './../../shared';
import { UserService } from './../../shared/services/user.service';
// import { AppValidatorInputComponent, AppValidatorModule } from './../../components/app-validator';
import { AppLoadingService } from './../../components/app-loading';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers:[UserService]

})
export class ProfileComponent implements OnInit {

  user = {
    name: "Eric",
    sex:"男",
    idnum:"21028319860102332211"
  };
  hasSubmit=false;
  constructor(
    private router: Router,
    private util: UtilService,
    private service: UserService,
    private appAlertService: AppAlertService,
    private appLoadService: AppLoadingService
  ) { }

  ngOnInit() {
  }

  jumpToModify()
  {
    this.router.navigate(['/change-password'])
  }
}
