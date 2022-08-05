import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksHomeComponent } from './tasks-home/tasks-home.component';
import { BacklogComponent } from './backlog/backlog.component';

const routes: Routes = [
	{
		path: '',
		component: TasksHomeComponent,
	},
	{
		path: 'backlog',
		component: BacklogComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
