import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

// Author: Chris

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
        dob: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
        pwConfirm: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
      },
      { validators: passwordConfirmValidatior }
    );
  }

  createUser() {
    if (this.registerForm.invalid) {
      //Checks if the user actually fill out the form
      alert('Please fill out the form properly');
      return;
    }
    var form_data = new FormData();
    form_data.append('name', this.registerForm.controls['name'].value);
    form_data.append('phone', this.registerForm.controls['phone'].value);
    form_data.append('dob', this.registerForm.controls['dob'].value);
    form_data.append('username', this.registerForm.controls['username'].value);
    form_data.append('email', this.registerForm.controls['email'].value);
    form_data.append('password', this.registerForm.controls['password'].value);

    this._authService.register(form_data).subscribe((data: any) => {
      this.router.navigate(['/login']);
      return;
    });
  }
}
export const passwordConfirmValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('pwConfirm');

  return password?.value === confirmPassword?.value
    ? null
    : { notmatched: true };
};
