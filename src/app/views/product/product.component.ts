import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../shared/';
import { AppModalService } from '../../components';
import { ProductService } from '../../shared/services/product.service';
import { CommonCommunicationService } from './../../shared/services/listener-service/observable-service';

@Component({
  templateUrl: 'product.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {

  totalItems: number;
  pageNum: number;
  pageSize: number;
  allCheck: boolean;

  listitems = [];

  loading: boolean;

  alertsDismiss: any = [];

  currentUserItem;

  name = '';
  activation = '';
  // productNum = '';

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute,
    public util: UtilService,
    public productService: ProductService,
    public appModalService: AppModalService,
    public commoncommunicationService:CommonCommunicationService
    ) {
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

  jumpToAddProduct() {
    this.router.navigate(['/product/detail'], { queryParams: { add: true, modify: false } });
  }

  jumpToDetail(item) {
    this.router.navigate(['/product/detail'], { queryParams: { id: item.id, add: false, modify: false } });
  }

  jumpToModify(item) {
    this.router.navigate(['/product/detail'], { queryParams: { id: item.id, add: false, modify: true } });
  }

  startProduct(item) {
    this.currentUserItem = item.id;
    let okCallback = () => {
      let productid = this.currentUserItem;
      this.currentUserItem = null;
      this.productService.changeState({
        productid: productid,
        activation: "1"
      }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.addMsg('success', '启用成功');
          this.loadData();
        } else if (res.ode == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          this.addMsg('danger', res.msg);
        }
      });
    }
    let cancelCallback = () => {
      this.currentUserItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要恢复该商品么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  stopProduct(item) {
    this.currentUserItem = item.id;
    let okCallback = () => {
      let productid = this.currentUserItem;
      this.currentUserItem = null;
      this.productService.deleteById({
        productid: productid
      }).then((res) => {
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
      this.currentUserItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要删除该用户么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  stopProductByAdmin(item) {
    this.currentUserItem = item.id;
    let okCallback = () => {
      let productid = this.currentUserItem;
      this.currentUserItem = null;
      this.productService.changeState({
        productid: productid,
        activation: "0"
      }).then((res) => {
        if (res.code == 'SUCCESS') {
          this.addMsg('success', '禁用成功');
          this.loadData();
        } else if (res.ode == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          this.addMsg('danger', res.msg);
        }
      });
    }
    let cancelCallback = () => {
      this.currentUserItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要禁用该商品么?",
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
      this.productService.batchDelete({ list: list }).then((res) => {
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
      modalContent: "您确定要删除该商品么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  getAll() {
    let data={
      name:'Eric',
      sex:"1",
      age:27
    }
    console.log("product publish ");;
    this.commoncommunicationService.publishData(data);
   
    // this.pageNum = 1;
    // this.loadData();
  }

  isAdmin() {
    return this.util.isAdmin();
  }

  canDelete() {
    return this.util.isAdmin() || this.util.isManager() || this.util.isAccoutant();
  }

  loadData() {
    this.listitems = [];
    this.loading = true;
    this.productService.getAll({
      name: this.name,
      // productNum:this.productNum,
      activation: this.activation,
      pageNum: this.pageNum,
      pageSize: this.pageSize
    }).then((res) => {
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

  // convertRevenueTypeCode(str){
  //   return revenueTypeCode[str];
  // }

  private addMsg(type, msg) {
    this.alertsDismiss = [];
    this.alertsDismiss.push({
      type: 'danger',
      msg: `${msg}`,
      timeout: 5000
    });
  }
}
