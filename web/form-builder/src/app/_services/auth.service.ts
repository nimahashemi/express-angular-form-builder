import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:3000/api/v1/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  async login(username: string, password: string): Promise<Observable<any>> {
    return this.http.post(
      AUTH_API + '/signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  async register(username: string, password: string): Promise<Observable<any>> {
    return this.http.post(
      AUTH_API + '/signup',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  async logout(token: string): Promise<Observable<any>> {
    return this.http.post(AUTH_API + '/signout', { token }, httpOptions);
  }
}
