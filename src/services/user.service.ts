import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../app/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users'; // URL du backend

  constructor(private http: HttpClient, private authService:AuthService) {}

  getToken(): string | null {
    const token = localStorage.getItem('authToken'); // Vérifiez la clé utilisée
    console.log('Token récupéré:', token); // Déboguez pour voir le contenu
    return token;
  }
  

getUserProfile(): Observable<User> {
  const token = this.authService.getToken()
  console.log('Token récupéré:', token); // Centralisé dans AuthService
  const id = this.authService.getUserId();

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  console.log('Headers envoyés:', headers);
  return this.http.get<User>(`${this.apiUrl}/${id}`, { headers }).pipe(
    catchError(error => {
      console.error('Error fetching user profile:', error);
      return throwError(() => error); // Utilisation de la syntaxe moderne
    })
  );
}

  
}
