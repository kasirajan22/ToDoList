import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-component',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    },{
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(fb:FormGroup){
    return fb.get('password')?.value === fb.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit(){
    
  }
}
