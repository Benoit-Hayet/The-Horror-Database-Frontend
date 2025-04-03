import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import du module de test pour HttpClient
import { MyReviewComponent } from './my-review.component';
import { ActivatedRoute } from '@angular/router';

describe('MyReviewComponent', () => {
  let component: MyReviewComponent;
  let fixture: ComponentFixture<MyReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MyReviewComponent], // Ajout de HttpClientTestingModule ici
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 123 } } }  // Mock des params de l'ActivatedRoute
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
