import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  constructor(private authService: AuthService, private router: Router) { }
  error = undefined;
  ngOnInit(): void {
  }
  save() {
    console.log(this.form.value)
        this.authService.signupUser(this.form.value).subscribe(
      (resp) => {
        console.log(resp);
        this.error = undefined;
    /*     this.router.navigate(['/register']); */
      },
      (err) => {
        console.log(err.error);
        this.error = err.error;
      }
    );
  }

}
