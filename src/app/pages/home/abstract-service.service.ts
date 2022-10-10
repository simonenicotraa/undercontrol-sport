import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IAuthData } from '../auth/interfaces/iauth-data';
import { ISignupData } from '../auth/interfaces/isignup-data';
import { IAthlCoach } from './interfaces/iathl-coach';
import { Imedicalcertificates } from './interfaces/imedicalcertificates';
import { Iteams } from './interfaces/iteams';

@Injectable({
  providedIn: 'root',
})
export class AbstractServiceService {

/* per mandare headers al back-end e poter far funzionare i preauthorize */
  headers: { Authorization?: string;
              "Content-Type":string } = { "Content-Type":"application/json" };



  options= {headers:this.headers}

  /* prova
    headers2: { Authorization?: string;
                "Content-Type":any } = { "Content-Type": "multipart/form-data" }; */
 /*  options2= {headers:this.headers2} */

 constructor(private http: HttpClient) {
    let tokenJson= localStorage.getItem('isAuthenticated');
    if(tokenJson){
    let token = JSON.parse(tokenJson);
/*token.token = let token inizializzato .token si riferisce alla proprietà specificata nell'interfaccia IAuthData   */
      this.headers.Authorization= `Bearer ${token.token}`
      this.options= {headers:this.headers }

      /* prova */
     /*  this.options2= {headers:this.headers2 } */
    }
  }


  /* ==================================== USER ==================================== */
  /* GET -- ottenere tutti gli user */
  findAllUsers() {
    return this.http.get<[]>(environment.APIEndpoint + '/users/findAll', this.options);
  }
  /* GET -- ottenere user per id */
   findUserById(id: number) {
    return this.http.get<ISignupData | IAuthData>(environment.APIEndpoint + '/users/' + id,this.options);
  }
  /*DELETE -- cancellare atleti nel db */
  deleteUser(id: number) {
    return this.http.delete(environment.APIEndpoint + '/users/' + id,this.options);
  }
  /*UPDATE -- modificare atleti nel db */
  updateUser(id: number, obj: ISignupData) {
    return this.http.put(environment.APIEndpoint + '/users/' + id, obj,this.options);
  }

  signupAdmin(obj: ISignupData) {
    return this.http.post(environment.APIEndpoint+'/users/insertAdmin', obj,this.options);
  }
  signupUser(obj: ISignupData) {
    return this.http.post(environment.APIEndpoint+'/users/insertUser', obj,this.options);
  }


  /* ==================================== ATLETI ==================================== */
  /* GET -- ottenere tutti gli atleti */
  findAllAthletes() {
    return this.http.get<[]>(environment.APIEndpoint + '/athlete/findAllAthletes',this.options);
  }

  /* GET -- ottenere atleta per id */
  findAthleteById(id: number) {
    return this.http.get(environment.APIEndpoint + '/athlete/' + id,this.options);
  }
  /*DELETE -- cancellare atleti nel db */
  deleteAthletes(id: number) {
    return this.http.delete(environment.APIEndpoint + '/athlete/' + id, this.options);
  }
  /*POST -- inserire atleti nel db */
  insertAthlete(obj: IAthlCoach) {
    return this.http.post(environment.APIEndpoint + '/athlete/insertAthletes',
      obj,this.options
    );
  }
  /* UPDATE --  modificare dati atleta */
  updateAthlete(obj: IAthlCoach, id: number) {
    return this.http.put(environment.APIEndpoint + '/athlete/' + id, obj,this.options);
  }

    /* ==================================== COACH ==================================== */
  /* GET -- ottenere tutti gli coaches */
  findAllCoaches() {
    return this.http.get<[]>(environment.APIEndpoint + '/coaches/findAllCoaches',this.options);
  }

  /* GET -- ottenere coach per id */
  findCoachById(id: number) {
    return this.http.get(environment.APIEndpoint + '/coaches/' + id,this.options);
  }
  /*DELETE -- cancellare coach nel db */
  deleteCoach(id: number) {
    return this.http.delete(environment.APIEndpoint + '/coaches/' + id,this.options);
  }
  /*POST -- inserire coach nel db */
  insertCoach(obj: IAthlCoach) {
    return this.http.post(environment.APIEndpoint + '/coaches/insertCoach',
      obj,this.options
    );
  }
  /* UPDATE --  modificare dati coach */
  updateCoach(obj: IAthlCoach, id: number) {
    return this.http.put(environment.APIEndpoint + '/coaches/' + id, obj,this.options);
  }

/* ==================================== TEAM ==================================== */
insertTeam(obj:any){
  return this.http.post(environment.APIEndpoint + '/team/insertTeam',obj,this.options)
}
findAllTeam(){
  return this.http.get<[]>(environment.APIEndpoint + '/team/findAllTeams',this.options);
}
findTeamById(id:number){
  return this.http.get<Iteams>(environment.APIEndpoint + '/team/'+id,this.options)
}
updateTeam(obj: Iteams, id: number){
return this.http.put(environment.APIEndpoint+'/team/'+id,obj,this.options);
}
patchListAthletes(id: number, obj:Iteams){
  return this.http.patch(environment.APIEndpoint+'/team/updateListAtl/'+id,obj,this.options)
}
patchListCoaches(idTeam: number, idCoach:number){
  return this.http.patch(environment.APIEndpoint+'/team/updateListCoach/'+idTeam+'/'+idCoach, this.options)
}
/* ==================================== MEDICAL CERTIFICATES ==================================== */
insertMedicalCertificates(obj: Imedicalcertificates,id:number){
  return this.http.post(environment.APIEndpoint + '/certificates/insertMedicalCertificate'+id,obj,this.options)
}

  /* ==================================== IMMAGINI ==================================== */
/* insertImageDb(obj:string){
  return this.http.post(environment.APIEndpoint + '/image',obj , this.options2);
}
getImageDb(name:string){
  return this.http.get(environment.APIEndpoint + '/image/'+name , this.options2);
} */
}
