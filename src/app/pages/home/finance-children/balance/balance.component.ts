import { Component, OnInit } from '@angular/core';
import { AbstractServiceService } from '../../abstract-service.service';
import { Ipayment } from '../../interfaces/ipayment';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
payments:Ipayment[]=[]
totalAmount:number=0
totalPayed:number=0
perc!:number
error=undefined
  constructor(private abstractService: AbstractServiceService,) { }

  ngOnInit(): void {
    this.getAllPayments()
  }
  getAllPayments() {
    return this.abstractService.getAllPayment().subscribe(
      (resp) => {
        this.error = undefined;
        this.payments = resp;
        this.payments.forEach(ele => {
          this.totalAmount +=  ele.amount;
          this.totalPayed += ele.payed!;
        });
        this.perc=this.totalPayed*100/this.totalAmount

      },
      (err) => {
        console.log(err.error);
        this.error = err.error;
      }
    );
  }
}
