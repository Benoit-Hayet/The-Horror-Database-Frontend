import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private movieUrl = 'http://localhost:8080/movies';

  constructor(private http: HttpClient) {}

  addMovie(
    title: string,
    country: string,
    releaseYear: any, // Correction du type
    director: string,
    synopsis: string,
    status: string,
    posterUrl: string,
    genres: any[], // Correction : Tableau de chaînes de caractères
  ) {
    // Mapper les genres pour correspondre au format attendu par l'API
    const formattedGenres = genres.map((genre) => ({ name: genre }));

    const body = {
      title,
      country,
      releaseYear,
      director,
      synopsis,
      status,
      posterUrl,
      genres: formattedGenres, // Utilisation des genres formatés
    };

    // Log de l'objet envoyé
    console.log('Objet envoyé:', body);

    return this.http.post(this.movieUrl, body);
  }
  uploadImage(fileData: FormData): Observable<string> {
    return this.http.post<{ url: string }>('https://votre-backend.com/upload', fileData).pipe(
      map((response) => response.url) // Supposons que le backend retourne un objet avec `url`.
    );
  }
  

}