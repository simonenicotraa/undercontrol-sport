import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterAthletesComponent } from './register-athletes/register-athletes.component';

@Component({
  templateUrl: './athletes-children.page.html',
  styleUrls: ['./athletes-children.page.scss']
})
export class AthletesChildrenPage implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(RegisterAthletesComponent);
  }
}
