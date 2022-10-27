import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { Iatletes } from '../../interfaces/iatletes';
import { ViewDetailComponent } from '../view-detail/view-detail.component';

@Component({
  selector: 'app-table-finance',
  templateUrl: './table-finance.component.html',
  styleUrls: ['./table-finance.component.scss'],
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
export class TableFinanceComponent implements OnInit,AfterViewInit {
 /*  payments: Ipayment[] = []; */
 payments: any[] = [];
  athletes: Iatletes[] = [];
  error = undefined;

  displayedColumns: string[] = ['id', 'progress', 'status','option'];
  dataSource= new MatTableDataSource(this.payments);

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private abstractService: AbstractServiceService,
              private authService: AuthService,
              public dialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer
              ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.payments);
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAllAthletes();
    this.getAllPayments();

  }
  getAllAthletes() {
    this.abstractService.findAllAthletes().subscribe(
      (resp) => {
        this.athletes = resp;


      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  getAllPayments() {
    return this.abstractService.getAllPayment().subscribe(
      (resp) => {
        console.log(this.payments)
        this.error = undefined;
        this.payments=resp
        this.dataSource = new MatTableDataSource(this.payments);
        console.log(this.payments)
      },
      (err) => {
        console.log(err.error);
        this.error = err.error;
      }
    );
  }
  openDialog(id: number) {
    let obj = this.athletes.filter((user) => user.id === id);
    //mi restituisce un array di un solo oggetto
    // console.log(obj[0]);
    //seleziono oggetto filtrato che sarà l'unico dentro array
    let u = obj[0];
    //passo i dati al register.user.component.ts
    let dialogRef = this.dialog.open(ViewDetailComponent, {
      data: {
        id: u.id,
        name: u.name,
        surname: u.surname,
        dateOfBirth: u.dateOfBirth,
        email: u.email,
        ntel: u.ntel,
        fiscalCode: u.fiscalCode,
        address: u.address,
        cap: u.cap,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllAthletes();
    });
  }


  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
