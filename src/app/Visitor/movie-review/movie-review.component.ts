import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { review } from '../../model/review.model';
import { ReviewService } from '../../../services/review.service';


@Component({
  selector: 'app-movie-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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
    movieId: [this.movieId],
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const movieIdParam = params.get('movieIdPath');
      this.movieId = movieIdParam !== null ? parseInt(movieIdParam, 10) : 0;

      if (this.movieId) {
        // Charger les détails du film
        this.movieDetails$ = this.apiService.getMoviesById(this.movieId);
        this.reviewDetailsId$ = this.apiService.getReviewsByMovieId(
          this.movieId,
        );

        // Mettre à jour le formulaire avec le movieId
        this.reviewForm.patchValue({ movieId: this.movieId });
      }
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const review = this.reviewForm.value.review || '';
      const rating = this.reviewForm.value.rating || 1;
      const movieId = this.reviewForm.value.movieId || this.movieId;

      this.reviewService.addReview(review, rating, movieId).subscribe(
        (response: any) => {
          console.log('Review OK', response);

          // Recharger les données
          this.movieDetails$ = this.apiService.getMoviesById(this.movieId);
          this.reviewDetailsId$ = this.apiService.getReviewsByMovieId(
            this.movieId,
          );

          // Réinitialiser le formulaire
          this.reviewForm.reset({
            review: '',
            rating: 0,
            movieId: this.movieId,
          });
        },
        (error: Error) => {
          console.error("Erreur lors de l'ajout de la critique", error);
        },
      );
    }
  }

  isLoggedOk(): boolean {
    return this.authService.isLoggedIn();
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
