import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RegisterChildrenPage } from './register/register.children-page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';


import { RegisterUserComponent } from './register/register-user/register-user.component';
import { RegisterAdminComponent } from './register/register-admin/register-admin.component';
import { FormsModule } from '@angular/forms';
import { UserinterfaceChildrenPage } from './userinterface-children/userinterface-children.page';
import { AthletesChildrenPage } from './athletes-children/athletes-children.page';
import { CoachesChildrenPage } from './coaches-children/coaches-children.page';
import { TeamsChildrenPage } from './teams-children/teams-children.page';


@NgModule({
  declarations: [HomeComponent, RegisterChildrenPage, RegisterUserComponent, RegisterAdminComponent, UserinterfaceChildrenPage, AthletesChildrenPage, CoachesChildrenPage, TeamsChildrenPage],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    FormsModule
  ],
})
export class HomeModule {}
