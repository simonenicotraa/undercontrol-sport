import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';

@Component({
  selector: 'app-modal-new-team',
  templateUrl: './modal-new-team.component.html',
  styleUrls: ['./modal-new-team.component.scss']
})
export class ModalNewTeamComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  society:String | null =this.authService.getSociety()
  bool :boolean = false;
  /* variabile per la snackbar */
  durationInSeconds=4
  /* variabili per settaggio campo input options */
  selected = 'option1';
  selected2 = '';
  error= undefined;
  constructor(
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ModalNewTeamComponent>,
              private authService: AuthService,
              private abstractService:AbstractServiceService,
              /* prendo i dati passati  per riportarli nell'input scrivo [(ngModel)]="data.name" VEDI HTML*/
              @Inject(MAT_DIALOG_DATA) public data: {
                id:number,
                name: string,
                season:string,
                gender:string,
                }
            ) { }

  ngOnInit(): void {
    this.verificaDati();
  }
  openSnackBar(stringa:string) {
    this._snackBar.open(stringa, 'Close',{
      horizontalPosition: 'center',
      verticalPosition:'top',
      duration: this.durationInSeconds * 1000
    }
    )
  }
  verificaDati(){
    /* controllo se this.data è nullo && con hasOwnproperty controllo se data.id esiste */
        if (this.data && this.data.hasOwnProperty("id") ){    /* ("id" in this.data) */
            this.bool = true;
        }else {
          this.bool = false;
        }
      }
  closedialog(){
    this.dialogRef.close();
  }

  save() {
    console.log(this.form.value);
    return this.abstractService.insertTeam(this.form.value).subscribe(
      (resp)=>{
        this.error= undefined;
        this.openSnackBar("Team saved")
        this.authService.reloadRoute();
        this.closedialog()
      }, (err)=>{
        console.log(err.error);
        this.error = err.error;
      })
    }
    updateTeam(id:number){
      this.abstractService.updateTeam(this.form.value, id).subscribe(
        (resp)=>{
          this.error=undefined;
          this.openSnackBar("Team Updated")
          this.closedialog();
          this.authService.reloadRoute()
        }, (err)=> {

          this.error = err.error;
        }
      )
    }
}
