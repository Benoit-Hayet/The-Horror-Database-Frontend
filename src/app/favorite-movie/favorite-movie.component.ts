import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { FavoriteService } from '../../services/favorite.service';
import { MovieService } from '../../services/movie.service';
import { favorite } from '../model/favorite.model';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-favorite-movie',
  standalone: true,
  imports: [CommonModule, MemberNavbarComponent, AdminNavbarComponent],
  templateUrl: './favorite-movie.component.html',
  styleUrls: ['./favorite-movie.component.scss'],
})
export class FavoriteMovieComponent {
  favoriteMovieCards: favorite[] = [];
  isAdmin: boolean = false;

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private movieService: MovieService,
  ) {}

  ngOnInit() {
    const decodedToken = this.authService.getDecodedToken(); // Récupérer le token décodé
    if (decodedToken) {
      const userId = decodedToken.id;

      this.isAdmin = decodedToken.roles.some(
        (role: any) => role.authority === 'ROLE_ADMIN',
      );

      this.favoriteService.getFavoritesByUserId().subscribe((response) => {
        console.log(response);
        this.favoriteMovieCards = response;
      });
    }
  }
}
