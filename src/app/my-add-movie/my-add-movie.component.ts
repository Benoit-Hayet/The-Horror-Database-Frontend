import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';

@Component({
  selector: 'app-my-add-movie',
  standalone: true,
  imports: [CommonModule,MemberNavbarComponent],
  templateUrl: './my-add-movie.component.html',
  styleUrl: './my-add-movie.component.scss'
})
export class MyAddMovieComponent {

}
