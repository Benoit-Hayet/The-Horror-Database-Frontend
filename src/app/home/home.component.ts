import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { MovieCardsComponent } from '../movie-cards/movie-cards.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MovieCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  home: string ="assets/Home.png";
}
