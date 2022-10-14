import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  /* variabili per settaggio campo input options */
  selected = 'option1';
  selected2 = '';
  error= undefined;
  constructor(
              public dialogRef: MatDialogRef<ModalNewTeamComponent>,
              private authService: AuthService,
              private abstractService:AbstractServiceService,
              private service2: AuthService,
            ) { }

  ngOnInit(): void {
  }

  closedialog(){
    this.dialogRef.close();
  }
  save() {
    console.log(this.form.value);
    return this.abstractService.insertTeam(this.form.value).subscribe(
      (resp)=>{
        console.log(resp);
        this.error= undefined;
        this.service2.reloadRoute();
        this.closedialog()
      }, (err)=>{
        console.log(err.error);
        this.error = err.error;
      })

    }

}
