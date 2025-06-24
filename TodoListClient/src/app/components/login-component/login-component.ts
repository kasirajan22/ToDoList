import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  constructor(private fb: FormBuilder, private authServie: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

  hasError(controlName: string, errorName: string): boolean{
    const control = this.loginForm.get(controlName);
    return (control?.touched || control?.dirty) && control.hasError(errorName) || false;
  }

  onSubmit(){
    this.errorMessage = null;
    if(this.loginForm.valid){
      const login = this.loginForm.value;
      this.authServie.loging(login).subscribe({
        next: (resp) => {
          this.router.navigate(['/tasks']);
        }, 
        error: (err) => {
          console.log("Error -",err);
          console.log(err.message)
          this.errorMessage = err.message || "Invalid Email or Password";
          this.loginForm.markAllAsTouched(); // Force update of the view
        }
      })
    }
  }
}
