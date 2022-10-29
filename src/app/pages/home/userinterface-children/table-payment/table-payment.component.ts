import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { ModalAddPaymentComponent } from '../../athletes-children/modal-add-payment/modal-add-payment.component';
import { ModalViewAllPaymentComponent } from '../../athletes-children/modal-view-all-payment/modal-view-all-payment.component';
import { Iatletes } from '../../interfaces/iatletes';
import { Ipayment } from '../../interfaces/ipayment';

@Component({
  selector: 'app-table-payment',
  templateUrl: './table-payment.component.html',
  styleUrls: ['./table-payment.component.scss'],
  animations: [
    trigger('detailExpand', [ state('collapsed, void', style({ height: '0px' })),
  state('expanded', style({ height: '*' })),
  transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
 ]),
],

})
export class TablePaymentComponent implements OnInit {
  athletesPayments:Iatletes[]=[]
  error=undefined
  payments: Ipayment[] = [];

   /* per costruzione della tabella. Settaggio dell'header della tab */
   dataSource= new MatTableDataSource(this.athletesPayments);
   columnsToDisplay: string[] = ['name', 'statusPayement', 'fiscalCode'];
   /* settaggio per espansione riga Angular material */
   columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
   expandedElement: any | null;
   /* per sorting */
   @ViewChild(MatSort) matSort!: MatSort;
   /* per paginazione */
   @ViewChild('paginator') paginator!: MatPaginator;

  constructor( private abstractService: AbstractServiceService,
                public dialog: MatDialog,
                private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllAthletes()
    this.getAllPayments();
    this.dataSource = new MatTableDataSource(this.athletesPayments);
    this.dataSource.sort =this.matSort;
  }
  getAllAthletes() {
    this.abstractService.findAllAthletes().subscribe(
      (resp)=>{
        console.log(resp)
        this.athletesPayments = resp.filter( /* athlete=>athlete.listPayments!.length !=0 && athlete.listPayments![athlete.listPayments!.length-1].paymentStatus== false) */
           athlete =>{
          if(athlete.listPayments!.length ==0){
            return athlete.listPayments!.length==0
          }else{
            return athlete.listPayments![athlete.listPayments!.length-1].paymentStatus===false
          }
          }
        )
        /* per settare il sorting */
        this.dataSource = new MatTableDataSource(this.athletesPayments);
        this.dataSource.sort =this.matSort;
        this.dataSource.paginator = this.paginator;

       },
      (err)=>{
        this.error= err.error;
      }
    )
  }
  getAllPayments() {
    return this.abstractService.getAllPayment().subscribe(
      (resp) => {
        this.error = undefined;
        this.payments = resp;
      },
      (err) => {
        console.log(err.error);
        this.error = err.error;
      }
    );
  }

    /* apertura modal per modificare e aggiornare pagamento */
  openDialogPaymentUpdate(id: number) {
    let obj = this.payments.filter((x) => x.id === id);
    let p = obj[0];
    console.log(p);
    let dialogRef = this.dialog.open(ModalAddPaymentComponent, {
      data: {
        idPayement: p.id,
        season: p.season,
        amount: p.amount,
        payed: p.payed,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.authService.reloadRoute()
      console.log(`Dialog result: ${result}`);
    });

  }
   /* apertura modal per aggiungere pagamento */
  openDialogPayment(id: number) {
    let obj = this.athletesPayments.filter((user) => user.id === id);
    let u = obj[0];
    let dialogRef = this.dialog.open(ModalAddPaymentComponent, {
      data: {
        id: u.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllAthletes()
      this.getAllPayments();
    });
  }

   /* apertura modal per vedere tutti i pagamenti di uno user */
   openDialogViewAllPayement(id: number) {
    console.log(id);
    let obj = this.athletesPayments.filter((user) => user.id === id);
    let u = obj[0];
    console.log(u.listPayments);
    let dialogRef = this.dialog.open(ModalViewAllPaymentComponent, {
      data: {
        id: id,
        list: u.listPayments,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllAthletes()
      this.getAllPayments();
    });
  }
}
