import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNavbarComponent } from './member-navbar.component';
import { ActivatedRoute } from '@angular/router';

describe('MemberNavbarComponent', () => {
  let component: MemberNavbarComponent;
  let fixture: ComponentFixture<MemberNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberNavbarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 123 } } }  // Mock des params de l'ActivatedRoute
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
