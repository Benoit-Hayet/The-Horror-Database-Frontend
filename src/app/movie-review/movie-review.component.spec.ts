import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieReviewComponent } from './movie-review.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';  // Import de CommonModule si nécessaire
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Création du stub pour ActivatedRoute
class ActivatedRouteStub {
  // Simule un paramètre de route si nécessaire
  snapshot = { paramMap: { get: () => '1' } };
}

describe('MovieReviewComponent', () => {
  let component: MovieReviewComponent;
  let fixture: ComponentFixture<MovieReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieReviewComponent, HttpClientTestingModule, CommonModule],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },  // Fournir le stub pour ActivatedRoute
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
