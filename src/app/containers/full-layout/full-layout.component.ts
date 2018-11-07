import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppHeaderService } from '../../components';
import { UtilService } from '../../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit{
  constructor( public appHeaderService: AppHeaderService,
    public utilService: UtilService){
  }

  ngOnInit() {
    let count = this.utilService.getSessionStorage('count');
    if(this.utilService.validatorNum(count) && count!='0'){
      this.appHeaderService.showMsgCount(count);
    }
  }
}
