import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppListenerComponent } from './app-listener.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    declarations: [
        AppListenerComponent
    ],
    exports:
    [
        AppListenerComponent
    ] 
})
export class AppListenerModule { }
