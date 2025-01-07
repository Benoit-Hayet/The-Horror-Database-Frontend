import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MovieCardsDetailsComponent } from '../movie-cards-details/movie-cards-details.component';

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

  handleGenre(genre: string) {
    this.genreClicked = genre;
  }
  handleYear(event: { start: string; end: string }) {
    const { start, end } = event;
    this.yearClicked = { start: +start, end: +end }; // Convertit les années en nombres
  }
  
  handleCountry(country: any) {
    this.countryClicked = country;
  }
  orderByTitleChange(order: 'asc') {
    this.orderByTitle = order;
  }
}
