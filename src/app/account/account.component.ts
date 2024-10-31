import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule,MemberNavbarComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

}
