import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{
  registerForm:FormGroup= new FormGroup({})

  constructor(private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      'fName':new FormControl('', [Validators.required,Validators.minLength(10)]),
      'phone':new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      'DOB':new FormControl('', [Validators.required,Validators.minLength(10)]),
      'uName':new FormControl('', [Validators.required,Validators.minLength(10)]),
      'email':new FormControl('', [Validators.required,Validators.email]),
      'pw':new FormControl('', [Validators.required,Validators.minLength(10)]),
      'pwConfirm':new FormControl('', [Validators.required,Validators.minLength(10)])
    }, { validators: passwordConfirmValidatior })
  }


  createUser(){
    if (this.registerForm.invalid) {  //Checks if the user actually fill out the form
      alert("Please fill out the form properly")
      return;
     }
    alert("Working")

  }
}
export const passwordConfirmValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('pw');
  const confirmPassword = control.get('pwConfirm');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};