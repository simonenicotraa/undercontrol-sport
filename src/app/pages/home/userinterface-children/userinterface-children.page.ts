import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AbstractServiceService } from '../abstract-service.service';

@Component({
  templateUrl: './userinterface-children.page.html',
  styleUrls: ['./userinterface-children.page.scss']
})
export class UserinterfaceChildrenPage implements OnInit {
  @ViewChild('f') form!: NgForm;


  // prendo dati da localstorage
  json:any=(localStorage.getItem('isAuthenticated'));
  //faccio il parse del json
  user = JSON.parse(this.json)
  utLoggato:any;
  constructor(private service:AbstractServiceService) { }

  ngOnInit(): void {
    //faccio il getbyId dal database tramite id preso dal localStorage
    this.getById(this.user.id);
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



}
