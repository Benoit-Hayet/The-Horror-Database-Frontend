import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { AdminNavbarComponent } from '../../Admin/admin-navbar/admin-navbar.component';
import { movieCards } from '../../model/movieCards.model';
import { ReviewService } from '../../../services/review.service';
import { AuthService } from '../../../services/auth.service';
import { MovieService } from '../../../services/movie.service';


@Component({
  selector: 'app-my-add-movie',
  standalone: true,
  imports: [CommonModule, MemberNavbarComponent, AdminNavbarComponent],
  templateUrl: './my-add-movie.component.html',
  styleUrl: './my-add-movie.component.scss',
})
export class MyAddMovieComponent implements OnInit {
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
      //const userId = decodedToken.id;

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
