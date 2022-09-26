import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { Homepage } from './pages/homepage.page/homepage.page.component';
import { Homepage } from './pages/homepage/homepage..page';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    Homepage.PageComponent,
    Homepage.Page
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
