import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { movieCards } from '../model/movieCards.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-admin-database',
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule],
  templateUrl: './admin-database.component.html',
  styleUrl: './admin-database.component.scss',
})
export class AdminDatabaseComponent implements OnInit {
  movieCards: movieCards[] = [];

  constructor(private apiService: ApiService,private movieService:MovieService) {}

  ngOnInit() {
    this.apiService.getAllMovies().subscribe((response) => {
      this.movieCards = response;
    });
  }

  get sortedMoviesById(): movieCards[] {
    return this.movieCards.sort((a, b) => b.id - a.id).slice(0, 15);
  }

  deleteMovie(movieId: number): void {
    this.movieService.deleteMovie(movieId).subscribe({
      next: () => {
        console.log(`Film avec l'ID ${movieId} supprimée.`);
        // Met à jour la liste des critiques localement après suppression
        this.movieCards = this.movieCards.filter(
          (movie) => movie.id !== movieId,
        );
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du film :', err);
      },
    });
  }
}
