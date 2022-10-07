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
import { RegisterCoachesComponent } from '../register-coaches/register-coaches.component';

@Component({
  selector: 'app-table-coaches',
  templateUrl: './table-coaches.component.html',
  styleUrls: ['./table-coaches.component.scss'],
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
export class TableCoachesComponent implements OnInit {

  coaches: IAthlCoach[] = [];
  dataSource = new MatTableDataSource(this.coaches);

  constructor(
    private service: AbstractServiceService,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }
  columnsToDisplay: string[] = ['name', 'surname', 'fiscalCode'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;

  ngOnInit(): void {
    this.getAllCoaches()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllCoaches() {
    this.service.findAllCoaches().subscribe(
      (resp) => {
        console.log(resp);
        this.coaches = resp;
    //    this.utenti = resp;
        console.log(this.coaches);
        this.dataSource = new MatTableDataSource(this.coaches);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  deleteCoach(id: number) {
    this.service.deleteCoach(id).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
    this.authService.reloadRoute()
  }

  openDialog(id: number) {
    let obj = this.coaches.filter((user) => user.id === id);
    JSON.stringify(obj).toString;
    //mi restituisce un array di un solo oggetto
    console.log(obj[0]);
    //seleziono oggetto dentro array
    let u =obj[0];
    //passo i dati al register.user.component.ts
    let dialogRef = this.dialog.open(RegisterCoachesComponent, {
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
}
