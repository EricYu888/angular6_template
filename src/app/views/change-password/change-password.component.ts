import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from './../../components';
import { UtilService } from './../../shared'
import { UserService } from './../../shared/services/user.service'
import { AppValidatorInputComponent, AppValidatorModule } from './../../components/app-validator'
import { AppLoadingService } from './../../components/app-loading';

@Component({
  selector: 'app-changepassword',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [UserService]
})
export class ChangepasswordComponent implements OnInit {

  @ViewChild('oldPassword') oldPassword;
  @ViewChild('newPassword') newPassword;
  @ViewChild('repeatNewPassword') repeatNewPassword;
  user = {
    password: "",
    newPassword: "",
    newRepeatPassword: ""
  };
  hasSubmit = false;
  constructor(
    private router: Router,
    private util: UtilService,
    private service: UserService,
    private appAlertService: AppAlertService,
    private appLoadService: AppLoadingService
  ) {
    

  }

  validatorPaswd(str) {
    return !this.util.isEmptyStr(str, 6);
  }

  validatorConfirmPaswd(str) {
    return !this.util.isEmptyStr(str, 6) && (str === this.user['newPassword']);
  }
  ngOnInit() {
  }

  savePassword() {
    this.hasSubmit = true;
    console.log(this.user);
    if ((!this.oldPassword || this.oldPassword.test)
      && (!this.newPassword || this.newPassword.test)
      && (!this.repeatNewPassword || this.repeatNewPassword.test)) {
      this.appLoadService.showLoading();
      setTimeout(() => {
        console.log(this.user)
        this.appLoadService.hideLoading();
      }, 2000)
    } else {
      console.log(111111221)
    }
  }
}
