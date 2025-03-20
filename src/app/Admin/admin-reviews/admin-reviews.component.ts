import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { review } from '../../model/review.model';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule],
  templateUrl: './admin-reviews.component.html',
  styleUrl: './admin-reviews.component.scss',
})
export class AdminReviewsComponent implements OnInit {
  review: review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviewService.getAllReviews().subscribe((response) => {
      this.review = response;
    });
  }
  deleteReview(reviewId: number): void {
    this.reviewService.deleteReview(reviewId).subscribe({
      next: () => {
        this.review = this.review.filter(
          (review) => review.id !== reviewId,
        );
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la critique :', error);
      },
    });
  }
}
