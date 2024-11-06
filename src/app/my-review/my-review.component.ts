import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';


@Component({
  selector: 'app-my-review',
  standalone: true,
  imports: [CommonModule, MemberNavbarComponent],
  templateUrl: './my-review.component.html',
  styleUrl: './my-review.component.scss',
})
export class MyReviewComponent {
}
