import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { movieCards } from '../model/movieCards.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movie-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-cards.component.html',
  styleUrl: './movie-cards.component.scss'
})
export class MovieCardsComponent {
  movieCards : movieCards[] =  [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getMovies().subscribe((response) => {
      this.movieCards = response;
    });
  }

  get sortedMoviesById() : movieCards [] {
    return this.movieCards.sort((a, b) => b.id - a.id).slice(0, 15);
}}
