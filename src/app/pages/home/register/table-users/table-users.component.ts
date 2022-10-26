import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbstractServiceService } from '../../abstract-service.service';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { RegisterAdminComponent } from '../register-admin/register-admin.component';
import { IAuthData } from 'src/app/pages/auth/interfaces/iauth-data';
import { IUsers } from '../../interfaces/iusers';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { ModalUpdateCredentialComponent } from '../../userprofile-children/modal-update-credential/modal-update-credential.component';
@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableUsersComponent implements OnInit {
  users: IAuthData[] = [];
  /* oggetto utilizzato per iterare array user e stampare in tabella */
  dataSource = new MatTableDataSource(this.users);
  utenti:IUsers[] = []

  /* proprieta per ottenere dati da localstorage [getUtLoggato()] */
  json:any;
  userLog:any;

  constructor(
    private service: AbstractServiceService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  columnsToDisplay: string[] = ['username', 'email', 'role'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;

  ngOnInit(): void {
    this.getAllUsers();
    this.getUtLoggato()
  }
  getUtLoggato() {
    this.json=(localStorage.getItem('isAuthenticated'));
    this.userLog = JSON.parse(this.json)
    /* console.log(this.userLog.roles[0])  ruolo dell'utente loggato*/
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /* con questo metodo vado a comporre la tabella con tutti gli utenti */
  getAllUsers() {
    this.service.findAllUsers().subscribe(
      (resp) => {
        this.users = resp;
        this.utenti = resp;
        this.dataSource = new MatTableDataSource(this.users);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe( );
    this.getAllUsers();
    this.authService.reloadRoute()
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
