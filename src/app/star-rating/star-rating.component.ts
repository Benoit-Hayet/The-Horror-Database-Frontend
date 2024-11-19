import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  stars: number[] = [1, 2, 3, 4, 5];
  currentRating = 0; // La note sélectionnée
  hoverRatingState = 0; // État au survol

  // Méthode appelée lors du clic sur une étoile
  selectRating(rating: number) {
    this.currentRating = rating;
  }

  // Méthode appelée au survol des étoiles
  hoverRating(rating: number) {
    this.hoverRatingState = rating;
  }

  // Méthode appelée pour envoyer la note
  submitRating() {
    // Appelez votre service pour envoyer `this.currentRating` à votre API
    console.log('Note publiée :', this.currentRating);
  }
}
