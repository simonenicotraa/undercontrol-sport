import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { Ipayment } from '../../interfaces/ipayment';

@Component({
  selector: 'app-modal-add-payment',
  templateUrl: './modal-add-payment.component.html',
  styleUrls: ['./modal-add-payment.component.scss']
})
export class ModalAddPaymentComponent implements OnInit {
  bool :boolean = false;
  @ViewChild('f') form!: NgForm;
  error=undefined


  constructor(
              private abstractService: AbstractServiceService,
              private authService: AuthService,
              public dialogRef: MatDialogRef<ModalAddPaymentComponent>,
              /* prendo i dati passati  per riportarli nell'input scrivo [(ngModel)]="data.name" VEDI HTML*/
              @Inject(MAT_DIALOG_DATA) public data: {
                                                      id:number,
                                                      idPayement:number,
                                                      season: string
                                                      amount: number
                                                      payed:number

                                                    },
            ) { }

  ngOnInit(): void {

  this.verificaDati()
  }
  verificaDati(){
    /* controllo se this.data è nullo && con hasOwnproperty controllo se data.id esiste */
        if (this.data && this.data.hasOwnProperty("amount") ){    /* ("id" in this.data) */
            this.bool = true;
        }else {
          this.bool = false;
        }
      }
  closeDialog() {
    this.dialogRef.close();
  }


  insertPayment(id:number){
  this.abstractService.insertPayment(this.form.value, id).subscribe(
  (resp) => {
    console.log(resp);
    this.error = undefined;
    this.closeDialog();
    this.authService.reloadRoute()
    },
    (err) => {
      console.log(err.error);
      this.error = err.error;
    }
  );
  }
  updatePayment(id:number){
this.abstractService.updatePayment(id,this.form.value).subscribe(
  (resp) => {
    console.log(resp);
    this.error = undefined;
    this.closeDialog();
    this.authService.reloadRoute()
    },
    (err) => {
      console.log(err.error);
      this.error = err.error;
    }
  );
  }
}
