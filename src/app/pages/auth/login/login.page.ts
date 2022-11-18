import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  hide = true;
  @ViewChild('f') form!: NgForm;
  error = undefined;

  showSpinner=false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
   }

  onSubmit() {
 //   console.log(this.form.value);
 this.showSpinner=true
 /* con this.form.value prendo i valori dei form e li passo al backend */
    this.authService.login(this.form.value).subscribe(
      resp => {
        this.error = undefined;
        this.showSpinner=false
        //dopo il login passo alla pagina protetta dal guard HOME
        this.router.navigate(['home'])

      },
      err  => {
        this.showSpinner=false
        console.log(err.error);
        this.error = err.error;
      }
    )
  }
back(){
  this.router.navigate(['start'])
}
}
