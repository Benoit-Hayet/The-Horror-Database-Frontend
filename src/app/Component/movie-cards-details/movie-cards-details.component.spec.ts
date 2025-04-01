import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieCardsDetailsComponent } from './movie-cards-details.component';

describe('MovieCardsDetailsComponent', () => {
  let component: MovieCardsDetailsComponent;
  let fixture: ComponentFixture<MovieCardsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardsDetailsComponent, HttpClientTestingModule], // Ajout de HttpClientTestingModule ici
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
