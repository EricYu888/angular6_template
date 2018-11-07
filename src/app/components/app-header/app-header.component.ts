import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AppHeaderService } from './app-header-service';
import { Router, ActivatedRoute ,Routes} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  msgcount = '';
  username = "eric";
  subscription: Subscription;

  constructor(public appHeaderService: AppHeaderService,) {
    // this.appHeaderService.headerEventer.subscribe(message => {
    //   this.msgcount = message;
    // });
    this.subscription = appHeaderService.Status$.subscribe(message => {
      this.msgcount = message;
    });
  }

  ngOnDestroy() {
    // this.appHeaderService.headerEventer.unsubscribe();
    this.subscription.unsubscribe();
  }
}
