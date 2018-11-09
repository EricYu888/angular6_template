import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonCommunicationService } from './../../shared/services/listener-service/observable-service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-listener',
  templateUrl: './app-listener.component.html',
  styleUrls: ['./app-listener.component.scss']
})
export class AppListenerComponent implements OnInit, OnDestroy {

  @Input() public age: any;
  @Input() public items = [];
  @Output() public onClick = new EventEmitter<any>();

  subscription: Subscription;
  user = {
    name: "233"
  };
  constructor(
    public communicationService: CommonCommunicationService,
    public translate: TranslateService
  ) {
    // this.translate.use('cn')
   }

  ngOnInit() {
    this.subscription = this.communicationService.Status$.subscribe(message => {
      console.log(message);
      this.user = message;
    });

    this.translate.onLangChange.subscribe(language => {
      console.log("language");
      console.log(language);
    });
    console.log(" language ")
    // this.translate.get('configuration.language').subscribe(res=>{
    //   console.log(res)
    // })

    

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
