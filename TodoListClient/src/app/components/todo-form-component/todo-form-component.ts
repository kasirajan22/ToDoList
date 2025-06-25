import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-todo-form-component',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './todo-form-component.html',
  styleUrl: './todo-form-component.css'
})
export class TodoFormComponent {
  taskForm: FormGroup;
  editMode = false;
  taskId? : number;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description:['',Validators.required],
      isCompleted: [false] 
    })
  }
  hasError(controlName: string, errorName: string){
    const control = this.taskForm.get(controlName);
    return (control?.touched || control?.dirty) && control.hasError(errorName) || false;
  }
  onCancel(){
    this.router.navigate(['/tasks']);
  }
  onSubmit(){
    if(this.taskForm.valid){
      const formValue = this.taskForm.value;
      console.log(formValue)
    }
  }
}
