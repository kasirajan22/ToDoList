import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5210/';
  private currentUsenSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUsenSubject.asObservable();
  constructor(private http: HttpClient,private router: Router) {
    const token = localStorage.getItem('token');
    if(token){
      this.currentUsenSubject.next('user');
    }
   }

  loging(credentials: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.apiUrl + 'api/auth/login', credentials)
    .pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
        this.currentUsenSubject.next('user');
      })
    )
  }

  register(credentials: User): Observable<AuthResponse>{
    console.log('Registering user:', credentials);
    return this.http.post<AuthResponse>(this.apiUrl + 'api/auth/register', credentials)
    .pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
        this.currentUsenSubject.next('user');
      })
    )
  }

  logout(): void{
    localStorage.removeItem('token');
    this.currentUsenSubject.next(null);
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean{
    const token = localStorage.getItem('token');
    return!!token;
  }
  getToken(): string | null{
    return localStorage.getItem('token');;
  }
}
