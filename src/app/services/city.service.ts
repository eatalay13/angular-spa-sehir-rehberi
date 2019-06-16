import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  path = 'https://localhost:44330/api/';

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.path + 'cities');
  }

  getCityById(cityId: number): Observable<City> {
    return this.http.get<City>(this.path + 'cities/detail?cityId=' + cityId);
  }

  getPhotosByCity(cityId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.path + 'cities/photos?cityId=' + cityId);
  }

  add(city: City) {
    this.http.post(this.path + 'city', city).subscribe();
  }
}
