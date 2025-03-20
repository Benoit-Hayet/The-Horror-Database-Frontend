import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importer le module de test HttpClient

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';

class ActivatedRouteStub {
  snapshot = { paramMap: { get: () => '1' } };
}

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountComponent, HttpClientTestingModule],  // Ajouter HttpClientTestingModule ici
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },  // Si nécessaire, ajouter un stub pour ActivatedRoute
        UserService, // Ajouter UserService pour qu'il puisse être injecté
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
