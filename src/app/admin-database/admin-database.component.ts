import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { movieCards } from '../model/movieCards.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-database',
  standalone: true,
  imports: [AdminNavbarComponent,MemberNavbarComponent,CommonModule],
  templateUrl: './admin-database.component.html',
  styleUrl: './admin-database.component.scss'
})
export class AdminDatabaseComponent {
  movieCards : movieCards[] =  [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllMovies().subscribe((response) => {
      this.movieCards = response;
    });
  }

  get sortedMoviesById() : movieCards [] {
    return this.movieCards.sort((a, b) => b.id - a.id).slice(0, 15);
}
}
