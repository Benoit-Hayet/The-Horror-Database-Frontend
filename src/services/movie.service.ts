import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { movieCards } from '../app/model/movieCards.model';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private movieUrl = environment.apiUrl + '/movies';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  addMovie(
    title: string,
    country: string,
    releaseYear: any,
    director: string,
    synopsis: string,
    status: string,
    posterUrl: string,
    genres: any[],
  ) {
    const formattedGenres = genres.map((genre) => ({ name: genre }));

    const body = {
      title,
      country,
      releaseYear,
      director,
      synopsis,
      status,
      posterUrl,
      genres: formattedGenres,
    };

    console.log('Objet envoyé:', body);

    return this.http.post(this.movieUrl, body);
  }

  
  getAddedMoviesByUserId(): Observable<movieCards[]> {
    const token = this.authService.getToken();
    const userId = this.authService.getUserId();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<movieCards[]>(`${this.movieUrl}/user/${userId}`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des films:', error);
          return throwError(() => new Error('Erreur de requête'));
        }),
      );
  }
  updateMovie(movie: movieCards): Observable<movieCards> {
    return this.http.put<movieCards>(
      this.movieUrl+ '/' + movie.id,
      movie,
    );
  }
  deleteMovie(movieId: number): Observable<any> {
    return this.http.delete(`${this.movieUrl}/${movieId}`);
  }
}
