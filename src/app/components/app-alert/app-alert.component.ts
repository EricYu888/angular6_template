import { Component } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { AppAlertService } from './app-alert-service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['app-alert.component.scss']
})
export class AppAlertComponent {
  alertsDismiss: any = [];

  subscription: Subscription;

  constructor(private appAlertService: AppAlertService) {
    this.subscription = appAlertService.Status$.subscribe(message => {
      this.alertsDismiss.push({
        type: message.type,
        msg: `${message.msg}`,
        timeout: 5000
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
