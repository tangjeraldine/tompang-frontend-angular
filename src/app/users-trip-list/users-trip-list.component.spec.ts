import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTripListComponent } from './users-trip-list.component';

describe('UsersTripListComponent', () => {
  let component: UsersTripListComponent;
  let fixture: ComponentFixture<UsersTripListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTripListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
