import { Component, Input, SimpleChanges } from '@angular/core';
import { movieCards } from '../model/movieCards.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { country } from '../model/country.model';

@Component({
  selector: 'app-movie-cards-details',
  standalone: true,
  imports: [CommonModule,RouterLink,],
  templateUrl: './movie-cards-details.component.html',
  styleUrl: './movie-cards-details.component.scss',
})
export class MovieCardsDetailsComponent {
  movieCards: movieCards[] = [];
  filteredCountryCards: movieCards[] = [];
  filteredMovieCards: movieCards[] = [];
  orderTitles: movieCards[] = [];
  rating:movieCards[] = [];

  

  @Input() genreClicked: string = '';
  @Input() countryClicked: string = '';
  @Input() orderByTitle: 'asc' | 'desc' = 'asc';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllMovies().subscribe((response) => {
      this.movieCards = response;
      this.filteredMovieCards = response;
      this.filteredCountryCards = response;
      this.orderTitles = response;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['genreClicked']) {
      this.filteredMovieCards = this.movieCards.filter((movie) =>
        movie.genreName.includes(this.genreClicked),
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
  stars: number[] = [1, 2, 3, 4, 5];
  currentRating = 0; // La note sélectionnée
  hoverRatingState = 0; // État au survol

  // Méthode appelée lors du clic sur une étoile
  /*selectRating(rating: number) {
    return Math.round(rating);
  }*/
}


