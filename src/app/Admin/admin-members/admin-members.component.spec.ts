import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import du module de test pour HttpClient
import { AdminMembersComponent } from './admin-members.component';

describe('AdminMembersComponent', () => {
  let component: AdminMembersComponent;
  let fixture: ComponentFixture<AdminMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AdminMembersComponent], // Ajout d'HttpClientTestingModule dans les imports
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
