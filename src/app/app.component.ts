import { Component } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'undercontrol-sport';
  constructor(
              private themeService: ThemeService,
             ) {
                themeService.initTheme()
                }

}
