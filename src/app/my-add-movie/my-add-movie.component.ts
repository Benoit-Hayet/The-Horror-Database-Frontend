import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ReviewService } from '../../services/review.service';
import { review } from '../model/review.model';
import { movieCards } from '../model/movieCards.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-my-add-movie',
  standalone: true,
  imports: [CommonModule, MemberNavbarComponent],
  templateUrl: './my-add-movie.component.html',
  styleUrl: './my-add-movie.component.scss',
})
export class MyAddMovieComponent {
  addedMovieCards: movieCards[] = [];
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private reviewService: ReviewService, private authService: AuthService, private movieService: MovieService) {}

  ngOnInit() {
    const decodedToken = this.authService.getDecodedToken(); // Récupérer le token décodé
    if (decodedToken) {
      const userId = decodedToken.id; // Utiliser l'ID de l'utilisateur décodé à partir du token
      this.movieService.getAddedMoviesByUserId().subscribe((response) => {
        console.log(response);
        this.addedMovieCards = response; // Assigner les films récupérés à la variable
      });
    }
  }
}
