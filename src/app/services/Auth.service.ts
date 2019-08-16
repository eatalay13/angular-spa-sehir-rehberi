import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { ServiceBase } from './service.base';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ServiceBase {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) { super(); }

  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = 'token';

  login(loginUser: LoginUser) {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'auth', loginUser, { headers: header }).subscribe(data => {
      this.saveToken(data.toString());
      this.userToken = data;
      this.decodedToken = this.jwtHelper.decodeToken(data.toString());
      this.alertifyService.success('Sisteme giriş yapıldı.');
      this.router.navigateByUrl('/cities');
    });
  }

  register(registerUser: RegisterUser) {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'register', registerUser, { headers: header })
      .subscribe(data => {

      });
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  loggedIn() {
    return this.jwtHelper.isTokenExpired(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserId() {
    return this.decodedToken = this.jwtHelper.decodeToken(this.token).nameId;
  }

}
