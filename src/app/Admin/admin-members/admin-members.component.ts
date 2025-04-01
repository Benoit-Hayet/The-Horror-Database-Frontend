import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../model/user.model';


@Component({
  selector: 'app-admin-members',
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule],
  templateUrl: './admin-members.component.html',
  styleUrl: './admin-members.component.scss',
})
export class AdminMembersComponent implements OnInit {
  user: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((response) => {
      this.user = response;
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

  get sortedUserById(): User[] {
    return [...this.user].sort((a, b) => b.id - a.id).slice(0, 15);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.user = this.user.filter((user) => user.id !== userId);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du membre :', err);
      },
    });
  }
}
