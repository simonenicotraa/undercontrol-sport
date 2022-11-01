import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { Iatletes } from '../../interfaces/iatletes';
import { Ipayment } from '../../interfaces/ipayment';
import { ModalAddPaymentComponent } from '../modal-add-payment/modal-add-payment.component';
import { ModalViewAllCertificateComponent } from '../modal-view-all-certificate/modal-view-all-certificate.component';

@Component({
  selector: 'app-modal-view-all-payment',
  templateUrl: './modal-view-all-payment.component.html',
  styleUrls: ['./modal-view-all-payment.component.scss']
})
export class ModalViewAllPaymentComponent implements OnInit {
  error = undefined;
payments:Ipayment[]=[]
  constructor(
              public dialog: MatDialog,
              private abstractService: AbstractServiceService,
              private authService: AuthService,
              public dialogRef: MatDialogRef<ModalViewAllCertificateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                                                       id:number,
                                                      list:Ipayment[]

              },
              ) { }


  ngOnInit(): void {
this.getAllPayments()
  }
  closeDialog() {
    this.dialogRef.close();
  }
  deletePayement(id : number|undefined) {
    console.log(id)
    return this.abstractService.deletePayment(id,this.data.id).subscribe(
      (resp) => {
        console.log(resp);
        this.closeDialog()
        this.authService.reloadRoute()
      },
      (err) => {
        console.log(err);

      }
    );
  }
    /* apertura modal per modificare e aggiornare pagamento */
    openDialogPaymentUpdate(id: number|undefined) {
      console.log(id)
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
        /* this.authService.reloadRoute() */
      });
    }
    getAllPayments() {
      return this.abstractService.getAllPayment().subscribe(
        (resp) => {
          this.error = undefined;
          this.payments=resp
        },
        (err) => {
          console.log(err.error);
          this.error = err.error;
        }
      );
    }
}
