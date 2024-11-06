import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { movieCards } from '../model/movieCards.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-cards-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './movie-cards-details.component.html',
  styleUrl: './movie-cards-details.component.scss',
})
export class MovieCardsDetailsComponent {
  movieCards: movieCards[] = [];
  filteredMovieCards: movieCards[] = [];
  orderTitles: movieCards[] = [];

  

  @Input() genreClicked: string = '';
  @Input() orderByTitle: 'asc' | 'desc' = 'asc';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllMovies().subscribe((response) => {
      this.movieCards = response;
      this.filteredMovieCards = response;
      this.orderTitles = response;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['genreClicked']) {
      this.filteredMovieCards = this.movieCards.filter((movie) =>
        movie.genreName.includes(this.genreClicked),
      );
    }
    if (changes['orderByTitle']) {
      this.orderTitles = this.movieCards.sort((a, b) => {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
      });
    }
    console.log(changes);
  }

}
