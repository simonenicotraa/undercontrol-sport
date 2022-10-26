import { Component,Inject, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { IAuthData } from 'src/app/pages/auth/interfaces/iauth-data';
import { AbstractServiceService } from '../../abstract-service.service';

@Component({
  selector: 'app-modal-update-credential',
  templateUrl: './modal-update-credential.component.html',
  styleUrls: ['./modal-update-credential.component.scss']
})
export class ModalUpdateCredentialComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error=undefined
  isDisabled = true

  constructor(private abstractService: AbstractServiceService,
              private authService: AuthService,
              public dialogRef: MatDialogRef<ModalUpdateCredentialComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                                                      id: number,
                                                      password: string,
                                                      username: string
                                                     }
  )
  { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }
  updateCredential(id:number){
    this.abstractService.updateUserCredential(id, this.form.value).subscribe(
      (resp) => {
      console.log(resp)
      this.closeDialog();
      this.authService.reloadRoute()
      this.authService.logout();

      },
      (err)=>{
        this.error=err.error.message
        console.log(this.error)

      }
    )
  }
}
