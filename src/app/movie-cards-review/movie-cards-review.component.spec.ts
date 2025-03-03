import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardsReviewComponent } from './movie-cards-review.component';

describe('MovieCardsReviewComponent', () => {
  let component: MovieCardsReviewComponent;
  let fixture: ComponentFixture<MovieCardsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardsReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
