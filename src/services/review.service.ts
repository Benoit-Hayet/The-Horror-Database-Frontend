import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private reviewUrl = 'http://localhost:8080/reviews';

  constructor(private http: HttpClient) {}
  

  addReview(review: string, rating: number, movieId: number): Observable<any> {
    const body = { review, rating, movieId };
    console.log('Objet envoyé:', body);
return this.http.post(this.reviewUrl, body);
  }

}