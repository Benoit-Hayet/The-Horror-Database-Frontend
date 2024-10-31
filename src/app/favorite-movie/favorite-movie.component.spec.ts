import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMovieComponent } from './favorite-movie.component';

describe('FavoriteMovieComponent', () => {
  let component: FavoriteMovieComponent;
  let fixture: ComponentFixture<FavoriteMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
