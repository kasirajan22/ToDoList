import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
private apiUrl = 'http://localhost:5210/';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + 'api/tasks');
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}api/task/${id}`);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl + 'api/task', task);
  }
  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}api/task/${task.id}`, task);
  }
  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}api/task/${id}`);
  }
}
