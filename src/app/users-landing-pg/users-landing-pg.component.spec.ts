import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLandingPgComponent } from './users-landing-pg.component';

describe('UsersLandingPgComponent', () => {
  let component: UsersLandingPgComponent;
  let fixture: ComponentFixture<UsersLandingPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersLandingPgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersLandingPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
