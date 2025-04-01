import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { ActivatedRoute } from '@angular/router'; // Assure-toi que ActivatedRoute est bien importé
import { of } from 'rxjs';

class ActivatedRouteStub {
  snapshot = { paramMap: { get: () => '1' } };
}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },  // Ajouter un stub pour ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
