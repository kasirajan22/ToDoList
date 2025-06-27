import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-todo-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form-component.html',
  styleUrl: './todo-form-component.css'
})
export class TodoFormComponent {
  taskForm: FormGroup;
  editMode = false;
  taskId?: number;

  constructor(private fb: FormBuilder, private activatedRouter: ActivatedRoute, private router: Router,
    private authService: AuthService, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      isCompleted: [false]
    })
  }

  ngOnInit(): void {
    const type = this.taskForm.get('type')?.value;

    const id = this.activatedRouter.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.taskId = +id;
      this.loadTask(this.taskId);
    }
  }
  loadTask(id: number): void {
    this.taskService.getById(id).subscribe({
      next: (task) => {
        console.log('edit value - ', task);
        this.taskForm.patchValue(task);
      }
    })
  }
  hasError(controlName: string, errorName: string) {
    const control = this.taskForm.get(controlName);
    return (control?.touched || control?.dirty) && control.hasError(errorName) || false;
  }
  onCancel() {
    this.router.navigate(['/tasks']);
  }
  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      console.log(formValue);
      if (this.editMode && this.taskId) {
        this.taskService.update(this.taskId, formValue).subscribe({
          next: (resp) => {
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            console.log("Error Updating Task - ", err);
          }
        })
      }
      else {
        this.taskService.create(formValue).subscribe({
          next: (resp) => {
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            console.log("Error Adding Task - ", err);
          }
        })
      }
    }
  }
}
