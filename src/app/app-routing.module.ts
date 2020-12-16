import { TasklistComponent } from './task/list/tasklist.component';
import { TaskComponent } from './task/component/task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'task/create', component: TaskComponent},
  {path: 'task/edit/:id', component: TaskComponent},
  {path: 'task/list', component: TasklistComponent},
  {path: '**', redirectTo: 'task/list'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
