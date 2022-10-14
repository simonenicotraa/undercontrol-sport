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
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { IAthlCoach } from '../../interfaces/iathl-coach';
import { Iatletes } from '../../interfaces/iatletes';
import { Imedicalcertificates } from '../../interfaces/imedicalcertificates';
import { Ipayment } from '../../interfaces/ipayment';
import { ModalAddCertificateComponent } from '../modal-add-certificate/modal-add-certificate.component';
import { ModalAddPaymentComponent } from '../modal-add-payment/modal-add-payment.component';
import { ModalViewAllCertificateComponent } from '../modal-view-all-certificate/modal-view-all-certificate.component';
import { ModalViewAllPaymentComponent } from '../modal-view-all-payment/modal-view-all-payment.component';
import { RegisterAthletesComponent } from '../register-athletes/register-athletes.component';

@Component({
  selector: 'app-table-athletes',
  templateUrl: './table-athletes.component.html',
  styleUrls: ['./table-athletes.component.scss'],
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
export class TableAthletesComponent implements OnInit {
  payments:Ipayment[] = [];
  athletes: Iatletes[] = [];
  dataSource = new MatTableDataSource(this.athletes);
  error=undefined;
  certificates:Imedicalcertificates[]=[]

  constructor(
              private abstractService: AbstractServiceService,
              public dialog: MatDialog,
              private authService: AuthService
  ) { }

  columnsToDisplay: string[] = ['name', 'surname', 'fiscalCode'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;

  ngOnInit(): void {
    this.getAllAthletes()
    this.getAllPayments();
    this.getAllMedicalCertificates()
  }
applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllAthletes() {
    this.abstractService.findAllAthletes().subscribe(
      (resp) => {
        this.athletes = resp;
        this.dataSource = new MatTableDataSource(this.athletes);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
    getAllPayments() {
    return this.abstractService.getAllPayment().subscribe(
      (resp) => {
        this.error = undefined;
        this.payments = resp;
        },
        (err) => {
          console.log(err.error);
          this.error = err.error;
        }
      )
     }
     getAllMedicalCertificates() {
      return this.abstractService.getAllMedicalCertificates().subscribe(
        (resp) => {
          this.error = undefined;
          this.certificates = resp;
          console.log(this.certificates)
          },
          (err) => {
            console.log(err.error);
            this.error = err.error;
          }
        )
       }
  deleteAthlete(id: number) {
    this.abstractService.deleteAthletes(id).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
    this.getAllAthletes();
    this.authService.reloadRoute()
  }
  /* Apertura modal modifica dati atleta */
  openDialog(id: number) {
    let obj = this.athletes.filter((user) => user.id === id);
    //mi restituisce un array di un solo oggetto
    // console.log(obj[0]);
    //seleziono oggetto filtrato che sarà l'unico dentro array
    let u =obj[0];
    //passo i dati al register.user.component.ts
    let dialogRef = this.dialog.open(RegisterAthletesComponent, {
      data: {
        id: u.id,
        name: u.name,
        surname: u.surname,
        dateOfBirth: u.dateOfBirth,
        email: u.email,
        ntel: u.ntel,
        fiscalCode: u.fiscalCode,
        address: u.address,
        cap: u.cap
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /* apertura modal per aggiungere certificati */
  openDialogCertificate(id:number){
    let obj = this.athletes.filter((user) => user.id === id);
    let u =obj[0];
    let dialogRef = this.dialog.open(ModalAddCertificateComponent, {
      data: {
        id: u.id
            },
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
  }
  /* apertura modal per modificare e aggiornare Certificato */
  openDialogCertificateUpdate(id:number){
    console.log(id)
    let obj=this.certificates.filter(x => x.id === id)
    let m = obj[0]
    console.log(m)
    console.log(m.productionDate)
     let dialogRef = this.dialog.open(ModalAddCertificateComponent, {
     data: {
            id:m.id,
            productionData:m.productionDate
           },
     });
     dialogRef.afterClosed().subscribe((result) => {
       console.log(`Dialog result: ${result}`);
     });
  }
  openDialogViewAllCertificate(id: number){

    let obj = this.athletes.filter((user) => user.id === id);
    let u = obj[0]
    console.log(u.listPayments)
    let dialogRef = this.dialog.open(ModalViewAllCertificateComponent, {
      data: {
            id:id,
            list: u.listCertificates
            }
          });
          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
          });
  }


    /* apertura modal per aggiungere pagamento */
    openDialogPayment(id:number) {
      let obj = this.athletes.filter((user) => user.id === id);
      let u =obj[0];
      let dialogRef = this.dialog.open(ModalAddPaymentComponent, {
        data: {
              id: u.id
              },
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
    }

    /* apertura modal per modificare e aggiornare pagamento */
    openDialogPaymentUpdate(id:number){
       let obj=this.payments.filter(x => x.id === id)
       let p = obj[0]
       console.log(p)
        let dialogRef = this.dialog.open(ModalAddPaymentComponent, {
        data: {
          idPayement:p.id,
              season: p.season,
              amount: p.amount,
              payed: p.payed
              },
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
    }

    openDialogViewAllPayement(id: number){
      console.log(id)
      let obj = this.athletes.filter((user) => user.id === id);
      let u = obj[0]
      console.log(u.listPayments)
      let dialogRef = this.dialog.open(ModalViewAllPaymentComponent, {
        data: {
              id:id,
              list: u.listPayments
              }
            });
            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result: ${result}`);
            });
    }
}
