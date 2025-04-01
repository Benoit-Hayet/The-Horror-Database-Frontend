import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { movieCards } from '../../model/movieCards.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-movie-cards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-cards.component.html',
  styleUrl: './movie-cards.component.scss',
})
export class MovieCardsComponent implements OnInit {
  movieCards: movieCards[] = [];

  constructor(private apiService: ApiService) {}

  @ViewChild('moviesContainer', { static: false }) moviesContainer!: ElementRef;

  scrollLeft() {
    this.moviesContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.moviesContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  ngOnInit() {
    this.apiService.getAllMovies().subscribe((response) => {
      this.movieCards = response.filter(
        (movie: any) => movie.status === 'APPROVED',
      );
    });
  }

  get sortedMoviesById(): movieCards[] {
    return this.movieCards.sort((a, b) => b.id - a.id).slice(0, 15);
  }
}
