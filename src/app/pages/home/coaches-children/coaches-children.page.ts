import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterCoachesComponent } from './register-coaches/register-coaches.component';

@Component({
  templateUrl: './coaches-children.page.html',
  styleUrls: ['./coaches-children.page.scss']
})
export class CoachesChildrenPage implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(RegisterCoachesComponent);
  }
}
