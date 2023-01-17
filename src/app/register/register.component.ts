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
      'fName':new FormControl('', [Validators.required,Validators.minLength(10)])

    })
  }

  createUser(){
    //console.log(this.addUserForm.value)
  }
}
