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
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';

import { RegisterUserComponent } from './register/register-user/register-user.component';
import { RegisterAdminComponent } from './register/register-admin/register-admin.component';
import { UserinterfaceChildrenPage } from './userinterface-children/userinterface-children.page';
import { AthletesChildrenPage } from './athletes-children/athletes-children.page';
import { CoachesChildrenPage } from './coaches-children/coaches-children.page';
import { TeamsChildrenPage } from './teams-children/teams-children.page';
import { TableUsersComponent } from './register/table-users/table-users.component';
import { RegisterAthletesComponent } from './athletes-children/register-athletes/register-athletes.component';
import { RegisterCoachesComponent } from './coaches-children/register-coaches/register-coaches.component';
import { TableAthletesComponent } from './athletes-children/table-athletes/table-athletes.component';
import { TableCoachesComponent } from './coaches-children/table-coaches/table-coaches.component';
import { ModalAddAthletesComponent } from './teams-children/modal-add-athletes/modal-add-athletes.component';
import { ModalAddCoachesComponent } from './teams-children/modal-add-coaches/modal-add-coaches.component';
import { ModalNewTeamComponent } from './teams-children/modal-new-team/modal-new-team.component';
import { ModalAddCertificateComponent } from './athletes-children/modal-add-certificate/modal-add-certificate.component';
import { ModalAddPaymentComponent } from './athletes-children/modal-add-payment/modal-add-payment.component';
import {MatMenuModule} from '@angular/material/menu';
import { ModalViewAllPaymentComponent } from './athletes-children/modal-view-all-payment/modal-view-all-payment.component';
import { ModalViewAllCertificateComponent } from './athletes-children/modal-view-all-certificate/modal-view-all-certificate.component';
import { TableExpirationMedicalcertificateComponent } from './userinterface-children/table-expiration-medicalcertificate/table-expiration-medicalcertificate.component';
import { TablePaymentComponent } from './userinterface-children/table-payment/table-payment.component';
import { UserprofileChildrenPage } from './userprofile-children/userprofile-children.page';
import { ModalUpdateCredentialComponent } from './userprofile-children/modal-update-credential/modal-update-credential.component';
import { FinanceChildrenPage } from './finance-children/finance-children.page';
import { TableFinanceComponent } from './finance-children/table-finance/table-finance.component';
import { ViewDetailComponent } from './finance-children/view-detail/view-detail.component';
import { BalanceComponent } from './finance-children/balance/balance.component';

@NgModule({
  declarations: [HomeComponent, RegisterChildrenPage, RegisterUserComponent, RegisterAdminComponent, UserinterfaceChildrenPage, AthletesChildrenPage, CoachesChildrenPage, TeamsChildrenPage, TableUsersComponent, RegisterAthletesComponent, RegisterCoachesComponent, TableAthletesComponent, TableCoachesComponent, ModalAddAthletesComponent, ModalAddCoachesComponent, ModalNewTeamComponent, ModalAddCertificateComponent, ModalAddPaymentComponent, ModalViewAllPaymentComponent, ModalViewAllCertificateComponent, TableExpirationMedicalcertificateComponent, TablePaymentComponent, UserprofileChildrenPage, ModalUpdateCredentialComponent, FinanceChildrenPage, TableFinanceComponent, ViewDetailComponent, BalanceComponent],
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
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
})
export class HomeModule {}
