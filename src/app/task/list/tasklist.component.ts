import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from './../services/task.service';
import { Task } from './../dto/task';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  
  constructor(private service: TaskService, private formBuilder: FormBuilder, private router: Router) { }
  
  public listTasksForm: FormGroup;
  private listTasks: any[] = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  displayedColumns: string[] = ['Tittle', 'Description', 'Init Date', 'End Date', 'Status', 'actions'];
  dataSource: any;

  ngOnInit(): void {
    this.listTasksForm = this.formBuilder.group({
      title: [''],
      description: [''],
      initialDate: [''],
      finalDate: [''],
      status: ['']
    });

    this.service.getTasks().subscribe(t => {
      if(t != null){
        t.forEach(task => {
          this.listTasks.push(task);
        })
        this.setDataTableConfigs(this.listTasks);
      }
    }, erro => {
      Swal.fire({icon: 'error', title: 'Error', text: 'Erro to load task list'});
    });
  }

  private setDataTableConfigs(data: any){
    this.dataSource = new MatTableDataSource<Task>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  createTask(){
    this.router.navigate(['task/create']);
  }

  editTask(id: number){
    this.router.navigate(['task/edit', id]);
  }

  deleteTask(id: number){
    
  }

}