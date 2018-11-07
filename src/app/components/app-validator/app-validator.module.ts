import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppValidatorInputComponent } from './app-validatorinput.component';
import { AppValidatorSelectComponent } from './app-validatorselect.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [AppValidatorInputComponent, AppValidatorSelectComponent],
  declarations: [AppValidatorInputComponent, AppValidatorSelectComponent]
})
export class AppValidatorModule { }