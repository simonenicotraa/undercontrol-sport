import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { IAthlCoach } from '../../interfaces/iathl-coach';
import { Iteams } from '../../interfaces/iteams';

@Component({
  selector: 'app-modal-add-athletes',
  templateUrl: './modal-add-athletes.component.html',
  styleUrls: ['./modal-add-athletes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ModalAddAthletesComponent implements OnInit {
  teams: Iteams[] = []
  athletes: IAthlCoach[] = [];
  dataSource = new MatTableDataSource(this.athletes);
error= undefined;

  constructor(
              private service: AbstractServiceService,
              private service2: AuthService,
              public dialogRef: MatDialogRef<ModalAddAthletesComponent>,
              /* prendo i dati passati  per riportarli nell'input scrivo [(ngModel)]="data.name" VEDI HTML
                  per riportarli come parametri o stamparli es {{data.id}}*/
              @Inject(MAT_DIALOG_DATA) public data: {
                                                      id:number,
                                                    }
  ) { }
  columnsToDisplay: string[] = ['name', 'surname'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;

  ngOnInit(): void {
    this.getAllAthletes();
    this.getAllTeams()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  closeDialog(){
    this.dialogRef.close();
  }
  getAllAthletes() {
    this.service.findAllAthletes().subscribe(
      (resp) => {
        this.athletes = resp;
        this.dataSource = new MatTableDataSource(this.athletes);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

getAllTeams(){
  return this.service.findAllTeam().subscribe(
    (resp)=>{
      this.teams = resp
      this.error= undefined;
    }, (err)=>{
      console.log(err.error);
      this.error = err.error;
    })
 }

  addAthleteTeam(idTeam: number, idAthlete: number){
    /* metodo uguale a addCoach su modal-add-coach ma con logica differente */
  let team = this.teams.filter(teams => teams.id === idTeam);

  let athlete= this.athletes.filter(a => a.id === idAthlete)

  team[0].athletes.push(athlete[0]);
  console.log(team[0])
  this.service.patchListAthletes(idTeam,team[0]).subscribe(
    (resp) => {
      console.log(resp)
      this.getAllTeams()
    },
    (err) => {
      console.log(err.error);
    }
  );
  this.closeDialog();
   }
}
