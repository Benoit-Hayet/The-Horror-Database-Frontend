import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Création du spy pour le service AuthService
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    // Création du spy pour le Router
    router = jasmine.createSpyObj('Router', ['navigate']);

    // Configuration du TestBed
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    // Injection de l'authGuard
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should allow access if the user is logged in', () => {
    // Mock de la réponse de isLoggedIn
    authService.isLoggedIn.and.returnValue(true);

    const mockRoute = {} as ActivatedRouteSnapshot;

    const result = authGuard.canActivate(mockRoute);
    expect(result).toBeTrue();
  });

  it('should redirect to login if the user is not logged in', () => {
    // Mock de la réponse de isLoggedIn
    authService.isLoggedIn.and.returnValue(false);

    const mockRoute = {} as ActivatedRouteSnapshot;

    const result = authGuard.canActivate(mockRoute);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
