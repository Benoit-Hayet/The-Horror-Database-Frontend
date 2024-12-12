import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/auth'; // URL du backend

  constructor(private http: HttpClient) {}


  getUserProfile(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile?email=${email}`);
  }
}  