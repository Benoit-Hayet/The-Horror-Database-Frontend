import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private movieUrl = 'http://localhost:8080/movies';

  constructor(private http: HttpClient) {}

  addMovie(
    title: string,
    country: string,
    releaseYear: string,
    director: string,
    synopsis: string,
    status: string,
    posterUrl: string,
    createdBy: any,
    createdAt: any,
    genreName: string,
  ) {
    const body = {
        title,
        country,
        releaseYear,
        director,
        synopsis,
        status,
        posterUrl,
        createdBy,
        createdAt,
        genreName,
    };

    // Log de l'objet envoyé
    console.log('Objet envoyé:', body);

    return this.http.post(this.movieUrl, body);
  }
}
