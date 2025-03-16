import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../app/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getAllUsers(): Observable<User[]> {
    const token = this.authService.getToken();
    console.log('Token récupéré:', token); // Centralisé dans AuthService
    const id = this.authService.getUserId();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(`${this.apiUrl}`,{headers});
  }

  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    console.log('Token récupéré:', token);
    return token;
  }

  getUserProfile(): Observable<User> {
    const token = this.authService.getToken();
    console.log('Token récupéré:', token); // Centralisé dans AuthService
    const id = this.authService.getUserId();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error); // Utilisation de la syntaxe moderne
      }),
    );
  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
