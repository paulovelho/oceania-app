import { Component, Input, OnInit } from '@angular/core';

import { TasksService } from '../tasks.service';
import { FilterData } from '../filters/filters.component';

import { AppState } from '@app/app.state';
import Status from '@app/status-list';

@Component({
	selector: 'app-tasks-by-status',
	templateUrl: './tasks-by-status.component.html',
	styleUrls: ['./tasks-by-status.component.scss']
})
export class TasksByStatusComponent implements OnInit {

	@Input() status: any = 0;
	@Input() showAdd: boolean = false;

	public subscription: any;
	public tasks: any[] = [];
	private allTasks: any[] = [];
	public loading: boolean = false;

	constructor(
		private AppState: AppState,
		private Service: TasksService,
	) {
	}

	ngOnInit(): void {
		this.AppState.subscribe('filter-refresh', () => this.loadTasks());
		this.AppState.subscribe('filter-updated', (filter: FilterData) => this.filter(filter));
		this.loadTasks();
	}

	private loadTasks(): void {
		this.loading = true;
		this.Service.GetByStatus(this.status)
			.then(t => {
				this.loading = false;
				this.allTasks = t;
				this.filter(this.AppState.getState('filter-updated') as FilterData);
			});
	}

	private filter(filter: FilterData): void {
		this.tasks = this.Service.filterTasks(filter, this.allTasks);
	}


}
