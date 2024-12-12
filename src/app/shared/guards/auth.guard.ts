import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Fonction pour vérifier les rôles
  const checkRole = (role: string) => {
    const decodedToken = authService.getDecodedToken();
    return decodedToken && decodedToken.roles.some((r: any) => r.authority === role);
  };

  if (route.data['userType'] === 'visitor') {
    if (!authService.isloggedin()) {
      return true;
    }
    router.navigate(['']);
    return false;
  }

  if (route.data['userType'] === 'user') {
    if (authService.isloggedin() && checkRole('ROLE_USER')) {
      router.navigate(['member-home']);
      return true;
    }
    return false;
  }

  if (route.data['userType'] === 'admin') {
    if (authService.isloggedin() && checkRole('ROLE_ADMIN')) {
      return true;
    }
    return false;
  }

  return false;
};
