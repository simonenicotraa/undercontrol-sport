import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { RegisterUserComponent } from './register-user/register-user.component';
@Component({
  templateUrl: './register.children-page.html',
  styleUrls: ['./register.children-page.scss'],
})
export class RegisterChildrenPage implements OnInit {
  json: any;
  user: any;

  constructor(public dialog: MatDialog) {}

  openDialogAdmin() {
    const dialogRef = this.dialog.open(RegisterAdminComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogUser() {
    const dialogRef = this.dialog.open(RegisterUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getUtLoggato() {
    this.json = localStorage.getItem('isAuthenticated');
    this.user = JSON.parse(this.json);
  }
  ngOnInit(): void {
    this.getUtLoggato();
  }
}
