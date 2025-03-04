import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAddMovieComponent } from './my-add-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MyAddMovieComponent', () => {
  let component: MyAddMovieComponent;
  let fixture: ComponentFixture<MyAddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MyAddMovieComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyAddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
