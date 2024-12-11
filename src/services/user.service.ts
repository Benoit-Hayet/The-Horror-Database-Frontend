import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users'; // URL du backend

  constructor(private http: HttpClient) {}


  getUserProfile(token: string): Observable<any> {
    console.log('Envoi de la requête avec le token:', token);  // Affiche le token
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    }).pipe(
      tap(response => {
        console.log('Réponse du serveur:', response);  // Affiche la réponse du serveur
      }),
      catchError(error => {
        console.error('Erreur de la requête:', error);  // Affiche l'erreur
        return of(null);  // Renvoie un Observable avec null en cas d'erreur
      })
    );
  }
}  