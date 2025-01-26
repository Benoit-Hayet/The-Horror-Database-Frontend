import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from '../../services/review.service';
import { movieCards } from '../model/movieCards.model';
import { MovieService } from '../../services/movie.service';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-my-add-movie',
  standalone: true,
  imports: [CommonModule, MemberNavbarComponent, AdminNavbarComponent],
  templateUrl: './my-add-movie.component.html',
  styleUrl: './my-add-movie.component.scss',
})
export class MyAddMovieComponent {
  addedMovieCards: movieCards[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  isAdmin: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private movieService: MovieService,
  ) {}

  ngOnInit() {
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      const userId = decodedToken.id;

      this.isAdmin = decodedToken.roles.some(
        (role: any) => role.authority === 'ROLE_ADMIN',
      );

      this.movieService.getAddedMoviesByUserId().subscribe((response) => {
        console.log(response);
        this.addedMovieCards = response; // Assigner les films récupérés à la variable
      });
    }
  }
}
