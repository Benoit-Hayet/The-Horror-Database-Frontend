import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/auth'; // URL du backend

  constructor(private http: HttpClient) {}

  // Récupérer le token JWT depuis le localStorage
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUserProfile(id: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Fetching user profile for id:', id);
  
    return this.http.get(`${this.apiUrl}/profile/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching user profile:', error);
        return throwError(error); // Relancer l'erreur
      })
    );
  }
  
}
