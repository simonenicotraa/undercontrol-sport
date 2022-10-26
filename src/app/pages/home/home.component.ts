import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/theme.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isDarkMode!: boolean;
  showFiller = false;
  toggleControl = new FormControl(false);
  @HostBinding('class') className=''

  constructor(private authService: AuthService,
              private router: Router,
              private themeService: ThemeService) {
                themeService.initTheme()
               }

  ngOnInit(): void {
  }
  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
  }
  logout() {
    alert('Arrivederci');
    this.authService.logout();
    this.router.navigate(['start'])
    this.authService.reloadRoute();
  }
}
