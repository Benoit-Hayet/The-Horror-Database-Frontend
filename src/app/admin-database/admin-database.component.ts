import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';

@Component({
  selector: 'app-admin-database',
  standalone: true,
  imports: [AdminNavbarComponent,MemberNavbarComponent],
  templateUrl: './admin-database.component.html',
  styleUrl: './admin-database.component.scss'
})
export class AdminDatabaseComponent {

}
