import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  // Fonction pour vérifier les rôles
  private checkRole(role: string): boolean {
    const decodedToken = this.authService.getDecodedToken();
    return (
      decodedToken &&
      decodedToken.roles &&
      decodedToken.roles.some((r: any) => r.authority === role)
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot
  ): boolean {
    const userType = route.data['userType'];

    if (userType === 'visitor') {
      if (!this.authService.isLoggedIn()) {
        return true;
      }
      this.router.navigate(['']);
      return false;
    }

    if (userType === 'user') {
      if (this.authService.isLoggedIn() && (this.checkRole('ROLE_ADMIN')|| this.checkRole('ROLE_USER'))) {
        return true;
      }
      this.router.navigate(['']);
      return false;
    }

    if (userType === 'admin') {
      if (this.authService.isLoggedIn() && this.checkRole('ROLE_ADMIN')) {
        return true;
      }
      this.router.navigate(['']);
      return false;
    }

    return false;
  }
}
