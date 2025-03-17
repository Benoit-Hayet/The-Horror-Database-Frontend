import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { favorite } from '../app/model/favorite.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteUrl = 'http://localhost:8080/favorites'; // URL de base du backend

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getFavoritesByUserId(): Observable<favorite[]> {
    const userId = this.authService.getUserId();
    return this.http
      .get<
        favorite[]
      >(`${this.favoriteUrl}/user/${userId}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response || []), 
        catchError((error) => {
          console.error('Erreur lors de la récupération des favoris:', error);
          return throwError(() => new Error('Erreur de requête'));
        }),
      );
  }

  addFavorite(userId: number, movieId: number): Observable<any> {
    return this.http
      .post(
        `${this.favoriteUrl}`,
        { userId, movieId },
        { headers: this.getHeaders() },
      )
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'ajout du favori:", error);
          return throwError(() => new Error('Erreur de requête'));
        }),
      );
  }

  removeFavorite(movieId: number): Observable<any> {
    return this.http
      .delete(`${this.favoriteUrl}/${movieId}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la suppression du favori:', error);
          return throwError(() => new Error('Erreur de requête'));
        }),
      );
  }
}
