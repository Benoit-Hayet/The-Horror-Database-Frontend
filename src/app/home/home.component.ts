import { Component } from '@angular/core';
import { movieCards } from '../model/movieCards.model';
import { movies } from '../data/movie.data';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movieCards : movieCards[] = movies;

 get sortedMoviesById() : movieCards [] {
  return this.movieCards.sort((a, b) => b.id - a.id).slice(0, 15);
 } 
}
