import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, MemberNavbarComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  user: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const userToken = localStorage.getItem('token');
      if (userToken) {
        this.userService.getUserProfile(userToken).subscribe(
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
}
