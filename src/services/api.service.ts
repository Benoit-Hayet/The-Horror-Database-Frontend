import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { movieCards } from '../app/model/movieCards.model';
import { review } from '../app/model/review.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/movies';

  movieCards: movieCards[] = [];

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<movieCards[]> {
    return this.http.get<movieCards[]>('http://localhost:8080/movies');
  }

  getMoviesById(movieId: number): Observable<movieCards> {
    return this.http.get<movieCards>(`http://localhost:8080/movies/${movieId}`);
  }

  getAllReviews(): Observable<review[]> {
    return this.http.get<review[]>('http://localhost:8080/reviews');
  }

  getReviewsByMovieId(movieId: number): Observable<review[]> {
    return this.http
      .get<review[]>(`http://localhost:8080/reviews/movie-review/${movieId}`)
      .pipe(
        tap((response) =>
          console.log('Response from getMoviesById:', response),
        ),
      );
  }
}
