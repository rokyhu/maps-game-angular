import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapStylesService {
  private apiUrl: string = 'http://localhost:5000/mapStyles';

  constructor(private http: HttpClient) {}

  getMapStyles(mapType: string): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
