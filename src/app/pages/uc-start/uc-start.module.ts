import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UcStartPage } from './uc-start.page';
import { StartMainComponent } from './start-main/start-main.component';
import { StartFooterComponent } from './start-footer/start-footer.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { StartHeaderComponent } from './start-header/start-header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
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
    MatCardModule
  ]
})
export class UcStartModule { }
