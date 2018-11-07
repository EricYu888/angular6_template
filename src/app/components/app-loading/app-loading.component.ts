import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppLoadingService } from './app-loading-service';


@Component({
  selector: 'app-loading',
  templateUrl: './app-loading.component.html',
  styleUrls: ['app-loading.scss']
})
export class AppLoadingComponent {

  isShow: boolean;

  subscription: Subscription;

  constructor(private appLoadingService: AppLoadingService) {
    this.isShow = false;
    // appLoadingService.loadingEventer.subscribe(message => {
    //   if(message.type=='show'){
    //     this.isShow = true;
    //   }else{
    //     this.isShow = false;
    //   }
    // });
    this.subscription = appLoadingService.Status$.subscribe(message => {
      if (message.type == 'show') {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
