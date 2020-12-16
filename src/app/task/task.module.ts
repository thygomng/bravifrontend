import { AppMaterialModule } from './../ang-material/app-material.module';
import { TaskComponent } from './component/task.component';
import { TaskService } from './services/task.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TasklistComponent } from './list/tasklist.component';




@NgModule({
  declarations: [TaskComponent, TasklistComponent],
  imports: [
    CommonModule,
    //AppMaterialModule,
    ReactiveFormsModule,
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ],
  providers:[
    TaskService,
  ]
})
export class TaskModule { }
