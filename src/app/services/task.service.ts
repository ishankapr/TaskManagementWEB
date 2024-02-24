import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  addTask(data: Task): Observable<any>{
    debugger
    return this.httpClient.post(`${environment.apiUrl}/Task/tasks`,data);
  }

  getAllTasks(): Observable<Task[]>{
    return this.httpClient.get<Task[]>(`${environment.apiUrl}/Task/tasks`);
  }

  deleteTask(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${environment.apiUrl}/Task/tasks/${id}`);
  }

}
