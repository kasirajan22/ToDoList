import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-signup-component',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    },{
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(fb:FormGroup){
    return fb.get('password')?.value === fb.get('confirmPassword')?.value ? null : { confirmPasswordNotMatching: true };
  }
  hasError(controlName: string, errorName: string){
    const control = this.signupForm.get(controlName);
    return (control?.touched || control?.dirty) && control.hasError(errorName) || false;
  }
  onSubmit(){
    this.errorMessage = null;
    console.log("Form submitted - ", this.signupForm.value);
    if(this.signupForm.valid){
      const signup = this.signupForm.value;
      this.authService.register(signup).subscribe({
        next:(resp) => {
          this.router.navigate(['/tasks']);
        },
        error:(err) =>{
          console.log("Error - ", err);
          this.errorMessage = "An error occurred while registering. Please try again later.";
        }
      })
    }
  }
}
