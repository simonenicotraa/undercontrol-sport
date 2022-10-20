import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UcStartPage } from './uc-start.page';
import { StartMainComponent } from './start-main/start-main.component';
import { StartFooterComponent } from './start-footer/start-footer.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { StartHeaderComponent } from './start-header/start-header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    UcStartPage,
    StartMainComponent,
    StartFooterComponent,
    StartHeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    FormsModule
  ]
})
export class UcStartModule { }
