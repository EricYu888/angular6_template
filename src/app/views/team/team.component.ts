import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../shared/';
import { ShopService } from '../../shared/services/shop.service';
import { TeamService } from '../../shared/services/team.service';
import { AppModalService } from '../../components';

@Component({
  templateUrl: 'team.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TeamComponent implements OnInit{

  totalItems: number;
  pageNum: number;
  pageSize: number;

  allCheck: boolean;

  listitems = [];

  loading: boolean;

  alertsDismiss: any = [];

  currentTeamItem;

  shopid = '';
  activation = '';
  shoplist = [];

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public util: UtilService, public appModalService: AppModalService, public teamService: TeamService, public shopService: ShopService) {
    if (!this.totalItems) { this.totalItems = 0 }
    if (!this.pageNum) { this.pageNum = 1 }
    if (!this.pageSize) { this.pageSize = 10 }
    this.loading = false;
    this.allCheck = false;
  }

  ngOnInit() {
    this.shopService.getDropDown().then((res) => {
      if (res.code == 'SUCCESS') {
        for (var i = 0, len = res.object.length; i < len; i++) {
          var item = res.object[i];
          this.shoplist.push({
            key: item.id,
            value: item.name
          });
        }
      } else if (res.ode == 'EXPIRE') {
        this.router.navigate(['/logout'], { replaceUrl: true });
      } else {
        this.addMsg('danger', res.msg);
      }
    });
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

  jumpToAddTeam() {
    this.router.navigate(['/team/detail'], { queryParams: { add: true, modify: false } });
  }

  jumpToDetail(item) {
    this.router.navigate(['/team/detail'], { queryParams: { id: item.id, add: false, modify: false } });
  }

  jumpToModify(item) {
    this.router.navigate(['/team/detail'], { queryParams: { id: item.id, add: false, modify: true } });
  }

  startTeam(item) {
    this.currentTeamItem = item.id;
    let okCallback = () => {
      let teamid = this.currentTeamItem;
      this.currentTeamItem = null;
      this.teamService.changeState({
        teamid: teamid,
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
      this.currentTeamItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要恢复该团队么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  stopTeam(item) {
    this.currentTeamItem = item.id;
    let okCallback = () => {
      let teamid = this.currentTeamItem;
      this.currentTeamItem = null;
      this.teamService.deleteById({
        teamid: teamid
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
      this.currentTeamItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要删除该团队么?",
      okcallback: okCallback,
      cancelcallback: cancelCallback
    });
  }

  stopTeamByAdmin(item) {
    this.currentTeamItem = item.id;
    let okCallback = () => {
      let teamid = this.currentTeamItem;
      this.currentTeamItem = null;
      this.teamService.changeState({
        teamid: teamid,
        activation: "0"
      }).then((res) =>{
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
      this.currentTeamItem = null;
    }
    this.appModalService.showModal({
      type: "confirm",
      modalContent: "您确定要禁用该团队么?",
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
      console.log(list);
      this.teamService.batchDelete({list: list}).then((res) => {
        if (res.code == 'SUCCESS') {
          this.addMsg('success','删除成功');
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
        modalContent: "您确定要删除选中的团队么?",
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

  canDelete(){
    return this.util.isAdmin() || this.util.isManager();
  }

  loadData() {
    this.listitems = [];
    this.loading = true;
    this.teamService.getAll({ shopid: this.shopid, activation: this.activation, pageNum: this.pageNum, pageSize: this.pageSize }).then((res) => {
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

  convertShopName(item){
    if(this.util.isEmptyStr(item.sname)){
      return '其他';
    }else{
      return item.sname;
    }
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
