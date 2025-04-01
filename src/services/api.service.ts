import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { movieCards } from '../app/model/movieCards.model';
import { review } from '../app/model/review.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  movieCards: movieCards[] = [];

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<movieCards[]> {
    return this.http.get<movieCards[]>(this.apiUrl + '/movies');
  }

  getMoviesById(movieId: number): Observable<movieCards> {
    return this.http.get<movieCards>(this.apiUrl + '/movies/' + movieId);
  }

  getAllReviews(): Observable<review[]> {
    return this.http.get<review[]>(this.apiUrl + '/reviews');
  }

  getReviewsByMovieId(movieId: number): Observable<review[]> {
    return this.http
      .get<review[]>(this.apiUrl+ '/reviews/movie-review/' + movieId)
      .pipe(
        tap((response) =>
          console.log('Response from getMoviesById:', response),
        ),
      );
  }
}
