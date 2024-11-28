import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

 register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  username: string,
  role: string,
  birthdate: Date
): Observable<any> {
  const body = { firstName, lastName, email, password, username, role, birthdate };
  return this.http.post<any>(`${this.authUrl}/register`, body, {
    headers: { 'Content-Type': 'application/json' }
  });
}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.authUrl + '/login', body);
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');}

}
