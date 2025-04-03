import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import du module de test pour HttpClient
import { DatabaseComponent } from './database.component';
import { ActivatedRoute } from '@angular/router';

describe('DatabaseComponent', () => {
  let component: DatabaseComponent;
  let fixture: ComponentFixture<DatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DatabaseComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 123 } } }  // Mock des params de l'ActivatedRoute
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
