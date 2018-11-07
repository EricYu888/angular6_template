import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { LoginService } from '../../shared/services/login.service';
import { UtilService } from '../../shared/';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('usernameInput') usernameInput: ElementRef;
  userName: any;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  password: any;
  haslogin = false;
  alertsDismiss: any = [];

  loginbtnable = false;
  loginbtntext = "登录";

  constructor(public router: Router, public util: UtilService, public loginDao: LoginService) { }

  ngOnInit() {
    // var userflag = this.util.getSessionStorage('userflag');
    // if (!this.util.isEmptyStr(userflag)) {
    //   if (userflag == '0' || userflag == '1' || userflag == '2') {
    //     this.router.navigate(['/user']);
    //   } else {
    //     this.router.navigate(['/custom']);
    //   }
    // }
  }

  public passwordfocus() {
    this.passwordInput.nativeElement.focus();
  }

  public judgeUser() {
    this.usernameInput.nativeElement
    // this.haslogin = true;
    // if (this.loginbtnable) {
    //   return;
    // }
    this.showloading();
    if (this.util.isEmptyStr(this.userName) || this.util.isEmptyStr(this.password)) {
      this.alertsDismiss.push({
        type: 'danger',
        msg: `` + '用户名或密码不能为空！',
        timeout: 5000
      });
      this.endloading()
      return;
    } else {
      this.util.setSessionStorage('userRole', "1");
      this.util.setSessionStorage('userId', 1);
      this.util.setSessionStorage('isActivated', '1');
      this.router.navigate(['/shop']);
    }
  }

  public showloading() {
    this.alertsDismiss = [];
    this.loginbtnable = true;
    this.loginbtntext = "登录中...";
  }

  public endloading() {
    this.loginbtnable = false;
    this.loginbtntext = "登录";
  }
}
