import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { ReviewService } from '../../services/review.service';
import { review } from '../model/review.model';
import { CommonModule } from '@angular/common';

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
        console.log(`Critique avec l'ID ${reviewId} supprimée.`);
        // Met à jour la liste des critiques localement après suppression
        this.review = this.review.filter(
          (review) => review.id !== reviewId,
        );
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la critique :', err);
      },
    });
  }
}
