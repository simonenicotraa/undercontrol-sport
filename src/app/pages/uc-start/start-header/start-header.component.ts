import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-start-header',
  templateUrl: './start-header.component.html',
  styleUrls: ['./start-header.component.scss']
})
export class StartHeaderComponent implements OnInit {
  isDarkMode!: boolean;
  showFiller = false;

  toggleControl = new FormControl(false);
  @HostBinding('class') className=''

  constructor(private router: Router,
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
loginpage(){
  this.router.navigate(['/login'])
}

}
