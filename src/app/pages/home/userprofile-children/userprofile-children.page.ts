import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractServiceService } from '../abstract-service.service';
import { IUsers } from '../interfaces/iusers';
import { RegisterAdminComponent } from '../register/register-admin/register-admin.component';
import { RegisterUserComponent } from '../register/register-user/register-user.component';
import { ModalUpdateCredentialComponent } from './modal-update-credential/modal-update-credential.component';

@Component({
  templateUrl: './userprofile-children.page.html',
  styleUrls: ['./userprofile-children.page.scss']
})
export class UserprofileChildrenPage implements OnInit {
  // prendo dati da localstorage
  json:any=(localStorage.getItem('isAuthenticated'));
   //faccio il parse del json
   user = JSON.parse(this.json)
   utLoggato:any;
   utenti:IUsers[] = []
  constructor(
              private service:AbstractServiceService,
              public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getById(this.user.id)
    this.getAllUsers()
  }
  getById(id:number){
    return   this.service.findUserById(id).subscribe(
    (resp) =>{
    console.log(resp);
    this.utLoggato=resp
  },
  (err)=>{}
);
  }
  getAllUsers() {
    this.service.findAllUsers().subscribe(
      (resp) => {
        this.utenti = resp;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
  /* Metodo che mi consente di riportare dati di un utente selezionato nello stesso form di registrazione utente.
uso il filter di un array perchè il getById da come oggetto undefined
 */
openDialogUser(id: number) {
  let obj = this.utenti.filter((user) => user.id === id);
  JSON.stringify(obj).toString;
  //mi restituisce un array di un solo oggetto
  /* console.log(obj[0]); */
  //seleziono oggetto dentro array
  let u =obj[0];
  //passo i dati al register.user.component.ts
  let dialogRef = this.dialog.open(RegisterUserComponent, {
    data: {
      id: u.id,
      name: u.name,
      surname: u.surname,
      email: u.email,
      password: u.password,
      username: u.username,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log(`Dialog result: ${result}`);
  });
}
openDialogAdmin(id: number) {
  let obj = this.utenti.filter((user) => user.id === id);
  JSON.stringify(obj).toString;
  /* console.log(obj[0]); */
  let u =obj[0];
  let dialogRef = this.dialog.open(RegisterAdminComponent, {
    data: {
      id: u.id,
      name: u.name,
      surname: u.surname,
      email: u.email,
      password: u.password,
      username: u.username,
      society: u.society,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log(`Dialog result: ${result}`);
  });
}


openDialogUpdateCredential(id: number){
  let obj = this.utenti.filter((user) => user.id === id);
JSON.stringify(obj).toString;
//mi restituisce un array di un solo oggetto
/* console.log(obj[0]); */
//seleziono oggetto dentro array
let u =obj[0];
//passo i dati al register.user.component.ts
let dialogRef = this.dialog.open(ModalUpdateCredentialComponent, {
  data: {
    id: u.id,
    password: u.password,
    username: u.username,
  },
});
dialogRef.afterClosed().subscribe((result) => {
  console.log(`Dialog result: ${result}`);
});
}


}
