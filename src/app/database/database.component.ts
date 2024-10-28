import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MovieCardsDetailsComponent } from '../movie-cards-details/movie-cards-details.component';


@Component({
  selector: 'app-database',
  standalone: true,
  imports: [CommonModule,SidebarComponent,MovieCardsDetailsComponent],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})
export class DatabaseComponent {

}



