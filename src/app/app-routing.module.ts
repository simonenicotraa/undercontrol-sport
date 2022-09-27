import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UcStartPage } from './pages/uc-start/uc-start.page';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },

    {
    path: 'start',
    component: UcStartPage,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
