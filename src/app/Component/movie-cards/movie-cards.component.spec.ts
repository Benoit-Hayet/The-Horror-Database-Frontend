import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Ajoute HttpClientTestingModule
import { MovieCardsComponent } from './movie-cards.component';

describe('MovieCardsComponent', () => {
  let component: MovieCardsComponent;
  let fixture: ComponentFixture<MovieCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardsComponent, HttpClientTestingModule],  // Ajoute HttpClientTestingModule ici
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
