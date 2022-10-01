import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/auth/login/login.page';
import { HomeComponent } from './pages/home/home.component';
import { RegisterChildrenPage } from './pages/home/register/register.children-page';

import { UcStartPage } from './pages/uc-start/uc-start.page';
const routes: Routes = [

  { path: 'home',   loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  {path: 'start', component: UcStartPage },
  {path: 'login', component:LoginPage  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
