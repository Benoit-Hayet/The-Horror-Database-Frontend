import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { movieCards } from '../model/movieCards.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-add-movie',
  standalone: true,
  imports: [AdminNavbarComponent,MemberNavbarComponent,CommonModule,RouterLink],
  templateUrl: './admin-add-movie.component.html',
  styleUrl: './admin-add-movie.component.scss'
})
export class AdminAddMovieComponent {
  movieCards : movieCards[] =  [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllMovies().subscribe((response) => {
      this.movieCards = response.filter((movie : any) => movie.status === "PENDING" );
    });
  }

  get sortedMoviesById() : movieCards [] {
    return this.movieCards.sort((a, b) => b.id - a.id).slice(0, 15);
}}

