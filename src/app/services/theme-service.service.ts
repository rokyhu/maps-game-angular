import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThemeOptions } from '../../assets/theme-options.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeServiceService {
  constructor(private http: HttpClient) {}

  getThemeOptions(): Observable<ThemeOptions[]> {
    return this.http.get<ThemeOptions[]>('assets/theme-options.ts');
  }

  setTheme() {
    // TODO(@rokyhu): Implement this later
  }
}
