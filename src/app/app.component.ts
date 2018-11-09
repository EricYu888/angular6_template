import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './app.service';
import { UtilService, SESSION_STORAGE, LANGUAGE } from './shared';

declare var require: any;

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css', 'app.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
 
  constructor(
    private router: Router,
    private translate: TranslateService,
    private service: AppService,
    private util: UtilService
  ) {
    this.translate.addLangs(["zh", "en","jp"]);
    this.translate.setDefaultLang("zh");
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/zh|en|jp/) ? browserLang : 'zh');
  }

  ngOnInit() {
    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, 0)
    // });
  }
}
