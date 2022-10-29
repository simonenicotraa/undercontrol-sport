import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
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
export class TableFinanceComponent implements OnInit {
 /*  payments: Ipayment[] = []; */
 payments: any[] = [];
  athletes: Iatletes[] = [];
  error = undefined;

  displayedColumns: string[] = ['id', 'progress', 'status','option'];
  dataSource= new MatTableDataSource(this.payments);

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;



  constructor(private abstractService: AbstractServiceService,
              private authService: AuthService,
              public dialog: MatDialog,

              ) {

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
        this.error = undefined;
        this.payments=resp

        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;

        /* vedi */
        this.dataSource.sortingDataAccessor = (ele, prop) =>{
         console.log(ele,prop)
         if(prop=='progress'){
          return (ele.payed*100/ele.amount).toFixed()
         }
         if(prop=='status'){
          return ele.paymentStatus
         }
          return ele
        }
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
        listPayments: u.listPayments,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllAthletes();
    });
  }



}
