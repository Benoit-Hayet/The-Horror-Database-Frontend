import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { review } from '../model/review.model';

@Component({
  selector: 'app-favorite-movie',
  standalone: true,
  imports: [CommonModule, MemberNavbarComponent],
  templateUrl: './favorite-movie.component.html',
  styleUrls: ['./favorite-movie.component.scss']
})
export class FavoriteMovieComponent {
}
