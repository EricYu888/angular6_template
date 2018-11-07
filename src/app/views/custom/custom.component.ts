import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../shared/';
import { ShopService } from '../../shared/services/shop.service';
import { CustomService } from '../../shared/services/custom.service';
import { AppModalService } from '../../components';

@Component({
  templateUrl: 'custom.component.html',
  encapsulation: ViewEncapsulation.None
  
})
export class CustomComponent implements OnInit{

  totalItems: number;
  pageNum: number;
  pageSize: number;

  allCheck: boolean;

  listitems = [];

  loading: boolean;

  alertsDismiss: any = [];

  currentCustomItem;

  name = '';
  idnum = '';
  shopid = '';
  activation = '';
  shoplist = [];

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public util: UtilService, public appModalService: AppModalService, public customService: CustomService, public shopService: ShopService) {
    if (!this.totalItems) { this.totalItems = 0 }
    if (!this.pageNum) { this.pageNum = 1 }
    if (!this.pageSize) { this.pageSize = 10 }
    this.loading = false;
    this.allCheck = false;
  }

  ngOnInit() {
    // this.shopService.getDropDown().then((res) => {
    //   if (res.code == 'SUCCESS') {
    //     for (var i = 0, len = res.object.length; i < len; i++) {
    //       var item = res.object[i];
    //       this.shoplist.push({
    //         key: item.id,
    //         value: item.name
    //       });
    //     }
    //   } else if (res.ode == 'EXPIRE') {
    //     this.router.navigate(['/logout'], { replaceUrl: true });
    //   } else {
    //     this.addMsg('danger', res.msg);
    //   }
    // });
    // this.pageChanged(null);
    // this.activatedRoute.queryParams.subscribe(params => {
    //   if (params.result == 'addSuccess') {
    //     // this.addMsg('success','添加成功');
    //   }else if (params.result == 'modifySuccess') {
    //     // this.addMsg('success','修改成功');
    //   }
    // });
  }

  pageChanged(e): void {
    if (e) {
      this.pageNum = e.page;
    }
    this.loadData();
  }

  checkChange(item){
    if(!item){
      this.listitems.forEach((item, index)=>{
        item.checked = this.allCheck;
      });
    }else{
      for(var i=0,len=this.listitems.length;i<len;i++){
        if(!this.listitems[i].checked){
          this.allCheck = false;
          return;
        }
      }
      this.allCheck = true;
    }
  }

  jumpToAddCustom() {
    this.router.navigate(['/custom/detail'], { queryParams: { add: true, modify: false } });
  }

  jumpToDetail(item) {
    this.router.navigate(['/custom/detail'], { queryParams: { id: item.id, add: false, modify: false } });
  }

  jumpToModify(item) {
    this.router.navigate(['/custom/detail'], { queryParams: { id: item.id, add: false, modify: true } });
  }

  startCustom(item) {
    this.currentCustomItem = item.id;
    let okCallback = () => {
      let customid = this.currentCustomItem;
      this.currentCustomItem = null;
      this.customService.changeState({
        customid: customid,
        activation: "1"
      }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.addMsg('success','启用成功');
          this.getAll(); 
        }else if (res.ode == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        }else{
          this.addMsg('danger',res.msg);
        }
      });
    }
    let cancelCallback = () => {
      this.currentCustomItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要恢复该客户么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  stopCustom(item) {
    this.currentCustomItem = item.id;
    let okCallback = () => {
      let customid = this.currentCustomItem;
      this.currentCustomItem = null;
      this.customService.deleteById({
        customid: customid
      }).then((res) => {
        if (res.code == 'SUCCESS') {          
          this.addMsg('success','删除成功');
          this.getAll();        
        }else if (res.ode == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        }else{
          this.addMsg('danger', res.msg);
        }
      });
    }
    let cancelCallback = () => {
      this.currentCustomItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要删除该客户么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  stopCustomByAdmin(item) {
    this.currentCustomItem = item.id;
    let okCallback = () => {
      let customid = this.currentCustomItem;
      this.currentCustomItem = null;
      this.customService.changeState({
        customid: customid,
        activation: "0"
      }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.addMsg('success','禁用成功');
          this.getAll(); 
        }else if (res.ode == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        }else{
          this.addMsg('danger',res.msg);
        }
      });
    }
    let cancelCallback = () => {
      this.currentCustomItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要禁用该客户么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  batchDelete() {
    let checklist = [];
    this.listitems.forEach((item, index) => {
      if (item.checked) {
        checklist.push(item.id);
      }
    });
    if(checklist.length==0){
      this.addMsg('danger','没有选择删除项');
      return;
    }
    let okCallback = () => {
      let list = [];
      this.listitems.forEach((item, index) => {
        if (item.checked) {
          list.push(item.id);
        }
      });
      this.customService.batchDelete({list: list}).then((res) => {
        if (res.code == 'SUCCESS') {
          this.addMsg('success','修改成功');
          this.loadData();
        }else if (res.ode == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        }else{
          this.addMsg('danger', res.msg);
        }
      });
    }
    let cancelCallback = () => {
    }
    this.appModalService.showModal({
                type: "confirm",
        modalContent: "您确定要删除选中的客户么?",
          okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  getAll() {
    this.pageNum = 1;
    this.loadData();
  }

  isAdmin() {
    return this.util.isAdmin();
  }

  isOperater() {
    return this.util.isOperater();
  }

  canDelete(){
    return this.util.isAdmin() || this.util.isManager();
  }

  convertShopName(item){
    if(this.util.isEmptyStr(item.sname)){
      return '其他';
    }else{
      return item.sname;
    }
  }

  loadData() {
    this.listitems = [];
    this.loading = true;
    this.customService.getAll({ name: this.name, idnum: this.idnum, shopid: this.shopid, activation: this.activation, pageNum: this.pageNum, pageSize: this.pageSize }).then((res) => {
      this.loading = false;
      if (res.code == 'SUCCESS') {
        let object = res.object;
        this.totalItems = object.total;
        this.listitems = object.data;
        this.listitems.forEach((item, index) => {
          item['checked'] = false;
        });
      } else if (res.code == 'EXPIRE') {
        this.router.navigate(['/logout'], { replaceUrl: true });
      } else {
        this.addMsg('danger', res.msg);
      }
    });
  }

  private addMsg(type, msg) {
    this.alertsDismiss = [];
    this.alertsDismiss.push({
      type: 'danger',
      msg: `${msg}`,
      timeout: 5000
    });
  }
}

