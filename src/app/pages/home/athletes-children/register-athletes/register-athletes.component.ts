import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';

@Component({
  selector: 'app-register-athletes',
  templateUrl: './register-athletes.component.html',
  styleUrls: ['./register-athletes.component.scss']
})
export class RegisterAthletesComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  error=undefined
  bool :boolean = false;

  society:String | null =this.authService.getSociety()
  /* variabile durata snackBar */
  durationInSeconds = 4;

  constructor(
              private abstractService: AbstractServiceService,
              private authService: AuthService,
              public dialogRef: MatDialogRef<RegisterAthletesComponent>,
              private _snackBar: MatSnackBar,
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
  openSnackBar(stringa:string) {
    this._snackBar.open(stringa, 'Close',{
      horizontalPosition: 'center',
      verticalPosition:'top',
      duration: this.durationInSeconds * 1000
    }
    )
  }
  save() {
    console.log(this.form.value)
        this.abstractService.insertAthlete(this.form.value).subscribe(
      (resp) => {
        console.log(resp);
        this.error = undefined;
        this.closeDialog()
        this.openSnackBar('Athlete Saved');
       this.authService.reloadRoute()
      },
      (err) => {
        console.log(err.error);
        this.error = err.error;
      }
    );
  }
  update(id: number){
    this.abstractService.updateAthlete(this.form.value, id).subscribe(
      (resp) => {
        console.log(resp);
        this.error = undefined;
        this.closeDialog();
        this.openSnackBar('Athlete Updated');
        this.authService.reloadRoute()
      }, (err)=> {
        console.log(err.error);
        this.error = err.error;
      }
    )
  }

}
