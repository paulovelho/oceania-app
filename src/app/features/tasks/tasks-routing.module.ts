import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksHomeComponent } from './tasks-home/tasks-home.component';

const routes: Routes = [
	{
		path: '',
		component: TasksHomeComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
