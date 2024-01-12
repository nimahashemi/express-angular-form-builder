import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  jwtHelper = new JwtHelperService();

  constructor() { }

  decodeToken (token: string) {
      const data = this.jwtHelper.decodeToken(token);
      console.log(data);
      return data;
  }

  isTokenExpDate(token:string) {
    return this.jwtHelper.isTokenExpired(token);
  }



}
