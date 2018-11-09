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
    // translate.addLangs(['cn', 'en', 'jp']);
    // translate.setDefaultLang('cn');
    // const browserLanguage = translate.getBrowserLang();
    // const localLang = this.util.getLocalStorage(SESSION_STORAGE.LANGUAGE);
    // if (localLang) {
    //   translate.use(localLang);
    // }
    // else {
    //   translate.use(browserLanguage.match(/en|cn|jp/) ? browserLanguage : 'cn');
    // }
    // try {
    //   // let config = require('./../assets/config.json');
    //   // let lauguages = JSON.parse(JSON.stringify(config.DEFAULT_LANGUAGE));
    //   // if (!this.util.getLocalStorage(LANGUAGE.LIST_KEY)) {
    //   //   this.util.setLocalStorage(LANGUAGE.LIST_KEY, JSON.stringify(lauguages))
    //   // }
    // }
    // catch{ }
    // // this.service.registerLanguageChangeListener(result=>{
    // //   this.loading=result;
    // // })

    this.translate.addLangs(["cn", "en","jp"]);
    this.translate.setDefaultLang("cn");
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/cn|en|jp/) ? browserLang : 'cn');
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });


  }
}
