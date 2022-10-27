import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                                                      id:number,
                                                      name: string,
                                                      surname:string,
                                                      dateOfBirth:string,
                                                      email: string,
                                                      ntel:string,
                                                      fiscalCode: string,
                                                      address: string,
                                                      cap: string,}
    ) { }

  ngOnInit(): void {
  }

}
