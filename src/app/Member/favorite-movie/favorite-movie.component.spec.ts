import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importer le module de test HTTP
import { FavoriteMovieComponent } from './favorite-movie.component';

describe('FavoriteMovieComponent', () => {
  let component: FavoriteMovieComponent;
  let fixture: ComponentFixture<FavoriteMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteMovieComponent, HttpClientTestingModule],  // Ajouter HttpClientTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
