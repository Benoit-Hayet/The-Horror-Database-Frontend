import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';

@Component({
  selector: 'app-admin-add-movie',
  standalone: true,
  imports: [AdminNavbarComponent,MemberNavbarComponent],
  templateUrl: './admin-add-movie.component.html',
  styleUrl: './admin-add-movie.component.scss'
})
export class AdminAddMovieComponent {

}
