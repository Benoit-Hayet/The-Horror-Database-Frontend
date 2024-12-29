import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { review } from '../model/review.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-movie-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss'],
})
export class MovieReviewComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  apiService: ApiService = inject(ApiService);
  authService: AuthService = inject(AuthService);
  movieId!: number;
  movieDetails$!: Observable<any>;
  reviewDetailsId$!: Observable<review[]>;
  reviewService: ReviewService = inject(ReviewService);
  
  

  stars: number[] = [1, 2, 3, 4, 5];
  currentRating = 0;
  hoverRatingState = 0;

  formBuilder = inject(FormBuilder);

  reviewForm = this.formBuilder.group({
    review: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(1)]],
    movieId: [this.movieId]
  });
  
  onSubmit() {
    if (this.reviewForm.valid) {
      // Extraire et garantir que les valeurs sont définies
      const review = this.reviewForm.value.review || ''; // Valeur par défaut si null
      const rating = this.reviewForm.value.rating || 1;  // Valeur par défaut si null
      const movieId = this.reviewForm.value.movieId || this.movieId; // Utiliser `this.movieId` si null
  
      this.reviewService.addReview(review, rating, movieId).subscribe(
        (response: any) => {
          console.log('Review OK', response);
        },
        (error: Error) => {
          console.error('Erreur lors de l\'ajout de la critique', error);
        }
      );
    }
  }
  
  isLoggedOk():  boolean {
    return (this.authService.isLoggedIn()); 
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const movieIdParam = params.get('movieIdPath');
      this.movieId = movieIdParam !== null ? parseInt(movieIdParam, 10) : 0;
  
      if (this.movieId) {
        // Charger les détails du film
        this.movieDetails$ = this.apiService.getMoviesById(this.movieId);
        this.reviewDetailsId$ = this.apiService.getReviewsByMovieId(this.movieId);
  
        // Mettre à jour le formulaire avec le movieId
        this.reviewForm.patchValue({ movieId: this.movieId });
      }
    });
  }
  

  // Méthode appelée lors du clic sur une étoile
  selectRating(rating: number) {
    this.currentRating = rating;
    this.reviewForm.patchValue({ rating });
  }

  // Méthode appelée au survol des étoiles
  hoverRating(rating: number) {
    this.hoverRatingState = rating;
  }

}
