import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from '../../../components';
import { UtilService } from '../../../shared/';
import { UserService } from '../../../shared/services/user.service';
import { TeamService } from '../../../shared/services/team.service';
import { ShopService } from '../../../shared/services/shop.service';
import { AppValidatorInputComponent, AppValidatorSelectComponent } from '../../../components/app-validator';
import { AppLoadingService } from '../../../components/app-loading';
import { roleCode } from '../../../shared/code';
import { AlertConfig } from 'ngx-bootstrap/alert';

@Component({
  templateUrl: 'detail.component.html'
})
export class DetailComponent implements OnInit {

  @ViewChild('nameEl') nameEl;
  @ViewChild('codeEl') codeEl;
  @ViewChild('passwordEl') passwordEl;
  @ViewChild('confirmpasswordEl') confirmpasswordEl;
  // @ViewChild('idnumEl') idnumEl;
  @ViewChild('phoneEl') phoneEl;
  @ViewChild('roleEl') roleEl;
  @ViewChild('shopEl') shopEl;
  @ViewChild('teamEl') teamEl;

  id: string;
  add: boolean;
  modify: boolean;

  hasSubmit: boolean;
  confirmpassword: any;
  resetPasswordFlag = false;

  //idnum: '',, code: ''
  person = { name: '', role: '', shopid: '', teamid: '', phone: ''};

  alertsDismiss: any = [];

  rolelist;
  shoplist;
  teamlist;

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    public userService: UserService,
    public teamService: TeamService,
    public shopService: ShopService,
    public appAlertService: AppAlertService) {
  }


  validatorPhone(str) {
    return this.util.validatorPhone(str);
  }

  validatorStr(str) {
    return !this.util.isEmptyStr(str);
  }

  validatorPaswd(str) {
    return this.resetPasswordFlag && !this.util.isEmptyStr(str);
  }

  validatorConfirmPaswd(str) {
    return !this.util.isEmptyStr(str) && (str == this.person['password']);
  }

  validatorPart(str) {
    return (this.person.role != '3') || !this.util.isEmptyStr(str);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.add = params.add == 'true' ? true : false;
      this.modify = params.modify == 'true' ? true : false;
      if (this.add) {
        this.resetPasswordFlag = true;
      }
      var userflag = this.util.getSessionStorage('userflag');
      this.rolelist = [];
      this.shoplist = [];
      this.teamlist = [];
      for (let key in roleCode) {
        if (this.add) {
          if (Number(userflag) < Number(key))
            this.rolelist.push({
              key: key,
              value: roleCode[key]
            });
        } else {
          if (Number(userflag) <= Number(key))
            this.rolelist.push({
              key: key,
              value: roleCode[key]
            });
        }
      }
      if (this.id) {
        this.person['id'] = this.id;
        this.loadUserInfo();
      }
      this.loadShopInfo();
    });
  }

  roleChange(e) {
    this.person.teamid = '';
    this.person.shopid = '';
    if(this.canShowLoginInfo()){
      this.person['code']='';
      if(this.add){
        this.person['password']='';
      }
      this.person['password']='';
    }else{
      delete this.person['code'];
      delete this.person['password'];
    }
  }

  canShowLoginInfo(){
    return this.person.role == '0' || this.person.role == '1' || this.person.role == '2' || this.person.role == '3';
  }

  loadUserInfo() {
    this.appLoadingService.showLoading();
    this.userService.getUserById({ userid: this.id }).then((res) => {
      this.appLoadingService.hideLoading();
      if (res.code == 'SUCCESS') {
        this.person['code'] = res.object.code;
        this.person.name = res.object.name;
        // this.person.idnum = res.object.idnum;
        this.person.role = res.object.role;
        // this.roleChange(null);
        if(this.person.role=='4'){
          this.resetPasswordFlag = true;
        }
        this.person.phone = res.object.phone;
        this.person.shopid = res.object.shopid == null ? '' : res.object.shopid;
        this.person.teamid = res.object.teamid == null ? '' : res.object.teamid;
        this.loadTeamInfo(null);
      } else if (res.code == 'EXPIRE') {
        this.router.navigate(['/logout'], { replaceUrl: true });
      } else {
        this.addErrorMsg(res.msg);
      }
    });
  }

  loadTeamInfo($event) {
    this.teamlist = [];
    // this.person.teamid = '';
    // this.appLoadingService.showLoading();
    if (this.util.isEmptyStr(this.person.shopid)) {
      return;
    }
    this.teamService.getDropDown({ shopid: this.person.shopid }).then((res) => {
      // this.appLoadingService.hideLoading();
      if (res.code == 'SUCCESS') {
        // this.teamlist.push({
        //   key: '',
        //   value: '其他'
        // });
        for (var i = 0, len = res.object.length; i < len; i++) {
          var item = res.object[i];
          this.teamlist.push({
            key: item.id,
            value: item.name
          });
        }
      } else if (res.ode == 'EXPIRE') {
        this.router.navigate(['/logout'], { replaceUrl: true });
      } else {
        this.addErrorMsg(res.msg);
      }
    });
  }

  loadShopInfo() {
    this.shoplist = [];
    this.appLoadingService.showLoading();
    this.shopService.getDropDown().then((res) => {
      this.appLoadingService.hideLoading();
      if (res.code == 'SUCCESS') {
        // this.shoplist.push({
        //   key: '',
        //   value: '其他'
        // });
        for (var i = 0, len = res.object.length; i < len; i++) {
          var item = res.object[i];
          this.shoplist.push({
            key: item.id,
            value: item.name
          });
        }
        // this.loadTeamInfo(null);
      } else if (res.ode == 'EXPIRE') {
        this.router.navigate(['/logout'], { replaceUrl: true });
      } else {
        this.addErrorMsg(res.msg);
      }
    });
  }

  saveUser() {
    this.hasSubmit = true;
    if ((!this.confirmpasswordEl || this.confirmpasswordEl.test)
      // && this.idnumEl.test
      && this.nameEl.test
      && (!this.codeEl || this.codeEl.test)
      && (!this.passwordEl || this.passwordEl.test)
      && this.phoneEl.test
      && this.roleEl.test
      && (!this.shopEl || this.shopEl.test)
      && (!this.teamEl || this.teamEl.test)) {
      this.appLoadingService.showLoading();
      let callback = (res) => {
        this.appLoadingService.hideLoading();
        if (res.code == 'SUCCESS') {
          var resultmsg = '';
          if (this.add) {
            resultmsg = 'addSuccess';
            this.appAlertService.addAlert({ type: 'info', msg: "添加成功" });
          } else if (this.modify) {
            this.appAlertService.addAlert({ type: 'info', msg: "修改成功" });
            resultmsg = 'modifySuccess';
          }
          this.router.navigate(['/user'], { replaceUrl: true, queryParams: { result: resultmsg } });
        } else if (res.code == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          this.addErrorMsg(res.msg);
        }
      }
      if (this.add) {
        this.userService.addUser(this.person).then(callback);
      } else if (this.modify) {
        this.userService.updateUser(this.person).then(callback);
      }
    } else {
    }
  }

  jumpToModify() {
    this.router.navigate(['/user/detail'], { queryParams: { id: this.id, add: false, modify: true } });
  }

  resetPassword() {
    this.person['password'] == '';
    this.resetPasswordFlag = true;
  }

  private addErrorMsg(msg) {
    this.alertsDismiss.push({
      type: 'danger',
      msg: `${msg}`,
      timeout: 5000
    });
  }
}
