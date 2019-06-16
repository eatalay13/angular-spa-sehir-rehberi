import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { Photo } from '../models/photo';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router
  ) { }

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
    this.http.post<City>(this.path + 'cities', city).subscribe(data => {
      this.alertifyService.success(data.name + ' şehri başarıyla eklendi.');
      this.router.navigateByUrl('cityDetail/' + data.id);
    });
  }
}
