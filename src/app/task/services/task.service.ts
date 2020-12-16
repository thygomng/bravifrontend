import { environment } from './../../../environments/environment';
import { Task } from './../dto/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly baseUrl =  environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }

  public getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}${"gettasks"}`)
    .pipe(
      retry(1),
      catchError(erro => {
        return throwError(erro);
      })
    )
  }

  public getTaskById(id: number): Observable<Task>{
    return this.http.get<Task>(`${this.baseUrl}${id}`)
    .pipe(
      retry(1),
      catchError(erro => {
        return throwError(erro);
      })
    )
  }

  public createTask(task: Task): Observable<Task>{
    return this.http.post<Task>(`${this.baseUrl}`, task)
    .pipe(
      retry(1),
      catchError(erro => {
        return throwError(erro);
      })
    )
  }

  public updateTask(task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.baseUrl}`, task)
    .pipe(
      retry(1),
      catchError(erro => {
        return throwError(erro);
      })
    )
  }
}
