import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';

@Component({
  selector: 'app-admin-members',
  standalone: true,
  imports: [AdminNavbarComponent,MemberNavbarComponent],
  templateUrl: './admin-members.component.html',
  styleUrl: './admin-members.component.scss'
})
export class AdminMembersComponent {

}
