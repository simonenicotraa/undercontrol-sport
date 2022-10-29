import { Component,Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { ModalAddPaymentComponent } from '../../athletes-children/modal-add-payment/modal-add-payment.component';
import { RegisterAthletesComponent } from '../../athletes-children/register-athletes/register-athletes.component';
import { Ipayment } from '../../interfaces/ipayment';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {
  displayedColumns: string[] = ['season', 'amount', 'paymentStatus', 'options'];
  dataSource = this.data.listPayments;
  constructor(
              public dialog: MatDialog,
              private abstractService: AbstractServiceService,
              private authService: AuthService,
              public dialogRef: MatDialogRef<ViewDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                                                      id:number,
                                                      name: string,
                                                      surname:string,
                                                      dateOfBirth:string,
                                                      email: string,
                                                      ntel:string,
                                                      fiscalCode: string,
                                                      address: string,
                                                      cap: string,
                                                      listPayments:Ipayment[]}
    ) { }

  ngOnInit(): void {

  }

    /* apertura modal per modificare e aggiornare pagamento */
    openDialogPaymentUpdate(id: number) {
      let obj = this.data.listPayments.filter((x) => x.id === id);
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
      });
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

     /* Apertura modal modifica dati atleta */
  openDialog(id: number) {
    //passo i dati al register.user.component.ts
    let dialogRef = this.dialog.open(RegisterAthletesComponent, {
      data: {
        id: this.data.id,
        name: this.data.name,
        surname: this.data.surname,
        dateOfBirth:this.data.dateOfBirth,
        email:this.data.email,
        ntel: this.data.ntel,
        fiscalCode: this.data.fiscalCode,
        address: this.data.address,
        cap: this.data.cap,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.authService.reloadRoute()
    });
  }
}
