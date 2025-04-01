import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAddMovieComponent } from './admin-add-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminAddMovieComponent', () => {
  let component: AdminAddMovieComponent;
  let fixture: ComponentFixture<AdminAddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddMovieComponent,HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});