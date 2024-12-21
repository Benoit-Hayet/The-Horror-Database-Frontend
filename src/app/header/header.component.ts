import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);

logo: string ="assets/Logo.gif";
user:string="assets/User.png";

isLoggedOk():  boolean {
  return (this.authService.isLoggedIn()); 
}

readToken() : void {
console.log(this.authService.getToken());
}

logOut(): void {
  return (this.authService.cleartoken());
}

isLogged(): void {
console.log(this.authService.isLoggedIn());
}
whoIsLogged(): void {
  console.log(this.authService.getDecodedToken());
}
getRole(): void {
  console.log(this.authService.getUserRole());
}


}

