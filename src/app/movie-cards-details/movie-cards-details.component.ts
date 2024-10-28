import { Component } from '@angular/core';
import { movieCards } from '../model/movieCards.model';
import { movies } from '../data/movie.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-cards-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-cards-details.component.html',
  styleUrl: './movie-cards-details.component.scss'
})
export class MovieCardsDetailsComponent {

    movieCards : movieCards[] = movies;
  
    get sortedMoviesById() : movieCards [] {
      return this.movieCards.sort((a, b) => b.id - a.id).slice(0, 15);
  }}
  

