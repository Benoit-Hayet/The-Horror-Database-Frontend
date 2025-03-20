import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { ApiService } from '../../../services/api.service';
import { MovieService } from '../../../services/movie.service';
import { movieCards } from '../../model/movieCards.model';


@Component({
  selector: 'app-admin-add-movie',
  standalone: true,
  imports: [AdminNavbarComponent,CommonModule],
  templateUrl: './admin-add-movie.component.html',
  styleUrls: ['../admin-add-movie/admin-add-movie.component.scss'], 
})
export class AdminAddMovieComponent implements OnInit {
  movieCards: movieCards[] = [];

  constructor(
    private apiService: ApiService,
    private movieService: MovieService,
  ) {}

  ngOnInit(): void {
    this.fetchPendingMovies();
  }

  private fetchPendingMovies(): void {
    this.apiService.getAllMovies().subscribe({
      next: (response) => {
        this.movieCards = response.filter(
          (movie: movieCards) => movie.status === 'PENDING',
        );
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des films :', error);
      },
    });
  }

  get sortedMoviesById(): movieCards[] {
    return [...this.movieCards].sort((a, b) => b.id - a.id).slice(0, 15);
  }

  /**
   * @param movie
   * @param newStatus
   */
  updateMovieStatus(movie: movieCards, newStatus: string): void {
    const updatedMovie = { ...movie, status: newStatus };

    this.movieService.updateMovie(updatedMovie).subscribe({
      next: (response) => {
        console.log('Mise à jour réussie :', response);

        this.movieCards = this.movieCards.map((m) =>
          m.id === updatedMovie.id ? response : m,
        );
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour :', error);
      },
    });
  }
}