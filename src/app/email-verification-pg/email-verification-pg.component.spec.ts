import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationPgComponent } from './email-verification-pg.component';

describe('EmailVerificationPgComponent', () => {
  let component: EmailVerificationPgComponent;
  let fixture: ComponentFixture<EmailVerificationPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVerificationPgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVerificationPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
