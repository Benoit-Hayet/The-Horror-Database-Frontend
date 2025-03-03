import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { User } from '../model/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-members',
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule],
  templateUrl: './admin-members.component.html',
  styleUrl: './admin-members.component.scss',
})
export class AdminMembersComponent implements OnInit {
  member: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((response) => {
      this.member = response;
    });
  }

  formatRole(role: string | string[]): string {
    if (Array.isArray(role)) {
      role = role[0];
    }

    const roleMap: { [key: string]: string } = {
      ROLE_ADMIN: 'Admin',
      ROLE_USER: 'User',
    };

    return roleMap[role] || role;
  }

  get sortedMemberById(): User[] {
    return this.member.sort((a, b) => b.id - a.id).slice(0, 15);
  }
}
