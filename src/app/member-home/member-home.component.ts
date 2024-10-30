import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';

@Component({
  selector: 'app-member-home',
  standalone: true,
  imports: [CommonModule,MemberNavbarComponent],
  templateUrl: './member-home.component.html',
  styleUrl: './member-home.component.scss'
})
export class MemberHomeComponent {

}
