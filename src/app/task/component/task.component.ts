import { TaskService } from './../services/task.service';
import { Task } from './../dto/task';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TaskStatusEnum } from '../dto/taskStatusEnum';

@Component({
  selector: 'app-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  
  constructor(private service: TaskService, 
              private formBuilder: FormBuilder, 
              private router: Router,
              private activeRouter: ActivatedRoute) { }
  
  public tasksForm: FormGroup;
  private formSubmitAttempt: boolean;
  private idTask: string;
  persistedTask: Task;
  disableStatus: boolean = false;
  statusList: string[] = [];

  ngOnInit(): void {
    this.tasksForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      initialDate: ['', Validators.required],
      finalDate: ['', Validators.required],
      status: [''],
      timeSpended: ['']
    });

    this.statusList = Object.values(TaskStatusEnum);

    this.activeRouter.paramMap.subscribe(params => {
      this.idTask = params.get('id');
      if(this.idTask != null){
        this.service.getTaskById(Number(this.idTask)).subscribe(data =>{
           this.persistedTask = data;
           let statusT = TaskStatusEnum[data.status];
           this.tasksForm.patchValue({
            title: data.title,
            description: data.description,
            initialDate: data.initialDate,
            finalDate: data.finalDate,
            timeSpended: data.taskSpendTime,
            status: statusT
           });      
        }, error => {
          Swal.fire({icon: 'error', title: 'Error', text: 'Erro to load task detail'});
         });

      }
    });
    
  }

  public submitCreateUpdate(){
    if(this.tasksForm.valid){
      let task = new Task(this.idTask === null ? null : Number(this.idTask), 
                          this.tasksForm.get('initialDate').value == "" ? null : this.tasksForm.get('initialDate').value, 
                          this.tasksForm.get('finalDate').value  == "" ? null : this.tasksForm.get('finalDate').value,
                          this.tasksForm.get('status').value == "" ? null : this.tasksForm.get('status').value,
                          this.tasksForm.get('title').value == "" ? null : this.tasksForm.get('title').value, 
                          this.tasksForm.get('description').value == "" ? null : this.tasksForm.get('description').value,
                          this.tasksForm.get('timeSpended').value == "" ? null : this.tasksForm.get('timeSpended').value);
      
      if(task.finalDate < task.initialDate) {
        Swal.fire({icon: 'warning', title: 'Atention', text: 'Final date cannot be less than initial date'});
      }else{
        if(this.idTask != null){
          this.service.updateTask(task).subscribe(data => {
            this.formSubmitAttempt = true;
            this.persistedTask = data;
            Swal.fire({icon: 'success', title: 'Success', text: 'Task successfully updated'});
          }, err=>{
            Swal.fire({icon: 'error', title: 'Error', text: 'Erro to update a task'});
          });
        }else {
          task.status = TaskStatusEnum.OPEN;
          this.service.createTask(task).subscribe(data => {
            this.formSubmitAttempt = true;
            this.persistedTask = data;
            Swal.fire({icon: 'success', title: 'Success', text: 'Task successfully created'});
          }, err=>{
            Swal.fire({icon: 'error', title: 'Error', text: 'Erro to save a new task'});
          });
        }
      }                   

    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.tasksForm.get(field).valid && this.tasksForm.get(field).touched) ||
      (this.tasksForm.get(field).untouched && this.formSubmitAttempt)
      );
  }

  convertDateTimes(date: Date): Date{
    let UTCDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() ) - date.getTimezoneOffset();

    return  new Date(UTCDate);
  }

  public backToList(){
    this.router.navigate(['task/list']);
  }

}
