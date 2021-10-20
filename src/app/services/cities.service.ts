import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../city';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private apiUrl: string = 'http://localhost:5000/cities';
  private cities: City[];

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }
}
