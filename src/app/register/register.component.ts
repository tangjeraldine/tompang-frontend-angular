import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

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
      'phone':new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      'DOB':new FormControl('', [Validators.required,Validators.minLength(10)]),
      'uName':new FormControl('', [Validators.required,Validators.minLength(10)]),
      'email':new FormControl('', [Validators.required,Validators.email]),
      'pw':new FormControl('', [Validators.required,Validators.minLength(10)]),
      'pwConfirm':new FormControl('', [Validators.required,Validators.minLength(10)])

    })
  }


  createUser(){
    //console.log(this.addUserForm.value)
  }
}
