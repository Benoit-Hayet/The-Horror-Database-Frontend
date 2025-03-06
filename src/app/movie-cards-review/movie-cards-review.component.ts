import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { review } from '../model/review.model';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-movie-cards-review',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-cards-review.component.html',
  styleUrl: './movie-cards-review.component.scss',
})
export class MovieCardsReviewComponent implements OnInit {
  reviews: review[] = [];

  constructor(private reviewService: ReviewService) {}
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
    this.reviewService.getAllReviews().subscribe((response) => {
      this.reviews = response;
    });
  }

  get sortedMoviesByReview(): review[] {
    return this.reviews.sort((a, b) => b.id - a.id).slice(0, 15);
  }
}
