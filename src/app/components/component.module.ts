import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppAlertComponent } from './app-alert/app-alert.component';
import { AppBreadcrumbsComponent } from './app-breadcrumbs/app-breadcrumbs.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppListenerComponent } from './app-listener/app-listener.component'
import { AppLoadingComponent } from './app-loading/app-loading.component';
import { AppModalComponent } from './app-modal/app-modal.component';
import { AppSearchComponent } from './app-search/app-search.component';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';
import { AppSidebarFooterComponent } from './app-sidebar-footer/app-sidebar-footer.component';
import { AppSidebarFormComponent } from './app-sidebar-form/app-sidebar-form.component';
import { AppSidebarHeaderComponent } from './app-sidebar-header/app-sidebar-header.component';
import { AppSidebarMinimizerComponent } from './app-sidebar-minimizer/app-sidebar-minimizer.component';
import { AppSidebarNavComponent, AppSidebarNavDropdownComponent, AppSidebarNavItemComponent, AppSidebarNavLinkComponent, AppSidebarNavTitleComponent } from './app-sidebar-nav/app-sidebar-nav.component';
import { AppValidatorInputComponent } from './app-validator/app-validatorinput.component';
import { AppValidatorSelectComponent } from './app-validator/app-validatorselect.component'

import { AppAlertService } from './app-alert/app-alert-service';
import { AppModalService } from './app-modal/app-modal-service';
import { AppLoadingService } from './app-loading/app-loading-service';
import { AppHeaderService } from './app-header/app-header-service';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppAlertComponent,
        AppBreadcrumbsComponent,
        AppFooterComponent,
        AppHeaderComponent,
        AppListenerComponent,
        AppLoadingComponent,
        AppModalComponent,
        AppSearchComponent,
        AppSidebarComponent,
        AppSidebarFooterComponent,
        AppSidebarFormComponent,
        AppSidebarHeaderComponent,
        AppSidebarMinimizerComponent,
        AppSidebarNavComponent,
        AppSidebarNavDropdownComponent, AppSidebarNavItemComponent, AppSidebarNavLinkComponent, AppSidebarNavTitleComponent,
        AppValidatorInputComponent,
        AppValidatorSelectComponent],
    exports: [
        AppAlertComponent,
        AppBreadcrumbsComponent,
        AppFooterComponent,
        AppHeaderComponent,
        AppListenerComponent,
        AppLoadingComponent,
        AppModalComponent,
        AppSearchComponent,
        AppSidebarComponent,
        AppSidebarFooterComponent,
        AppSidebarFormComponent,
        AppSidebarHeaderComponent,
        AppSidebarMinimizerComponent,
        AppSidebarNavComponent,
        AppSidebarNavDropdownComponent, AppSidebarNavItemComponent, AppSidebarNavLinkComponent, AppSidebarNavTitleComponent,
        AppValidatorInputComponent,
        AppValidatorSelectComponent
    ],
    providers: [
        AppModalService, AppLoadingService, AppAlertService, AppHeaderService
    ]
})
export class ComponentsModule { }
