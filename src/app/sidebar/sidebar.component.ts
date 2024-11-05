import { Component, EventEmitter, Output } from '@angular/core';
import { country } from '../model/country.model';
import { countries } from '../data/country.data';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { movieCards } from '../model/movieCards.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  movieCards: movieCards[] = [];
  countryMap: country[] = countries;

  @Output() notifyParent: EventEmitter<string> = new EventEmitter<string>();
  

  showMoviesByGenre(genre: string): void {
    this.notifyParent.emit(genre);
  }
}

