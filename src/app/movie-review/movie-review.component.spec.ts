import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieReviewComponent } from './movie-review.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('MovieReviewComponent', () => {
  let component: MovieReviewComponent;
  let fixture: ComponentFixture<MovieReviewComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let reviewServiceSpy: jasmine.SpyObj<ReviewService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Création des spies pour les services
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getMoviesById', 'getReviewsByMovieId']);
    reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['addReview']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    // Simulation des valeurs renvoyées par les services
    apiServiceSpy.getMoviesById.and.returnValue(of({ id: 1, title: 'Test Movie' }));
    apiServiceSpy.getReviewsByMovieId.and.returnValue(of([]));
    authServiceSpy.isLoggedIn.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [MovieReviewComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ReviewService, useValue: reviewServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => '1' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
