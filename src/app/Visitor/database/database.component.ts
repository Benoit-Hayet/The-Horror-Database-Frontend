import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardsDetailsComponent } from '../../Component/movie-cards-details/movie-cards-details.component';
import { SidebarComponent } from '../../Component/sidebar/sidebar.component';

@Component({
  selector: 'app-database',
  standalone: true,
  imports: [CommonModule, SidebarComponent, MovieCardsDetailsComponent],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss',
})
export class DatabaseComponent {
  genreClicked: string = '';
  yearClicked: { start: number; end: number } | null = null;
  countryClicked: string = '';
  orderByTitle: 'asc' = 'asc';
  orderByRating: 'asc' = 'asc';

  handleGenre(genre: string) {
    this.genreClicked = genre;
  }
  handleYear(event: { start: string; end: string }) {
    const { start, end } = event;
    this.yearClicked = { start: +start, end: +end };
  }

  handleCountry(country: string): void {
    console.log(country);
    this.countryClicked = country;
  }

  orderByTitleChange(order: 'asc') {
    console.log('Tri reçu :', order);
    this.orderByTitle = order;
  }

  orderByRatingChange(order: 'asc') {
    this.orderByRating = order;
  }
}
