import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterChildrenPage } from './register/register.children-page';
import { UserinterfaceChildrenPage } from './userinterface-children/userinterface-children.page';

const routes: Routes = [
  { path: '', component: HomeComponent ,
  children: [
    {path:'register',component:RegisterChildrenPage },
    {path:'ui', component: UserinterfaceChildrenPage    },



    { path: '', pathMatch: 'full', redirectTo: 'ui' },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
