import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardsReviewComponent } from '../../Component/movie-cards-review/movie-cards-review.component';
import { MovieCardsComponent } from '../../Component/movie-cards/movie-cards.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardsReviewComponent,MovieCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  home: string = 'assets/Home.png';
}
