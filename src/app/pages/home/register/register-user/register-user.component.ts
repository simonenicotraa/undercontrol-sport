import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { IUsers } from '../../interfaces/iusers';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  bool :boolean = false;
  society:String | null =this.authService.getSociety()


  constructor(
              private authService: AuthService,
              private abstractService: AbstractServiceService,
              private router: Router,
              public dialogRef: MatDialogRef<RegisterUserComponent>,
              /* prendo i dati passati  per riportarli nell'input scrivo [(ngModel)]="data.name" VEDI HTML*/
              @Inject(MAT_DIALOG_DATA) public data: {
                                                        id:number,
                                                        name: string,
                                                        surname:string,
                                                        email: string,
                                                        password: string,
                                                        username: string,
              }
    ) { }


  error = undefined;
  ngOnInit(): void {
    this.verificaDati()

  }
/*   verificaDati(){
    if (this.data.id){
        this.bool = true;
    }else {
      this.bool = false;
    }
  } */
  verificaDati(){
/* controllo se this.data è nullo && con hasOwnproperty controllo se data.id esiste */
    if (this.data && this.data.hasOwnProperty("id") ){    /* ("id" in this.data) */
        this.bool = true;
    }else {
      this.bool = false;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
  save() {
    console.log(this.form.value)
        this.abstractService.signupUser(this.form.value).subscribe(
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

  update(id: number){
    this.abstractService.updateUser(id, this.form.value).subscribe(
      (resp) => {
        console.log(resp);
        this.error = undefined;
        this.closeDialog();
        this.authService.reloadRoute()
      }, (err)=> {
        console.log(err.error);
        this.error = err.error;
      }
    )
  }
}
