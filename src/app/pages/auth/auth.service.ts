import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IAuthData } from './interfaces/iauth-data';
import { ISignupData } from './interfaces/isignup-data';
import { environment } from 'src/environments/environment.prod';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  authSubject = new BehaviorSubject<IAuthData | null>(null);
  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
     this.restoreUserLogin();
  }

   isAuthenticated(): boolean {
    return this.loggedIn;
  }

  restoreUserLogin() {
    const json = localStorage.getItem('isAuthenticated');
    if(json) {
      const user = JSON.parse(json);
      if(this.helper.isTokenExpired(user.token)) {
        localStorage.removeItem('isAuthenticated');
        return
      } else {
        this.authSubject.next(user);
      }
    }
  }

  login(obj: ISignupData) {
    this.loggedIn = true;
    return this.http.post<IAuthData>(environment.APIEndpoint+'/auth/login', obj).pipe(
      tap(data => {
        this.authSubject.next(data);
        localStorage.setItem('isAuthenticated', JSON.stringify(data));
      })
    )
  }

  signupAdmin(obj: ISignupData) {
    return this.http.post(environment.APIEndpoint+'/users/insertAdmin', obj);
  }
  signupUser(obj: ISignupData) {
    return this.http.post(environment.APIEndpoint+'/users/insertUser', obj);
  }
  logout() {
    this.loggedIn = false;
    console.log('Logout')
    this.authSubject.next(null);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  reloadRoute() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
}
