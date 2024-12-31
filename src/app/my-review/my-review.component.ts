import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { review } from '../model/review.model';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-my-review',
  standalone: true,
  imports: [CommonModule, MemberNavbarComponent],
  templateUrl:'./my-review.component.html',
  styleUrl: './my-review.component.scss',
})
export class MyReviewComponent {

  favoriteMovieCards: review[] = [];
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private reviewService: ReviewService, private authService: AuthService) {}

  ngOnInit() {
    const decodedToken = this.authService.getDecodedToken(); // Convertir en nombre
    if (decodedToken) {
      const userId = decodedToken.id;

      this.reviewService.getReviewsByUserId().subscribe((response) => {
        console.log(response);  // Vérifiez si la réponse est bien reçue
        this.favoriteMovieCards = response;
      });
  }
  }}
