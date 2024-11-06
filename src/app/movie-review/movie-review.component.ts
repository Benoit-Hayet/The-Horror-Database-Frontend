import { ActivatedRoute, ParamMap } from "@angular/router";
import { ApiService } from "../api.service";
import { Component, inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-movie-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss']
})
export class MovieReviewComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  apiService: ApiService = inject(ApiService);
  movieId!: number;
  movieDetails$!: Observable<any>;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const movieIdParam = params.get('movieId');
      this.movieId = movieIdParam !== null ? parseInt(movieIdParam, 10) : 0;

      // Appel API pour récupérer les détails du film
      if (this.movieId) {
        this.movieDetails$ = this.apiService.getMoviesById(this.movieId);
      }
    });
  }
}
