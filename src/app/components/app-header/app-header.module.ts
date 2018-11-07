import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppHeaderComponent } from './app-header.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [AppHeaderComponent],
    declarations: [AppHeaderComponent]
})
export class AppHeaderModule { }