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
import { ModalAddAthletesComponent } from '../modal-add-athletes/modal-add-athletes.component';

@Component({
  selector: 'app-modal-add-coaches',
  templateUrl: './modal-add-coaches.component.html',
  styleUrls: ['./modal-add-coaches.component.scss'],
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
export class ModalAddCoachesComponent implements OnInit {
  coaches: IAthlCoach[] = [];
  teams: Iteams[] = [];
  dataSource = new MatTableDataSource(this.coaches);
  error= undefined

  constructor(
              private service: AbstractServiceService,
              private service2: AuthService,
              public dialogRef: MatDialogRef<ModalAddAthletesComponent>,
              /* prendo i dati passati all'apertura del modal*/
              @Inject(MAT_DIALOG_DATA)
              public data: {
                id: number;
    }
  ) {}
  //variabili per settaggio tabella ==== Angular Material
  columnsToDisplay: string[] = ['name', 'surname'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  //variabile per settaggio pannello a espanzione ==== Angular Material
  expandedElement: any | null;

  /* Metodo per Filtrare il contenuto della tabella */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getAllAthletes();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  getAllAthletes() {
    this.service.findAllCoaches().subscribe(
      (resp) => {
        console.log(resp);
        this.coaches = resp;
        this.dataSource = new MatTableDataSource(this.coaches);
      },
      (err) => {
        console.log(err.error);
      });
  }

  getAllTeams() {
    return this.service.findAllTeam().subscribe(
      (resp) => {
        this.teams = resp;
        this.error = undefined;
      },
      (err) => {
        console.log(err.error);
        this.error = err.error;
      });
  }

  /* Passo due id.
  - element.id  = idCoach =====>   uno preso dall'iterazione della lista coach .
  - (data.id) =  idTeam =====>      L'altro id passato all'apertura del modal  */
  addCoachTeam(idTeam: number, idCoach: number) {
  /* metodo uguale a addAthlete ma con logica differente */
  this.service.patchListCoaches(idTeam,idCoach).subscribe(
    (resp) => {
        console.log(resp);
        this.error = undefined;
    },
    (err) => {
        console.log(err.error);
        this.error = err.error;
    }
  )
    //ricarico la rotta
    this.service2.reloadRoute();
    //chiudo il modal
    this.closeDialog();
    }
}
