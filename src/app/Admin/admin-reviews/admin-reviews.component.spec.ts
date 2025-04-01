import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReviewsComponent } from './admin-reviews.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminReviewsComponent', () => {
  let component: AdminReviewsComponent;
  let fixture: ComponentFixture<AdminReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AdminReviewsComponent],  // Ajout du composant dans imports
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
