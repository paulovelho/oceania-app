import { Component, OnInit } from '@angular/core';

import { AppState } from '@app/app.state';
import { TasksService } from '../tasks.service';
import { FilterData } from '../filters/filters.component';
import Status from '@app/status-list';

@Component({
	selector: 'app-tasks-dashboard',
	templateUrl: './tasks-dashboard.component.html',
	styleUrls: ['./tasks-dashboard.component.scss']
})
export class TasksDashboardComponent implements OnInit {

	public status: any = Status;

	constructor(
		private AppState: AppState,
		private Service: TasksService,
	) {
	}

	ngOnInit(): void {
	}

}
