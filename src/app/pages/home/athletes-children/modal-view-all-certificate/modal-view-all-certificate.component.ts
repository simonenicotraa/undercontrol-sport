import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { Imedicalcertificates } from '../../interfaces/imedicalcertificates';
import { ModalAddCertificateComponent } from '../modal-add-certificate/modal-add-certificate.component';

@Component({
  selector: 'app-modal-view-all-certificate',
  templateUrl: './modal-view-all-certificate.component.html',
  styleUrls: ['./modal-view-all-certificate.component.scss']
})
export class ModalViewAllCertificateComponent implements OnInit {
error=undefined
durationInSeconds=4
certificates:Imedicalcertificates[]= []
  constructor(  private _snackBar: MatSnackBar,
                private abstractService: AbstractServiceService,
                private authService: AuthService,
                public dialog: MatDialog,
                public dialogRef: MatDialogRef<ModalViewAllCertificateComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {
                                                        id:number   /* id utente */
                                                        list: Imedicalcertificates[]

    },
    ) { }

  ngOnInit(): void {
    this.getAllMedicalCertificates()
  }
  closeDialog() {
    this.dialogRef.close();
  }
  deleteCertificate(id:number|undefined){
    this.deleteCertifica(id);
    this.closeDialog()
    this.authService.reloadRoute()
  }

deleteCertifica(id:number|undefined){
 this.abstractService.deleteMedicalCertificates(id,this.data.id).subscribe(
  (resp) => {
        console.log(resp);
        this.closeDialog()
        this.openSnackBar("Medical Certificate deleted")
        this.authService.reloadRoute()
      },
      (err) => {
        console.log(err);
      }
    );
}
openSnackBar(stringa:string) {
  this._snackBar.open(stringa, 'Close',{
    horizontalPosition: 'center',
    verticalPosition:'top',
    duration: this.durationInSeconds*1000
  }
  )
}
  /* apertura modal per modificare e aggiornare Certificato */
  openDialogCertificateUpdate(id: number|undefined) {
    console.log(id);
    let obj = this.certificates.filter((x) => x.id === id);
    let m = obj[0];
    console.log(m);
    console.log(m.productionDate);
    let dialogRef = this.dialog.open(ModalAddCertificateComponent, {
      data: {
        id: m.id,
        productionData: m.productionDate,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {

    });
  }
  getAllMedicalCertificates() {
    return this.abstractService.getAllMedicalCertificates().subscribe(
      (resp) => {
        this.error = undefined;
        this.certificates = resp;
        console.log(this.certificates);
      },
      (err) => {
        console.log(err.error);
        this.error = err.error;
      }
    );
  }
}
