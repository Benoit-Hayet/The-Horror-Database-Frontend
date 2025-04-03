/*import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MyAddMovieComponent } from './my-add-movie.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // Pour simuler un observable

describe('MyAddMovieComponent', () => {
  let component: MyAddMovieComponent;
  let fixture: ComponentFixture<MyAddMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyAddMovieComponent],  // Utilise imports au lieu de declarations
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } },  // Simule les paramètres de la route
            queryParams: of({})  // Simule les queryParams si nécessaire
          }
        }
      ]
    });

    fixture = TestBed.createComponent(MyAddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/
