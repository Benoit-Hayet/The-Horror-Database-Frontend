import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule,MemberNavbarComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  user: any;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    const decodedToken = this.authService.getDecodedToken();
    console.log(decodedToken);
  
    if (decodedToken) {
      // Récupérer l'ID de l'utilisateur à partir du token décodé
      const userId = decodedToken.id; // Assurez-vous que 'id' est bien présent dans le token JWT

      // Appel correct avec l'ID de l'utilisateur
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
