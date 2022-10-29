import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { ModalAddCertificateComponent } from '../../athletes-children/modal-add-certificate/modal-add-certificate.component';
import { ModalViewAllCertificateComponent } from '../../athletes-children/modal-view-all-certificate/modal-view-all-certificate.component';
import { Iatletes } from '../../interfaces/iatletes';
import { Imedicalcertificates } from '../../interfaces/imedicalcertificates';

@Component({
  selector: 'app-table-expiration-medicalcertificate',
  templateUrl: './table-expiration-medicalcertificate.component.html',
  styleUrls: ['./table-expiration-medicalcertificate.component.scss'],
  animations: [
    trigger('detailExpand', [ state('collapsed, void', style({ height: '0px' })),
     state('expanded', style({ height: '*' })),
     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
     transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class TableExpirationMedicalcertificateComponent implements OnInit {
  athletesCertificates:Iatletes[]=[]
  certificates:Imedicalcertificates[]=[]
  error=undefined

   /* per costruzione della tabella. Settaggio dell'header della tab */
   dataSource= new MatTableDataSource(this.athletesCertificates);
   columnsToDisplay: string[] = ['name', 'medicalCert', 'fiscalCode'];
   /* settaggio per espansione riga Angular material */
   columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
   expandedElement: any | null;
  /* per sorting */
   @ViewChild(MatSort) matSort!: MatSort;
   /* per paginazione */
   @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private abstractService: AbstractServiceService,
              public dialog: MatDialog,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.getAllAthletes()
    this. getAllMedicalCertificates()

  }




  getAllAthletes() {
    this.abstractService.findAllAthletes().subscribe(
      (resp)=>{
        this.athletesCertificates = resp.filter(
          athlete =>{
          if(athlete.listCertificates!.length ==0){
            //metto questa condizione per non far spuntare errore
          return athlete.listCertificates!.length==0
        }else{
          //filtro l'array prendendo tutti i certificati non validi
          return athlete.listCertificates![athlete.listCertificates!.length-1].validation == false
        }
        }
      )
      /* per settare il sorting e paginazione*/
      this.dataSource = new MatTableDataSource(this.athletesCertificates);
      this.dataSource.sort =this.matSort;
      this.dataSource.paginator = this.paginator;
      },
      (err)=>{
        this.error= err.error;
      }
    )
  }

  getAllMedicalCertificates() {
    return this.abstractService.getAllMedicalCertificates().subscribe(
      (resp) => {
        this.error = undefined;
        this.certificates = resp;
        console.log(this.certificates);
      },
      (err) => {
        console.log(err.error);
        this.error = err.error;
      }
    );
  }


    /* apertura modal per modificare e aggiornare Certificato */
    openDialogCertificateUpdate(id: number) {
      console.log(id);
      let obj = this.certificates.filter((x) => x.id === id);
      let m = obj[0];
      console.log(m);
      console.log(m.productionDate);
      let dialogRef = this.dialog.open(ModalAddCertificateComponent, {
        data: {
          id: m.id,
          productionData: m.productionDate,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
       this.authService.reloadRoute()
      });
    }
      /* apertura modal per vedere tutti i certificati */
    openDialogViewAllCertificate(id: number) {
      let obj = this.athletesCertificates.filter((user) => user.id === id);
      let u = obj[0];
      let dialogRef = this.dialog.open(ModalViewAllCertificateComponent, {
        data: {
          id: id,
          list: u.listCertificates,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }

      /* apertura modal per aggiungere certificati */
  openDialogCertificate(id: number) {
    let obj = this.athletesCertificates.filter((user) => user.id === id);
    let u = obj[0];
    let dialogRef = this.dialog.open(ModalAddCertificateComponent, {
      data: {
        id: u.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
