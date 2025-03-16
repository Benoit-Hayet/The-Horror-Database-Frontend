import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { movieCards } from '../app/model/movieCards.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private movieUrl = 'http://localhost:8080/movies';

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
  uploadImage(fileData: FormData): Observable<string> {
    return this.http
      .post<{ url: string }>('https://votre-backend.com/upload', fileData)
      .pipe(
        map((response) => response.url), // Supposons que le backend retourne un objet avec `url`.
      );
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
      `http://localhost:8080/movies/${movie.id}`,
      movie,
    );
  }
  deleteMovie(movieId: number): Observable<any> {
    return this.http.delete(`${this.movieUrl}/${movieId}`);
  }
}
