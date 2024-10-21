import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { movieCards } from '../model/movieCards.model';
import { movies } from '../data/movie.data';

@Component({
  selector: 'app-movie-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-cards.component.html',
  styleUrl: './movie-cards.component.scss'
})
export class MovieCardsComponent {
  movieCards : movieCards[] = movies;

  get sortedMoviesById() : movieCards [] {
    return this.movieCards.sort((a, b) => b.id - a.id).slice(0, 15);
}}
