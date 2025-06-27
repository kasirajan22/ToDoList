import { Component } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-component',
  imports: [CommonModule],
  templateUrl: './todo-list-component.html',
  styleUrl: './todo-list-component.css'
})
export class TodoListComponent {

  taskList: Task[] = [];

  constructor(private taskService: TaskService, private router: Router){

  }
  ngOnInit(): void {
    this.loadTasks();
  }
    loadTasks(): void{
      this.taskService.getAll().subscribe((data) => {
        this.taskList = data;
        console.log('getall - ', data);

      })
    }

    editTransaction(task: Task):void{
      if(task.id){
        this.router.navigate(['/edit', task.id]);
      }
    }
    deleteTransaction(task: Task):void{

    }
}
