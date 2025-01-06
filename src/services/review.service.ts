import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { review } from '../app/model/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private reviewUrl = 'http://localhost:8080/reviews';

  constructor(private http: HttpClient, private authService: AuthService) {}
  

  addReview(review: string, rating: number, movieId: number): Observable<any> {
    const body = { review, rating, movieId };
    console.log('Objet envoyé:', body);
  
    return this.http.post(this.reviewUrl, body).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'envoi de la critique:', error);
        return throwError(() => new Error('Erreur de requête'));
      })
    );
  }

  getReviewsByUserId(): Observable<review[]> {
    const token = this.authService.getToken();
    const id = this.authService.getUserId();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<review[]>(`${this.reviewUrl}/${id}`, { headers }).pipe(

      catchError((error) => {
        console.error('Erreur lors de la récupération des critiques:', error);
        return throwError(() => new Error('Erreur de requête'));
      })
    );
  }
  
  deleteReview(reviewId: number): Observable<any> {
    console.log('ID de la critique à supprimer:', reviewId);
    return this.http.delete(`${this.reviewUrl}/${reviewId}`);
  }
  

}