import { Component, Input, SimpleChanges } from '@angular/core';
import { movieCards } from '../model/movieCards.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-cards-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-cards-details.component.html',
  styleUrl: './movie-cards-details.component.scss',
})
export class MovieCardsDetailsComponent {
  movieCards: movieCards[] = [];
  filteredCountryCards: movieCards[] = [];
  filteredMovieCards: movieCards[] = [];
  orderTitles: movieCards[] = [];
  rating: movieCards[] = [];
  // ID utilisateur récupéré dynamiquement après connexion

  @Input() genreClicked: string = '';
  @Input() yearClicked: any = '';
  @Input() countryClicked: string = '';
  @Input() orderByTitle: 'asc' | 'desc' = 'asc';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllMovies().subscribe((response) => {
      this.movieCards = response;
      this.filteredMovieCards = response;
      this.filteredCountryCards = response;
      this.orderTitles = response;
      console.log(this.movieCards);
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['genreClicked']) {
      if (this.genreClicked === '') {
        // Si aucun genre n'est sélectionné, réaffiche tous les films
        this.filteredMovieCards = [...this.movieCards];
      } else {
        // Sinon, filtre par genre
        this.filteredMovieCards = this.movieCards.filter((movie) =>
          movie.genreName.includes(this.genreClicked),
        );
      }
    }
    if (changes['yearClicked']) {
      if (!this.yearClicked || this.yearClicked === '') {
        // Si aucune année n'est sélectionnée, réaffiche tous les films
        this.filteredMovieCards = [...this.movieCards];
      } else {
        // Filtre les films par plage d'années
        this.filteredMovieCards = this.movieCards.filter(
          (movie) =>
            movie.releaseYear >= this.yearClicked.start &&
            movie.releaseYear <= this.yearClicked.end
        );
      }

    if (changes['countryClicked']) {
      this.filteredCountryCards = this.movieCards.filter((movie) =>
        movie.country.includes(this.countryClicked),
      );
    }
    if (changes['orderByTitle']) {
      this.orderTitles = this.movieCards.sort((a, b) => {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
      });
    }
  }
}
  stars: number[] = [1, 2, 3, 4, 5];
  currentRating = 0; // La note sélectionnée
  hoverRatingState = 0; // État au survol
}
