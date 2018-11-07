import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { AppComponent } from './app.component';
import { UtilService, AuthGuard,CommonCommunicationService } from './shared';
import { AppModalService, AppLoadingService, AppAlertService, AppHeaderService } from './components';
import {AppListenerModule} from './components/app-listener/app-listener.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {AppService} from './app.service';
// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

//Import components
import {
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
  AppModalComponent,
  AppLoadingComponent,
  // AppListenerComponent
} from './components';

const APP_COMPONENTS = [
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
  AppModalComponent,
  AppLoadingComponent,
  // AppListenerComponent
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PaginationModule } from 'ngx-bootstrap/pagination';

export function HttpLoaderFactory(http:HttpClient)
{
  return new TranslateHttpLoader(http,'./assets/i18n/','.json')
}
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AppListenerModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
  ],
  providers: [
    AuthGuard, UtilService,
    AppModalService, AppLoadingService, AppAlertService, AppHeaderService,
    CommonCommunicationService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
