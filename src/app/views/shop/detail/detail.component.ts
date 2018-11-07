import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../../shared/';
import { ShopService } from '../../../shared/services/shop.service';
import { AppValidatorInputComponent } from '../../../components/app-validator';
import { AppLoadingService } from '../../../components/app-loading';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { AppAlertService } from '../../../components';

@Component({
  templateUrl: 'detail.component.html'
})
export class DetailComponent implements OnInit {

  @ViewChild('nameEl') nameEl;
  @ViewChild('phoneEl') phoneEl;
  @ViewChild('addressEl') addressEl;


  id: string;
  add: boolean;
  modify: boolean;

  hasSubmit: boolean;

  shopnum;

  shop = { name: '', phone: '', address: ''};

  alertsDismiss: any = [];

  constructor(public activatedRoute: ActivatedRoute, 
                      public router: Router,
                        public util: UtilService, 
           public appLoadingService: AppLoadingService, 
                 public shopService: ShopService,
             public appAlertService: AppAlertService) {
  }

  validatorStr(str){
    return !this.util.isEmptyStr(str);
  }

  validatorQuire(str) {
    return this.util.validatorQuire(str);
  }

  validatorPhone(str) {
    return this.util.validatorPhone(str);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.add = params.add=='true'?true:false;
      this.modify = params.modify=='true'?true:false;
      if(this.id){
        this.shop['id'] = this.id;
        this.loadShopInfo();
      }
    });
  }

  loadShopInfo(){
    this.appLoadingService.showLoading();
    this.shopService.getShopById({id:this.id}).then((res)=>{
      this.appLoadingService.hideLoading();
      if(res.code=='SUCCESS'){
        this.shop.name=res.object.name;
        this.shopnum = res.object.shopnum;
        this.shop.phone=res.object.phone;
        this.shop.address=res.object.address;
      } else if (res.code == 'EXPIRE') {
        this.router.navigate(['/logout'], { replaceUrl: true });
      } else{
      }
    });
  }

  jumpToModify() {
    this.router.navigate(['/shop/detail'], { queryParams: { id: this.id, add: false, modify: true } });
  }

  saveShop(){
    this.hasSubmit = true;
    if (this.nameEl.test && this.phoneEl.test) {
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
          this.router.navigate(['/shop'], { replaceUrl: true, queryParams: { result: resultmsg } });
        } else if (res.code == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          this.addErrorMsg(res.msg);
        }
      }
      if(this.add){
        this.shopService.addShop(this.shop).then(callback);
      }else if(this.modify){
        this.shopService.updateShop(this.shop).then(callback);
      }
    }
  }

  private addErrorMsg(msg) {
    this.alertsDismiss.push({
      type: 'danger',
      msg: `${msg}`,
      timeout: 5000
    });
  }
}
