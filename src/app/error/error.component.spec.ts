import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);

import { HeaderUserComponent } from './header-user.component';

describe('HeaderUserComponent', () => {
  let component: HeaderUserComponent;
  let fixture: ComponentFixture<HeaderUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderUserComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}
