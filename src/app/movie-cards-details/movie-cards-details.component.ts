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
  filteredMovieCards: movieCards[] = [];
  orderTitles: movieCards[] = [];
  orderRating: movieCards[] = [];
  averageScores: { [key: number]: number } = {}; // Stocke la moyenne de chaque film
  stars: number[] = [1, 2, 3, 4, 5];

  @Input() genreClicked: string = '';
  @Input() yearClicked: any = '';
  @Input() countryClicked: string = '';
  @Input() orderByTitle: 'asc' | 'desc' = 'asc';
  @Input() orderByRating: 'asc' | 'desc' = 'asc';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllMovies().subscribe((response) => {
      this.movieCards = response.filter(
        (movie: any) => movie.status === 'APPROVED',
      );
      this.filteredMovieCards = [...this.movieCards];
      this.orderTitles = [...this.movieCards];
      this.orderRating = [...this.movieCards];

      this.calculateAverageScores();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['genreClicked']) {
      this.filteredMovieCards = this.genreClicked
        ? this.movieCards.filter((movie) =>
            movie.genreName.includes(this.genreClicked),
          )
        : [...this.movieCards];
    }

    if (changes['yearClicked']) {
      this.filteredMovieCards = this.yearClicked
        ? this.movieCards.filter(
            (movie) =>
              movie.releaseYear >= this.yearClicked.start &&
              movie.releaseYear <= this.yearClicked.end,
          )
        : [...this.movieCards];
    }

    if (changes['countryClicked'] && this.countryClicked) {
      this.filteredMovieCards = this.movieCards.filter((movie) =>
        movie.country.includes(this.countryClicked),
      );
    }

    if (changes['orderByTitle']) {
      this.orderTitles = [...this.movieCards].sort((a, b) =>
        this.orderByTitle === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title),
      );
    }

    if (changes['orderByRating']) {
      this.orderRating = [...this.movieCards].sort((a, b) =>
        this.orderByRating === 'asc'
          ? this.getRating(a) - this.getRating(b) // Trie par la notation des films en ordre croissant
          : this.getRating(b) - this.getRating(a) // Trie par la notation des films en ordre décroissant
      );
    }
  }

  // ✅ Déplacé en dehors de ngOnChanges
  getRating(movie: movieCards): number {
    const reviews = movie.userReview ?? [];
    return reviews.length > 0 ? reviews[0].rating : 0; // Prend la note du premier utilisateur, sinon 0
  }

  calculateAverageScores() {
    this.averageScores = {};

    this.movieCards.forEach((movie) => {
      const reviews = movie.userReview ?? [];

      if (reviews.length > 0) {
        const totalScore = reviews.reduce(
          (sum, review) => sum + review.rating,
          0,
        );
        this.averageScores[movie.id] = totalScore / reviews.length;
      } else {
        this.averageScores[movie.id] = 0;
      }
    });
  }

  filterResults(search: string) {
    this.filteredMovieCards = search
      ? this.movieCards.filter(
          (movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase()) ||
            movie.director.toLowerCase().includes(search.toLowerCase()) ||
            movie.releaseYear.toString().includes(search),
        )
      : [...this.movieCards];
  }
}
