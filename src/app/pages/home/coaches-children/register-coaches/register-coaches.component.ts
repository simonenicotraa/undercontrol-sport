import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';

@Component({
  selector: 'app-register-coaches',
  templateUrl: './register-coaches.component.html',
  styleUrls: ['./register-coaches.component.scss']
})
export class RegisterCoachesComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error=undefined
  bool :boolean = false;
  constructor(
    private abstractService: AbstractServiceService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterCoachesComponent>,
    /* prendo i dati passati  per riportarli nell'input scrivo [(ngModel)]="data.name" VEDI HTML*/
    @Inject(MAT_DIALOG_DATA) public data: {
                                          id:number,
                                          name: string,
                                          surname:string,
                                          dateOfBirth:string,
                                          email: string,
                                          ntel:string,
                                          fiscalCode: string,
                                          address: string,
                                          cap: string,}
  ) { }

  ngOnInit(): void {
    this.verificaDati()
  }
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
        this.abstractService.insertCoach(this.form.value).subscribe(
      (resp) => {
        console.log(resp);
        this.error = undefined;
        this.closeDialog()
       this.authService.reloadRoute()
      },
      (err) => {
        console.log(err.error);
        this.error = err.error;
      }
    );
  }
  update(id: number){
    this.abstractService.updateCoach(this.form.value, id).subscribe(
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
