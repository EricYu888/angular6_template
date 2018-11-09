import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../shared/';
import { ShopService } from '../../shared/services/shop.service';
import { AppModalService } from '../../components/app-modal/app-modal-service';
import { CommonCommunicationService } from './../../shared/services/listener-service/observable-service';
import { Subscription } from 'rxjs'
import { TranslateService } from '@ngx-translate/core';
@Component({
  templateUrl: 'shop.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {

  totalItems: number;
  pageNum: number;
  pageSize: number;

  allCheck: boolean;

  listitems = [];

  loading: boolean;

  alertsDismiss: any = [];

  currentShopItem;

  name = '';
  activation = '';
  subscription: Subscription;
  constructor(public router: Router, public activatedRoute: ActivatedRoute, public util: UtilService, public translate: TranslateService,
    public appModalService: AppModalService, public shopService: ShopService, public communicationService: CommonCommunicationService) {
    if (!this.totalItems) { this.totalItems = 0 }
    if (!this.pageNum) { this.pageNum = 1 }
    if (!this.pageSize) { this.pageSize = 10 }
    this.loading = false;
    this.allCheck = false;
  }

  ngOnInit() {
    this.pageChanged(null);
    // this.activatedRoute.queryParams.subscribe(params => {
    //   if (params.result == 'addSuccess') {
    //     this.addMsg('success','添加成功');
    //   }else if (params.result == 'modifySuccess') {
    //     this.addMsg('success','修改成功');
    //   }
    // });
    console.log('shop  listening')
    // this.sub=this.communicationService.listening().subscribe(res=>{
    //   console.log("shop");
    //   console.log(res);
    // })

    this.subscription = this.communicationService.Status$.subscribe(message => {
      console.log(message)
    });

    // setTimeout(() => {
    this.translate.get("welcome").subscribe((message: string) => {
      console.log(message)
    })
    // });

  }

  pageChanged(e): void {
    if (e) {
      this.pageNum = e.page;
    }
    // this.loadData();
  }

  checkChange(item) {
    if (!item) {
      this.listitems.forEach((item, index) => {
        item.checked = this.allCheck;
      });
    } else {
      for (var i = 0, len = this.listitems.length; i < len; i++) {
        if (!this.listitems[i].checked) {
          this.allCheck = false;
          return;
        }
      }
      this.allCheck = true;
    }
  }

  jumpToAddShop() {
    this.router.navigate(['/shop/detail'], { queryParams: { add: true, modify: false } });
  }

  jumpToDetail(item) {
    this.router.navigate(['/shop/detail'], { queryParams: { id: item.id, add: false, modify: false } });
  }

  jumpToModify(item) {
    this.router.navigate(['/shop/detail'], { queryParams: { id: item.id, add: false, modify: true } });
  }

  startShop(item) {
    this.currentShopItem = item.id;
    let okCallback = () => {
      let shopid = this.currentShopItem;
      this.currentShopItem = null;
      this.shopService.changeState({
        shopid: shopid,
        activation: "1"
      }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.addMsg('success', '启用成功');
          this.getAll();
        } else if (res.ode == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          this.addMsg('danger', res.msg);
        }
      });
    }
    let cancelCallback = () => {
      this.currentShopItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要恢复该店铺么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  stopShop(item) {
    this.currentShopItem = item.id;
    let okCallback = () => {
      let shopid = this.currentShopItem;
      this.currentShopItem = null;
      this.shopService.deleteById({
        shopid: shopid
      }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.addMsg('success', '删除成功');
          this.getAll();
        } else if (res.ode == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          this.addMsg('danger', res.msg);
        }
      });
    }
    let cancelCallback = () => {
      this.currentShopItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要删除该店铺么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  stopStopByAdmin(item) {
    this.currentShopItem = item.id;
    let okCallback = () => {
      let shopid = this.currentShopItem;
      this.currentShopItem = null;
      this.shopService.changeState({
        shopid: shopid,
        activation: "0"
      }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.addMsg('success', '禁用成功');
          this.getAll();
        } else if (res.ode == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          this.addMsg('danger', res.msg);
        }
      });
    }
    let cancelCallback = () => {
      this.currentShopItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要禁用该店铺么?",
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
    if (checklist.length == 0) {
      this.addMsg('danger', '没有选择删除项');
      return;
    }
    let okCallback = () => {
      let list = [];
      this.listitems.forEach((item, index) => {
        if (item.checked) {
          list.push(item.id);
        }
      });
      this.shopService.batchDelete({ list: list }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.addMsg('success', '删除成功');
          this.loadData();
        } else if (res.ode == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          this.addMsg('danger', res.msg);
        }
      });
    }
    let cancelCallback = () => {
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要删除选中的店铺么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  getAll() {
    // this.pageNum = 1;
    // this.loadData();
    let okCallback = () => {

    }
    let cancelCallback = () => {

    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要禁用该店铺么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  isAdmin() {
    return this.util.isAdmin();
  }

  canDelete() {
    return this.util.isAdmin() || this.util.isManager();
  }

  loadData() {
    this.listitems = [];
    this.loading = true;
    this.shopService.getAll({ name: this.name, activation: this.activation, pageNum: this.pageNum, pageSize: this.pageSize }).then((res) => {
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
