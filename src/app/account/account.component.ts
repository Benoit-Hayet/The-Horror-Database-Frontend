import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule,MemberNavbarComponent,AdminNavbarComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  user: any;
  isAdmin: boolean = false;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    const decodedToken = this.authService.getDecodedToken();
    console.log(decodedToken);

    if (decodedToken) {
      // Vérifiez si le rôle contient "ROLE_ADMIN"
      this.isAdmin = decodedToken.roles.some((role: any) => role.authority === 'ROLE_ADMIN');
      console.log('Is Admin:', this.isAdmin);

      // Récupération du profil utilisateur
      this.userService.getUserProfile().subscribe(
        (data) => {
          this.user = data;
          console.log(this.user);
        },
        (error) => {
          console.error('Erreur lors de la récupération des données utilisateur', error);
        }
      );
    } else {
      console.error('Aucun token trouvé');
    }
  }
}
