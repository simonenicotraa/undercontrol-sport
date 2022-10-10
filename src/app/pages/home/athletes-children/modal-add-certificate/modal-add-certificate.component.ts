import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';

@Component({
  selector: 'app-modal-add-certificate',
  templateUrl: './modal-add-certificate.component.html',
  styleUrls: ['./modal-add-certificate.component.scss']
})
export class ModalAddCertificateComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error=undefined
  constructor(
              private abstractService: AbstractServiceService,
              private authService: AuthService,
              public dialogRef: MatDialogRef<ModalAddCertificateComponent>,
              /* prendo i dati passati  per riportarli nell'input scrivo [(ngModel)]="data.name" VEDI HTML*/
              @Inject(MAT_DIALOG_DATA) public data: {
                                                      id:number,
                                                    }
  ) { }

  ngOnInit(): void {
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




}
