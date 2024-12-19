import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { review } from '../model/review.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  stars: number[] = [1, 2, 3, 4, 5];
  currentRating = 0;
  hoverRatingState = 0;

  formBuilder = inject(FormBuilder);

  reviewForm = this.formBuilder.group({
    review: [''],
    rating:[this.currentRating],

  });
  onSubmit() {
    console.log(this.reviewForm.value);
  }
  isLoggedOk():  boolean {
    return (this.authService.isLoggedIn()); 
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const movieIdParam = params.get('movieIdPath');
      this.movieId = movieIdParam !== null ? parseInt(movieIdParam, 10) : 0;
      if (this.movieId) {
        this.movieDetails$ = this.apiService.getMoviesById(this.movieId);
        this.reviewDetailsId$ = this.apiService.getReviewsByMovieId(
          this.movieId,
        );
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
