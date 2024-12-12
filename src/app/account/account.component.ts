import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, MemberNavbarComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  user: any;

  constructor(private userService: UserService, private authService: AuthService) {}


  ngOnInit() {
      const decodedToken = this.authService.getDecodedToken();
      console.log(decodedToken)
      if (decodedToken) {
        this.userService.getUserProfile(decodedToken.sub).subscribe(
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
