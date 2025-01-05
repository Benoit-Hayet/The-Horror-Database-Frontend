import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { movieCards } from '../app/model/movieCards.model';
import { AuthService } from './auth.service';
import { favorite } from '../app/model/favorite.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteUrl = 'http://localhost:8080/favorites'; // URL de base du backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  getFavoritesByUserId(): Observable<favorite[]> {
    const token = this.authService.getToken();
        const userId = this.authService.getUserId();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        
    return this.http.get<favorite[]>(`${this.favoriteUrl}/user/${userId}`, { headers }).pipe(
          catchError((error) => {
            console.error('Erreur lors de la récupération des films:', error);
            return throwError(() => new Error('Erreur de requête'));
          })
        );
      }
  

  addFavorite(userId: number, movieId: number): Observable<any> {
    return this.http.post(`${this.favoriteUrl}`, { userId, movieId });
  }

  removeFavorite(userId: number, movieId: number): Observable<any> {
    return this.http.delete(`${this.favoriteUrl}/${movieId}`);
  }
}
