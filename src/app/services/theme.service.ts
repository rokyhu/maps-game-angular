import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThemeOption } from '../../assets/theme-option.model';
import { StyleManagerService } from './style-manager.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService
  ) {}

  getThemeOptions(): Observable<Array<ThemeOption>> {
    return this.http.get<Array<ThemeOption>>('../../assets/theme-options.json');
  }

  setTheme(themeToSet: string) {
    this.styleManager.setStyle('theme', `assets/${themeToSet}.css`);
  }
}
