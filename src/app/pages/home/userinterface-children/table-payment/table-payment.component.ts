import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { ModalAddPaymentComponent } from '../../athletes-children/modal-add-payment/modal-add-payment.component';
import { Iatletes } from '../../interfaces/iatletes';
import { Ipayment } from '../../interfaces/ipayment';

@Component({
  selector: 'app-table-payment',
  templateUrl: './table-payment.component.html',
  styleUrls: ['./table-payment.component.scss'],
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
export class TablePaymentComponent implements OnInit {
  athletesPayments:Iatletes[]=[]
  error=undefined
  payments: Ipayment[] = [];
   /* per costruzione della tabella. Settaggio dell'header della tab */
   columnsToDisplay: string[] = ['name', 'statusPayement', 'fiscalCode'];
   /* settaggio per espansione riga Angular material */
   columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
   expandedElement: any | null;

  constructor( private abstractService: AbstractServiceService,
                public dialog: MatDialog,
                private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllAthletes()
    this.getAllPayments();
  }
  getAllAthletes() {
    this.abstractService.findAllAthletes().subscribe(
      (resp)=>{
        console.log(resp)
        this.athletesPayments = resp.filter( /* athlete=>athlete.listPayments!.length !=0 && athlete.listPayments![athlete.listPayments!.length-1].paymentStatus== false) */
           athlete =>{
            if(athlete.listPayments!.length ==0){
            return false
          }else{
            return athlete.listPayments![athlete.listPayments!.length-1].paymentStatus===false
          }

          }
        )
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
}
