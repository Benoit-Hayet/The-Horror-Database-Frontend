import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';

@Component({
  selector: 'app-favorite-movie',
  standalone: true,
  imports: [CommonModule,MemberNavbarComponent],
  templateUrl: './favorite-movie.component.html',
  styleUrl: './favorite-movie.component.scss'
})
export class FavoriteMovieComponent {

}
