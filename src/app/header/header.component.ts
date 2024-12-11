import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService);

logo: string ="assets/Logo.gif";
user:string="assets/User.png";

isLogged(): void {
console.log(this.authService.isloggedin());
}
whoIsLogged(): void {
  console.log(this.authService.getDecodedToken());
}
}

