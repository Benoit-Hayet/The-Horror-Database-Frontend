import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../api.service';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { review } from '../model/review.model';

@Component({
  selector: 'app-movie-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss'],
})
export class MovieReviewComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  apiService: ApiService = inject(ApiService);
  movieId!: number;
  movieDetails$!: Observable<any>;
  reviewDetailsId$!: Observable<review[]>;

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
}
