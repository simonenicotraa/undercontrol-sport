import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { AbstractServiceService } from '../../abstract-service.service';
import { ModalAddCertificateComponent } from '../../athletes-children/modal-add-certificate/modal-add-certificate.component';
import { Iatletes } from '../../interfaces/iatletes';
import { Imedicalcertificates } from '../../interfaces/imedicalcertificates';

@Component({
  selector: 'app-table-expiration-medicalcertificate',
  templateUrl: './table-expiration-medicalcertificate.component.html',
  styleUrls: ['./table-expiration-medicalcertificate.component.scss'],
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
export class TableExpirationMedicalcertificateComponent implements OnInit {
  athletesCertificates:Iatletes[]=[]
  certificates:Imedicalcertificates[]=[]
  error=undefined

   /* per costruzione della tabella. Settaggio dell'header della tab */
   columnsToDisplay: string[] = ['name', 'medicalCert', 'fiscalCode'];
   /* settaggio per espansione riga Angular material */
   columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
   expandedElement: any | null;

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
        this.athletesCertificates = resp.filter( athlete =>{
          if(athlete.listCertificates!.length ==0){
            //metto questa condizione per non far spuntare errore
          return false
        }else{
          //filtro l'array prendendo tutti i certificati non validi
          return athlete.listCertificates![athlete.listCertificates!.length-1].validation == false
        }
        }
      )
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
}
