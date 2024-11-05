import { Component, Input, input } from '@angular/core';
import { movieCards } from '../model/movieCards.model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movie-cards-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-cards-details.component.html',
  styleUrl: './movie-cards-details.component.scss',
})
export class MovieCardsDetailsComponent {
  movieCards: movieCards[] = [];
  filteredMovieCards: movieCards[] = [];

  @Input() genreClicked: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getMovies().subscribe((response) => {
      this.movieCards = response;
      this.filteredMovieCards = response;
    });

  }

  ngOnChanges(){
    this.filteredMovieCards = this.movieCards.filter(movie => movie.genreName.includes(this.genreClicked));
  }

  /*get sortedMoviesById(): movieCards[] {
    return this.movieCards.sort((a, b) => b.id - a.id).slice(0, 15);
  }*/
}
