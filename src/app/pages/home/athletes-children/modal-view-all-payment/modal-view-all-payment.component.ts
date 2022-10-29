import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { Iatletes } from '../../interfaces/iatletes';
import { Ipayment } from '../../interfaces/ipayment';
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
              private abstractService: AbstractServiceService,
              private authService: AuthService,
              public dialogRef: MatDialogRef<ModalViewAllCertificateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                                                       id:number,
                                                      list:Ipayment[]

              },
              ) { }


  ngOnInit(): void {

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

}
