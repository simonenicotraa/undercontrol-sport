
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';

@Component({
  selector: 'app-modal-add-certificate',
  templateUrl: './modal-add-certificate.component.html',
  styleUrls: ['./modal-add-certificate.component.scss']
})
export class ModalAddCertificateComponent implements OnInit {
  bool :boolean = false;
  @ViewChild('f') form!: NgForm;
  error=undefined
  constructor(
              private abstractService: AbstractServiceService,
              private authService: AuthService,
              public dialogRef: MatDialogRef<ModalAddCertificateComponent>,
              /* prendo i dati passati  per riportarli nell'input scrivo [(ngModel)]="data.name" VEDI HTML*/
              @Inject(MAT_DIALOG_DATA) public data: {
                                                      id:number,
                                                      productionData:Date
                                                    }
  ) { }

  ngOnInit(): void {
    this.verificaDati()
  }

  verificaDati(){
    /* controllo se this.data è nullo && con hasOwnproperty controllo se data.id esiste */
        if (this.data && this.data.hasOwnProperty("productionData") ){    /* ("id" in this.data) */
            this.bool = true;
        }else {
          this.bool = false;
        }
      }

closeDialog() {
  this.dialogRef.close();
}
insertCertificate(id:number){
this.abstractService.insertMedicalCertificates(this.form.value,id).subscribe(
  (resp) => {
    console.log(resp);
    this.error = undefined;
    this.authService.reloadRoute();
    this.closeDialog();

  },
  (err) => {
    console.log(err.error);
    this.error = err.error;
  }
);
}

updateCertificate(id:number){
return this.abstractService.updateMedicalCertificate(id,this.form.value).subscribe(
  (resp) => {
    console.log(resp);
    this.error = undefined;
    this.authService.reloadRoute();
    this.closeDialog();

  },
  (err) => {
    console.log(err.error);
    this.error = err.error;
  }
);
}


}
