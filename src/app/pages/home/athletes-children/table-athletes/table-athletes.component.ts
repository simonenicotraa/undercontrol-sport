import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { IAthlCoach } from '../../interfaces/iathl-coach';
import { Iatletes } from '../../interfaces/iatletes';
import { ModalAddCertificateComponent } from '../modal-add-certificate/modal-add-certificate.component';
import { RegisterAthletesComponent } from '../register-athletes/register-athletes.component';

@Component({
  selector: 'app-table-athletes',
  templateUrl: './table-athletes.component.html',
  styleUrls: ['./table-athletes.component.scss'],
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
export class TableAthletesComponent implements OnInit {

  athletes: Iatletes[] = [];
  dataSource = new MatTableDataSource(this.athletes);

  constructor(
    private service: AbstractServiceService,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  columnsToDisplay: string[] = ['name', 'surname', 'fiscalCode'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;

  ngOnInit(): void {
    this.getAllAthletes()
  }
applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllAthletes() {
    this.service.findAllAthletes().subscribe(
      (resp) => {
        console.log(resp);
        this.athletes = resp;
    //    this.utenti = resp;
        console.log(this.athletes);
        this.dataSource = new MatTableDataSource(this.athletes);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  deleteAthlete(id: number) {
    this.service.deleteAthletes(id).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
    this.getAllAthletes();
    this.authService.reloadRoute()
  }

  openDialog(id: number) {
    let obj = this.athletes.filter((user) => user.id === id);
    JSON.stringify(obj).toString;
    //mi restituisce un array di un solo oggetto
    console.log(obj[0]);
    //seleziono oggetto dentro array
    let u =obj[0];
    //passo i dati al register.user.component.ts
    let dialogRef = this.dialog.open(RegisterAthletesComponent, {
      data: {
        id: u.id,
        name: u.name,
        surname: u.surname,
        dateOfBirth: u.dateOfBirth,
        email: u.email,
        ntel: u.ntel,
        fiscalCode: u.fiscalCode,
        address: u.address,
        cap: u.cap
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /* apertura modal per aggiungere certificati */
  openDialogCertificate(id:number){
    let obj = this.athletes.filter((user) => user.id === id);
    let u =obj[0];
    let dialogRef = this.dialog.open(ModalAddCertificateComponent, {
      data: {
        id: u.id
            },
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
  }
}
