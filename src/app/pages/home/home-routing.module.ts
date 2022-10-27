import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthletesChildrenPage } from './athletes-children/athletes-children.page';
import { CoachesChildrenPage } from './coaches-children/coaches-children.page';
import { FinanceChildrenPage } from './finance-children/finance-children.page';
import { HomeComponent } from './home.component';
import { RegisterChildrenPage } from './register/register.children-page';
import { TeamsChildrenPage } from './teams-children/teams-children.page';
import { UserinterfaceChildrenPage } from './userinterface-children/userinterface-children.page';
import { UserprofileChildrenPage } from './userprofile-children/userprofile-children.page';

const routes: Routes = [
  { path: '', component: HomeComponent ,
  children: [
    {path:'register',component:RegisterChildrenPage },
    {path:'ui', component: UserinterfaceChildrenPage    },
    {path:'athletes', component: AthletesChildrenPage   },
    {path:'coaches', component: CoachesChildrenPage    },
    {path:'teams', component: TeamsChildrenPage   },
    {path:'profile', component: UserprofileChildrenPage   },
    {path:'finance', component: FinanceChildrenPage   },


    { path: '', pathMatch: 'full', redirectTo: 'ui' },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
