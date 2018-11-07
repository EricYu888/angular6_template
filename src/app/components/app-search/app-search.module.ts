import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppSearchComponent } from './app-search.component';

@NgModule({
    imports: [ CommonModule, FormsModule ],
    exports: [ AppSearchComponent],
    declarations: [ AppSearchComponent]
  })
  export class AppSearchModule { }