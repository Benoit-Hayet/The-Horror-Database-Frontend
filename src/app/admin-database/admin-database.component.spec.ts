import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importer le module HTTP de test
import { AdminDatabaseComponent } from './admin-database.component';

describe('AdminDatabaseComponent', () => {
  let component: AdminDatabaseComponent;
  let fixture: ComponentFixture<AdminDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDatabaseComponent, HttpClientTestingModule],  // Ajouter HttpClientTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
