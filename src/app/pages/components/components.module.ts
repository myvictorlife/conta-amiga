import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShellModule } from '../shell/shell.module';

import { CheckboxWrapperComponent } from './checkbox-wrapper/checkbox-wrapper.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { RatingInputComponent } from './rating-input/rating-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShellModule,
    IonicModule.forRoot()
  ],
  declarations: [
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    RatingInputComponent
  ],
  exports: [
    ShellModule,
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    RatingInputComponent
  ],
  entryComponents: [],
})
export class ComponentsModule {}
