import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersWithSameDestinationComponent } from './list-users-with-same-destination.component';

describe('ListUsersWithSameDestinationComponent', () => {
  let component: ListUsersWithSameDestinationComponent;
  let fixture: ComponentFixture<ListUsersWithSameDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsersWithSameDestinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsersWithSameDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
