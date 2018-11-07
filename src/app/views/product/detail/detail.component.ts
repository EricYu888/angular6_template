import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../../shared/';
import { AppAlertService } from '../../../components';
import { ProductService } from '../../../shared/services/product.service';
import { AppValidatorInputComponent, AppValidatorSelectComponent } from '../../../components/app-validator';
import { AppLoadingService } from '../../../components/app-loading';
// import { revenueTypeCode, assessmentCode } from '../../../shared/code';

@Component({
  templateUrl: 'detail.component.html'
})
export class DetailComponent implements OnInit {

  @ViewChild('nameEl') nameEl;
  // @ViewChild('productNumEl') productNumEl;
  @ViewChild('interestrateEl') interestrateEl;
  @ViewChild('minimumEl') minimumEl;
  // @ViewChild('revenueTypeEl') revenueTypeEl;
  // @ViewChild('assessmentEl') assessmentEl;

  id: string;
  add: boolean;
  modify: boolean;

  alertsDismiss: any = [];
  productNum;
  product: any = {
    // assessment: '',
    description: '',
    interestrate: '',
    minimum: '',
    name: '',
    // productNum: '',
    remark: '',
    // revenueType: ''
  }

  revenueTypeList = [];
  assessmentList = [];
  hasSubmit = false;

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    public productService: ProductService,
   public appAlertService: AppAlertService) {
    // for (let key in revenueTypeCode) {
    //   this.revenueTypeList.push({
    //     key: key,
    //     value: revenueTypeCode[key]
    //   });
    // }
    // for (let key in assessmentCode) {
    //   this.assessmentList.push({
    //     key: key,
    //     value: assessmentCode[key]
    //   });
    // }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.add = params.add == 'true' ? true : false;
      this.modify = params.modify == 'true' ? true : false;
      if (this.id) {
        this.product['id'] = this.id;
        this.loadProductInfo();
      }
    });
  }

  validatorQuire(str) {
    return this.util.validatorQuire(str);
  }

  validatorPhone(str) {
    return this.util.validatorPhone(str);
  }

  validatorNum(str) {
    return this.util.validatorNum(str);
  }

  validatorMoney(str) {
    return this.util.validatorMoney(str);
  }

  validatorInterestrate(str){
    return this.util.validatorMoney(str) && Number(str)!=0;
  }

  loadProductInfo() {
    this.productService.getById({ id: this.product.id }).then(res => {
      if (res.code == 'SUCCESS') {
        this.product.assessment = res.object.assessment;
        this.product.description = res.object.description;
        this.product.interestrate = res.object.interestrate;
        this.product.minimum = ''+res.object.minimum;
        if(!this.add && !this.modify){
          this.product.interestrate += '%';
          this.product.minimum += '元';
        }
        this.product.name = res.object.name;
        this.productNum = res.object.productNum;
        this.product.remark = res.object.remark;
        // this.product.revenueType = res.object.revenueType;
      } else if (res.ode == 'EXPIRE') {
        this.router.navigate(['/logout'], { replaceUrl: true });
      } else {
        this.addErrorMsg(res.msg);
      }
    });
  }

  saveProduct() {
    this.hasSubmit = true;
    if (this.nameEl.test
      // && this.productNumEl.test
      && this.interestrateEl.test
      && this.minimumEl.test
      // && this.revenueTypeEl.test
      // && this.assessmentEl.test
      ) {
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
          this.router.navigate(['/product'], { replaceUrl: true, queryParams: { result: resultmsg } });
        } else if (res.code == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          this.addErrorMsg(res.msg);
        }
      }
      if(this.add){
        this.productService.addProduct(this.product).then(callback);
      }else if(this.modify){
        this.productService.updateProduct(this.product).then(callback);
      }
    }else{
    }
  }

  jumpToModify() {
    this.router.navigate(['/product/detail'], { queryParams: { id: this.id, add: false, modify: true } });
  }

  adc(obj)
  {
    console.log("blur")
    console.log(obj)
  }

  private addErrorMsg(msg) {
    this.alertsDismiss.push({
      type: 'danger',
      msg: `${msg}`,
      timeout: 5000
    });
  }
}
