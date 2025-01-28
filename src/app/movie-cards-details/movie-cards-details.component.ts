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
      this.movieCards = response.filter((movie : any) => movie.status === "APPROVED" );
      this.filteredMovieCards = response.filter((movie : any) => movie.status === "APPROVED" );
      this.filteredCountryCards = response.filter((movie : any) => movie.status === "APPROVED" );
      this.orderTitles = response.filter((movie : any) => movie.status === "APPROVED" );
      console.log("Mon tableau de films",this.movieCards);
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
            movie.releaseYear <= this.yearClicked.end,
        );
      }
    }
    if (changes['countryClicked'] && this.countryClicked) {
      console.log('Country changed:', this.countryClicked);
      this.filteredMovieCards = this.movieCards.filter((movie) =>
        movie.country.includes(this.countryClicked),
      );
    }
    if (changes['orderByTitle']) {
      this.orderTitles = this.movieCards.sort((a, b) => {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
      });
    }
  }
  filterResults(search: string) {
    if (!search) {
      this.filteredMovieCards = this.movieCards;
    }
  
    this.filteredMovieCards = this.movieCards.filter(
      movieCards => movieCards?.title.toLowerCase().includes(search.toLowerCase()) ||
      movieCards?.director.toLowerCase().includes(search.toLowerCase()) ||
      movieCards?.releaseYear.toString().includes(search)
    );
  }
  stars: number[] = [1, 2, 3, 4, 5];
  currentRating = 0;
  hoverRatingState = 0;
}
