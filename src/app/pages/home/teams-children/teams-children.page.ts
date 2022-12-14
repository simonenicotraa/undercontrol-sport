import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { AbstractServiceService } from '../abstract-service.service';
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

 /* variabile durata snackBar */
 durationInSeconds = 4;
  constructor(
              private _snackBar: MatSnackBar,
              private abstractService:AbstractServiceService,
              private authService:AuthService,
              public dialog:MatDialog,
             ) { }

  ngOnInit(): void {
    this.getAllTeams()
  }

  openSnackBar(stringa:string) {
    this._snackBar.open(stringa, 'Close',{
      horizontalPosition: 'center',
      verticalPosition:'top',
      duration: this.durationInSeconds * 1000
    }
    )
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
      this.authService.reloadRoute();
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
      this.authService.reloadRoute();
    });
  }



  deleteTeam(id:number){
     this.abstractService.deleteTeam(id).subscribe();
      this.openSnackBar("Team Deleted")
      this.getAllTeams()
      this.authService.reloadRoute()
  }

  openDialogUpdateTeam(id:number){
    let obj = this.teams.filter((team) => team.id === id);
    let t= obj[0];
    let dialogRef = this.dialog.open(ModalNewTeamComponent,{
      data:{
        id:t.id,
        name:t.name,
        season:t.season,
        gender:t.gender
      }
    })
  }
  /* funzione per rimuovere coach dal team */
  patchListRemoveCoache(idTeam:number|undefined, idCoach:number|undefined){
return this.abstractService.patchListRemoveCoaches(idTeam, idCoach).subscribe(
  (resp)=>{
    console.log(resp);
    this.error= undefined;
    this.getAllTeams()
  }, (err)=>{
    console.log(err.error);
    this.error = err.error;
    this.getAllTeams()
  })
  }
  /* funzione per rimuovere Atleta dal team */
  patchListRemoveAtlete(idTeam:number|undefined, idAthlete:number|undefined){
    return this.abstractService.patchListRemoveAthlete(idTeam, idAthlete).subscribe(
      (resp)=>{
        console.log(resp);
        this.error= undefined;
        this.getAllTeams()
      }, (err)=>{
        console.log(err.error);
        this.error = err.error;
        this.getAllTeams()
      })
  }
}

