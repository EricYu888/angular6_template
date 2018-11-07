import { Component, OnInit, OnDestroy, } from '@angular/core';
import { CommonCommunicationService } from './../../shared/services/listener-service/observable-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-listener',
  templateUrl: './app-listener.component.html',
  styleUrls: ['./app-listener.component.scss']
})
export class AppListenerComponent implements OnInit, OnDestroy {

  

  subscription: Subscription;
  user={
    name:"233"
  };
  constructor(public communicationService: CommonCommunicationService) { }

  ngOnInit() {
    this.subscription = this.communicationService.Status$.subscribe(message => {
      console.log(message);
      this.user=message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
