import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonCommunicationService } from './../../shared/services/listener-service/observable-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-listener',
  templateUrl: './app-listener.component.html',
  styleUrls: ['./app-listener.component.scss']
})
export class AppListenerComponent implements OnInit, OnDestroy {

  @Input() public age: any;
  @Output() public onClick = new EventEmitter<any>();

  subscription: Subscription;
  user = {
    name: "233" 
  };
  constructor(public communicationService: CommonCommunicationService) { }

  ngOnInit() {
    this.subscription = this.communicationService.Status$.subscribe(message => {
      console.log(message);
      this.user = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
