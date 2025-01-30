import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { movieCards } from '../model/movieCards.model';
import { review } from '../model/review.model';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-movie-cards-review',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-cards-review.component.html',
  styleUrl: './movie-cards-review.component.scss',
})
export class MovieCardsReviewComponent {
  reviews: review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviewService.getAllReviews().subscribe((response) => {
      this.reviews = response;
      console.log(response);
    });
  }

  get sortedMoviesByReview(): review[] {
   
    return this.reviews.sort((a, b) => b.id - a.id).slice(0, 15);
    
  }
}
