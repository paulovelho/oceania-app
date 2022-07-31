import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SharedModule } from '@app/shared.module';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksDashboardComponent } from './tasks-dashboard/tasks-dashboard.component';
import { TasksHomeComponent } from './tasks-home/tasks-home.component';

import { TasksApi } from './tasks.api';
import { TasksService } from './tasks.service';
import { TaskCardComponent } from './task-card/task-card.component';
import { BulkAddComponent } from './bulk-add/bulk-add.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MatCardModule,
		DragDropModule,
		
		TasksRoutingModule,
		SharedModule,
	],
	declarations: [
		TaskFormComponent,
		TaskListComponent,
		TasksDashboardComponent,
		TasksHomeComponent,
		TaskCardComponent,
		BulkAddComponent,
	],
	providers: [
		TasksApi,
		TasksService,
	],
	entryComponents: [
		TaskFormComponent,
	],
})
export class TasksModule { }
