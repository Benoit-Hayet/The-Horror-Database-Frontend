import { Component } from '@angular/core';
import { movieCards } from '../model/movieCards.model';
import { movies } from '../movies/movie.data';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movieCards : movieCards[] = movies;

 get sortedMoviesById() : movieCards [] {
  return this.movieCards.sort((a, b) => b.id - a.id);
 } 
}
