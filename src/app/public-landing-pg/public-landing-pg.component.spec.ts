import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLandingPgComponent } from './public-landing-pg.component';

describe('PublicLandingPgComponent', () => {
  let component: PublicLandingPgComponent;
  let fixture: ComponentFixture<PublicLandingPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicLandingPgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicLandingPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
