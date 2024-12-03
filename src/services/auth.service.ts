import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  register(firstName: string, lastName: string, birthdate: string, username: string, email: string, role: string, password: string) {
    const body = { firstName, lastName, birthdate, username, email, role, password };
    return this.http.post(this.authUrl + '/register', body);
  }
  

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.authUrl + '/login', body, {responseType: 'text' as 'json'});
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');}

}
