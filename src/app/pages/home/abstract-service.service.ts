import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IAuthData } from '../auth/interfaces/iauth-data';
import { ISignupData } from '../auth/interfaces/isignup-data';
import { Iatletes } from './interfaces/iatletes';

@Injectable({
  providedIn: 'root',
})
export class AbstractServiceService {
  constructor(private http: HttpClient) {}

  /* ==================================== USER ==================================== */
  /* GET -- ottenere tutti gli user */
  findAllUsers() {
    return this.http.get<[]>(environment.APIEndpoint + '/users/findAll');
  }
  /* GET -- ottenere user per id */
  findUserById(id: number) {
    return this.http.get<ISignupData | IAuthData>(environment.APIEndpoint + '/users/' + id);
  }
  /*DELETE -- cancellare atleti nel db */
  deleteUser(id: number) {
    return this.http.delete(environment.APIEndpoint + '/users/' + id);
  }
  /*UPDATE -- modificare atleti nel db */
  updateUser(id: number, obj: ISignupData) {
    return this.http.put(environment.APIEndpoint + '/users/' + id, obj);
  }


  /* ==================================== ATLETI ==================================== */
  /* GET -- ottenere tutti gli atleti */
  findAllAthletes() {
    return this.http.get<[]>(environment.APIEndpoint + '/athlete/findAllAthletes');
  }

  /* GET -- ottenere atleta per id */
  findAthleteById(id: number) {
    return this.http.get(environment.APIEndpoint + '/athlete/' + id);
  }
  /*DELETE -- cancellare atleti nel db */
  deleteAthletes(id: number) {
    return this.http.delete(environment.APIEndpoint + '/athlete/' + id);
  }
  /*POST -- inserire atleti nel db */
  insertAthlete(obj: Iatletes) {
    return this.http.post(
      environment.APIEndpoint + '/athlete/insertAthletes',
      obj
    );
  }

  /* UPDATE --  modificare dati atleta */
  updateAthlete(obj: Iatletes, id: number) {
    return this.http.put(environment.APIEndpoint + '/athlete' + id, obj);
  }
}
