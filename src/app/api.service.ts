import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { movieCards } from './model/movieCards.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  movieCards: movieCards[] = [];

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<any> {
    return this.http.get('http://localhost:3000/movies');
  }

  getMoviesById(movieId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/movies/${movieId}`);
  }
  
}
