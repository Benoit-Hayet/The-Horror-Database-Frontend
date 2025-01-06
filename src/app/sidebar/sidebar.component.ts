import { Component, EventEmitter, Output } from '@angular/core';
import { country } from '../model/country.model';
import { countries } from '../data/country.data';
import { CommonModule } from '@angular/common';
import { movieCards } from '../model/movieCards.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  movieCards: movieCards[] = [];
  countryMap: country[] = countries;

  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() coutryToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() orderByTitleChange:EventEmitter<'asc'> = new EventEmitter<'asc'>();
  

  showMoviesByGenre(genre: string): void {
    this.notifyParent.emit(genre);
  }
  sortByTitle(): void {
    this.orderByTitleChange.emit();
  }
  showMoviesByCountry(country: string): void {
    console.log(country);
    this.coutryToParent.emit(country);
  }
  /*J'ai retiré 'asc' de emit test */
}

