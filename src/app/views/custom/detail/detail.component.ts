import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from '../../../components';
import { UtilService } from '../../../shared/';
import { CustomService } from '../../../shared/services/custom.service';
import { ShopService } from '../../../shared/services/shop.service';
import { AppValidatorInputComponent, AppValidatorSelectComponent } from '../../../components/app-validator';
import { AppLoadingService } from '../../../components/app-loading';
import { sexCode } from '../../../shared/code';
import { TemplateParseResult } from '@angular/compiler';

@Component({
  templateUrl: 'detail.component.html'
})
export class DetailComponent implements OnInit {

  @ViewChild('nameEl') nameEl;
  @ViewChild('sexEl') sexEl;
  @ViewChild('idnumEl') idnumEl;
  @ViewChild('bankEl') bankEl;
  @ViewChild('cardnumEl') cardnumEl;
  // @ViewChild('cardtypeEl') cardtypeEl;
  @ViewChild('phoneEl') phoneEl;
  @ViewChild('shopidEl') shopidEl;

  @ViewChild('tpl') tpl:TemplateRef<any>;

  id: string;
  add: boolean;
  modify: boolean;

  hasSubmit: boolean;

  //, cardtype: ''
  custom = { name: '', sex: '', idnum: '', bank: '', cardnum: '', phone: '', shopid: '' };

  alertsDismiss: any = [];

  shoplist;
  sexlist;

  constructor(public activatedRoute: ActivatedRoute, 
                      public router: Router,
                        public util: UtilService, 
           public appLoadingService: AppLoadingService, 
               public customService: CustomService, 
                 public shopService: ShopService,
             public appAlertService: AppAlertService) {
  }


  validatorStr(str){
    return !this.util.isEmptyStr(str);
  }

  validatorIdnum(str){
    return this.util.validatorIdnum(str);
  }

  validatorCardNum(str){
    return this.util.validatorCardNum(str);
  }

  validatorPhone(str){
    return this.util.validatorPhone(str);
  }

  isOperater(){
    return this.util.isOperater();
  }

  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.id = params.id;
    //   this.add = params.add=='true'?true:false;
    //   this.modify = params.modify=='true'?true:false;
    //   this.shoplist = [];
    //   this.sexlist = [];
    //   if(this.id){
    //     this.custom['id'] = this.id;
    //     this.loadCustomInfo();       
    //   }
    //   this.loadShopInfo();
    //   this.loadSexInfo()
    // });
  }

  loadCustomInfo(){
    // this.appLoadingService.showLoading();
    // this.customService.getById({id:this.id}).then((res)=>{
    //   this.appLoadingService.hideLoading();
    //   if(res.code == 'SUCCESS'){
    //     this.custom.name = res.object.name;
    //     this.custom.sex = res.object.sex;
    //     this.custom.idnum = res.object.idnum;
    //     this.custom.bank = res.object.bank;
    //     this.custom.cardnum = res.object.cardnum;
    //     // this.custom.cardtype = res.object.cardtype;
    //     this.custom.phone = res.object.phone;
    //     this.custom.shopid = res.object.shopid==null?'':res.object.shopid;
    //   } else if (res.code == 'EXPIRE') {
    //     this.router.navigate(['/logout'], { replaceUrl: true });
    //   } else{
    //   }
    // });
  }

  loadSexInfo(){
    // this.appLoadingService.showLoading();
    // for(var item in sexCode) {
    //   this.sexlist.push({
    //     key: item,
    //     value: sexCode[item]
    //   });    
    // }
  }

  loadShopInfo(){
    // this.appLoadingService.showLoading();
    // this.shopService.getDropDown().then((res) => {
    //   this.appLoadingService.hideLoading();
    //   if (res.code == 'SUCCESS') {
    //     // this.shoplist.push({
    //     //   key: '',
    //     //   value: '其他'
    //     // });
    //     for (var i = 0, len = res.object.length; i < len; i++) {
    //       var item = res.object[i];
    //       this.shoplist.push({
    //         key: item.id,
    //         value: item.name
    //       });
    //     }
    //     if(this.custom.shopid=='' && this.shoplist.length==1){
    //       this.custom.shopid = this.shoplist[0].key;
    //     }
    //   } else if (res.code == 'EXPIRE') {
    //     this.router.navigate(['/logout'], { replaceUrl: true });
    //   } else {
    //     this.addErrorMsg(res.msg);
    //   }
    // });
  }

  saveCustom(){
    // this.hasSubmit = true;
    // if (this.nameEl.test && this.sexEl.test && this.idnumEl.test && this.bankEl.test && this.phoneEl.test && this.shopidEl.test && this.cardnumEl.test) {
    //   this.appLoadingService.showLoading();
    //   let callback = (res)=>{
    //     this.appLoadingService.hideLoading();
    //     if (res.code == 'SUCCESS') {
    //       var resultmsg = '';
    //       if(this.add){
    //         resultmsg = 'addSuccess';
    //         this.appAlertService.addAlert({type: 'info', msg: "添加成功"});
    //       }else if(this.modify){
    //         resultmsg = 'modifySuccess';
    //         this.appAlertService.addAlert({type: 'info', msg: "修改成功"});
    //       }
    //       this.router.navigate(['/custom'], { replaceUrl: true, queryParams: { result: resultmsg } });
    //     } else if (res.code == 'EXPIRE') {
    //       this.router.navigate(['/logout'], { replaceUrl: true });
    //     } else {
    //       this.addErrorMsg(res.msg);
    //     }
    //   }
    //   if(this.add){
    //     this.customService.addCustom(this.custom).then(callback);
    //   }else if(this.modify){
    //     this.customService.updateCustom(this.custom).then(callback);
    //   }
    // }
  }

  jumpToModify() {
    this.router.navigate(['/custom/detail'], { queryParams: { id: this.id, add: false, modify: true } });
  }

  private addErrorMsg(msg) {
    this.alertsDismiss.push({
      type: 'danger',
      msg: `${msg}`,
      timeout: 5000
    });
  }
}
