import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
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
export class FavoriteMovieComponent implements OnInit {
  favoriteMovieCards: favorite[] = [];
  isAdmin: boolean = false;

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private movieService: MovieService,
  ) {}

  ngOnInit() {
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      this.isAdmin = decodedToken.roles.some(
        (role: any) => role.authority === 'ROLE_ADMIN',
      );

      this.favoriteService.getFavoritesByUserId().subscribe((response) => {
        console.log(response);
        this.favoriteMovieCards = response;
      });
    }
  }

  deleteFavorite(Id: number): void {
    this.favoriteService.removeFavorite(Id).subscribe({
      next: () => {
        this.favoriteMovieCards = this.favoriteMovieCards.filter(
          (favoriteMovieCards) => favoriteMovieCards.id !== Id,
        );
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du favois :', err);
      },
    });
  }
}
