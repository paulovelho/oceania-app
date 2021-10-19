import { Component, OnInit } from '@angular/core';

import { TasksService } from '../tasks.service';
import { ActivitiesService } from '@app/features/activities/activities.service';
import { ProjectsService } from '@app/features/projects/projects.service';
import Status from '@app/status-list';

@Component({
	selector: 'app-tasks-dashboard',
	templateUrl: './tasks-dashboard.component.html',
	styleUrls: ['./tasks-dashboard.component.scss']
})
export class TasksDashboardComponent implements OnInit {

	public allTasks: any[] = [];
	public tasks: any[] = [];
	public loading: boolean = true;
	public subscription: any;

	public todo: any[] = [];
	public wip: any[] = [];
	public done: any[] = [];

	public status: any = Status;
	public activitiesSelect: any[] = [];
	public projectsSelect: any[] = [];
	public project_id: any = null;
	public activity_id: any = null;

	constructor(
		private ActivitiesService: ActivitiesService,
		private ProjectsService: ProjectsService,
		private Service: TasksService,
	) {
		this.subscription = this.Service
			.tasksLoaded
			.subscribe((data: any) => {
				console.info('loaded tasks got response: ', data);
				this.allTasks = data;
				this.filterTasks();
			});
	}

	ngOnInit(): void {
		this.buildFilters();
		this.refresh();
	}

	public filterTasks(): void {
		this.tasks = this.allTasks;
		if (this.project_id) {
			console.info('filtering proj ', this.project_id);
			this.tasks = this.tasks.filter(t => t.project_id == this.project_id);
		}
		if (this.activity_id) {
			this.tasks = this.tasks.filter(a => a.activity_id == this.activity_id);
		}
		console.info('filtered tasks ', this.tasks);
		this.taskStatus();
	}
	private taskStatus(): void {
		this.todo = this.tasks.filter(t => t.status_id == this.status['todo'].id);
		this.wip = this.tasks.filter(t => t.status_id == this.status['wip'].id);
		this.done = this.tasks.filter(t => t.status_id == this.status['done'].id);
	}

	public refresh(): void {
		this.Service.refreshTasks();
	}

	public async buildFilters(): Promise<any> {
		this.ActivitiesService.getAllList()
			.then(data => {
				this.activitiesSelect = data.filter((a: any) => a != null);
			});
		this.ProjectsService.getProjectList()
			.then(data => {
				this.projectsSelect = data.filter((p: any) => p!= null);
			});
	}
	public clearFilters(): void {
		this.project_id = null;
		this.activity_id = null;
		this.filterTasks();
	}

}
