import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { review } from '../model/review.model';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-my-review',
  standalone: true,
  imports: [CommonModule, MemberNavbarComponent, AdminNavbarComponent,FormsModule],
  templateUrl: './my-review.component.html',
  styleUrl: './my-review.component.scss',
})
export class MyReviewComponent {
  reviewMovieCards: review[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  isAdmin: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const decodedToken = this.authService.getDecodedToken(); // Convertir en nombre
    if (decodedToken) {
      const userId = decodedToken.id;

      this.isAdmin = decodedToken.roles.some(
        (role: any) => role.authority === 'ROLE_ADMIN',
      );

      this.reviewService.getReviewsByUserId().subscribe((response) => {
        console.log(response); // Vérifiez si la réponse est bien reçue
        this.reviewMovieCards = response;
      });
    }
  }

  updateReview(review: review, newRating: string): void {
    const updatedReview = { ...review, review: review.review }; // La nouvelle critique est déjà dans review.review
  
    this.reviewService.updateReview(updatedReview).subscribe({
      next: (response) => {
        console.log('Mise à jour réussie :', response);
  
        this.reviewMovieCards = this.reviewMovieCards.map((m) =>
          m.id === updatedReview.id ? response : m
        );
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour :', error);
      },
    });
  }


  deleteReview(reviewId: number): void {
    this.reviewService.deleteReview(reviewId).subscribe({
      next: () => {
        console.log(`Critique avec l'ID ${reviewId} supprimée.`);
        // Met à jour la liste des critiques localement après suppression
        this.reviewMovieCards = this.reviewMovieCards.filter(
          (review) => review.id !== reviewId,
        );
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la critique :', err);
      },
    });
  }
}
