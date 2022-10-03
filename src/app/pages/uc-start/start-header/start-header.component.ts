import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-header',
  templateUrl: './start-header.component.html',
  styleUrls: ['./start-header.component.scss']
})
export class StartHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
loginpage(){
  this.router.navigate(['/login'])
}

}
