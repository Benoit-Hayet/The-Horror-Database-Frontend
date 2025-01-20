import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [AdminNavbarComponent,MemberNavbarComponent],
  templateUrl: './admin-reviews.component.html',
  styleUrl: './admin-reviews.component.scss'
})
export class AdminReviewsComponent {

}
