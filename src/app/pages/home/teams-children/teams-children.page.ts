import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { AbstractServiceService } from '../abstract-service.service';
import { IAthlCoach } from '../interfaces/iathl-coach';
import { Iteams } from '../interfaces/iteams';
import { ModalAddAthletesComponent } from './modal-add-athletes/modal-add-athletes.component';
import { ModalAddCoachesComponent } from './modal-add-coaches/modal-add-coaches.component';
import { ModalNewTeamComponent } from './modal-new-team/modal-new-team.component';

@Component({
  templateUrl: './teams-children.page.html',
  styleUrls: ['./teams-children.page.scss']
})
export class TeamsChildrenPage implements OnInit {
//@ViewChild('f') form!: NgForm;
/* variabili per settaggio campo input options */
selected = 'option1';
selected2 = '';
panelOpenState = false;
error= undefined;
teams:Iteams[] = []
  constructor(
              private abstractService:AbstractServiceService,
              public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllTeams()
  }


 getAllTeams(){
  return this.abstractService.findAllTeam().subscribe(
    (resp)=>{
      console.log(resp);
      this.teams = resp
      this.error= undefined;
    }, (err)=>{
      console.log(err.error);
      this.error = err.error;
    })
 }


openDialogNewTeam(){
   this.dialog.open(ModalNewTeamComponent)
}

//Apertura del modal con passaggio dati
openDialogAthlete(id:number) {
  //seleziono il team tramite id
  let team = this.teams.filter(a => a.id === id)
  //apro il modal e passo il dato
  let dialogRef = this.dialog.open(ModalAddAthletesComponent, {
    data: {
        id:team[0].id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //Apertura del modal con passaggio dati
openDialogCoach(id:number) {
    //seleziono il team tramite id
  let team = this.teams.filter(a => a.id === id)
    //apro il modal e passo il dato
  let dialogRef = this.dialog.open(ModalAddCoachesComponent, {
    data: {
        id:team[0].id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

