import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (route.data['userType'] === 'visitor') {
    if (!authService.isloggedin()) {
      return true;
    }
    router.navigate(['']);
    return false;
  }
  if (route.data['userType'] === 'user') {
    if (
      authService.isloggedin() &&
      authService
        .getDecodedToken()
        .roles.some((role: any) => role.authority === 'ROLE_USER')
    ) {
      router.navigate(['member-home']);
      return true;
    }
    return false;
  }
  if (route.data['userType'] === 'admin') {
    if (
      authService.isloggedin() &&
      authService
        .getDecodedToken()
        .roles.some((role: any) => role.authority === 'ROLE_ADMIN')
    ) {
      return true;
    }
    return false;
  }
  return false;
};
