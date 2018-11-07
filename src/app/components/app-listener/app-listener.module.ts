import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppListenerComponent } from './app-listener.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
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
