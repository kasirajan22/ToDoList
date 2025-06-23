import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5210/';
  constructor(private http: HttpClient) { }

  loging(credentials: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.apiUrl + 'api/auth/login', credentials)
    .pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
      })
    )
  }

  register(credentials: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.apiUrl + 'api/auth/register', credentials)
    .pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
      })
    )
  }
}
