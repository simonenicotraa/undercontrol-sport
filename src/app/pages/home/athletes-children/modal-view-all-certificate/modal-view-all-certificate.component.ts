import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { Imedicalcertificates } from '../../interfaces/imedicalcertificates';

@Component({
  selector: 'app-modal-view-all-certificate',
  templateUrl: './modal-view-all-certificate.component.html',
  styleUrls: ['./modal-view-all-certificate.component.scss']
})
export class ModalViewAllCertificateComponent implements OnInit {
error=undefined
durationInSeconds=4
  constructor(  private _snackBar: MatSnackBar,
                private abstractService: AbstractServiceService,
                private authService: AuthService,
                public dialogRef: MatDialogRef<ModalViewAllCertificateComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {
                                                        id:number   /* id utente */
                                                        list: Imedicalcertificates[]

    },
    ) { }

  ngOnInit(): void {
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
}
