import { AuthGuard } from './auth.guard';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Création du spy pour le service AuthService
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getUserId']);
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

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  // Ajoutez d'autres tests si nécessaire
});
