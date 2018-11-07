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

@Component({
  templateUrl: 'detail.component.html'
})
export class DetailComponent implements OnInit {

  @ViewChild('nameEl') nameEl;
  // @ViewChild('teamnumEl') teamnumEl;
  @ViewChild('shopidEl') shopidEl;

  id: string;
  add: boolean;
  modify: boolean;

  hasSubmit: boolean;

  // teamnum;
  team = { name: '', shopid: '' };

  alertsDismiss: any = [];

  shoplist;

  constructor(public activatedRoute: ActivatedRoute, 
                      public router: Router,
                        public util: UtilService, 
           public appLoadingService: AppLoadingService, 
                 public teamService: TeamService, 
                 public shopService: ShopService,
             public appAlertService: AppAlertService) {
  }


  validatorStr(str){
    return !this.util.isEmptyStr(str);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.shoplist = [];
      this.id = params.id;
      this.add = params.add=='true'?true:false;
      this.modify = params.modify=='true'?true:false;
      if(this.id){
        this.team['id'] = this.id;
        this.loadTeamInfo();       
      }
      this.loadShopInfo();
    });
  }

  loadTeamInfo(){
    this.appLoadingService.showLoading();
    this.teamService.getTeamById({id:this.id}).then((res)=>{
      this.appLoadingService.hideLoading();
      if(res.code == 'SUCCESS'){
        this.team.name = res.object.name;
        // this.teamnum = res.object.teamnum;
        this.team.shopid = res.object.shopid;
      } else if (res.code == 'EXPIRE') {
        this.router.navigate(['/logout'], { replaceUrl: true });
      } else{
      }
    });
  }

  loadShopInfo(){
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
      } else if (res.code == 'EXPIRE') {
        this.router.navigate(['/logout'], { replaceUrl: true });
      } else {
        this.addErrorMsg(res.msg);
      }
    });
  }

  saveTeam(){
    this.hasSubmit = true;
    // && this.teamnumEl.test
    if (this.nameEl.test && this.shopidEl.test) {
      this.appLoadingService.showLoading();
      let callback = (res)=>{
        this.appLoadingService.hideLoading();
        if (res.code == 'SUCCESS') {
          var resultmsg = '';
          if(this.add){
            resultmsg = 'addSuccess';
            this.appAlertService.addAlert({type: 'info', msg: "添加成功"});
          }else if(this.modify){
            resultmsg = 'modifySuccess';
            this.appAlertService.addAlert({type: 'info', msg: "修改成功"});
          }
          this.router.navigate(['/team'], { replaceUrl: true, queryParams: { result: resultmsg } });
        } else if (res.code == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          this.addErrorMsg(res.msg);
        }
      }
      if(this.add){
        this.teamService.addTeam(this.team).then(callback);
      }else if(this.modify){
        this.teamService.updateTeam(this.team).then(callback);
      }
    }
  }

  jumpToModify() {
    this.router.navigate(['/team/detail'], { queryParams: { id: this.id, add: false, modify: true } });
  }

  private addErrorMsg(msg) {
    this.alertsDismiss.push({
      type: 'danger',
      msg: `${msg}`,
      timeout: 5000
    });
  }
}
