import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeOption } from '../../../assets/theme-option.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  themeOptions$: Observable<Array<ThemeOption>> =
    this.themeService.getThemeOptions();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setTheme('deeppurple-amber');
  }

  themeChangeHandler(themeToSet: string) {
    this.themeService.setTheme(themeToSet);
  }
}
