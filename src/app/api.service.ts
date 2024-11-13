import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { movieCards } from './model/movieCards.model';
import { review } from './model/review.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  movieCards: movieCards[] = [];

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<any> {
    return this.http.get('http://localhost:8080/movies');
  }

  getMoviesById(movieId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/movies/${movieId}`);
  }

  getAllReviews(): Observable<any> {
    return this.http.get('http://localhost:8080/reviews');
  }

  getReviewsByMovieId(movieId: number): Observable<review[]> {
    return this.http.get<review[]>(`http://localhost:8080/reviews?movieId=${movieId}`);
  }

}
