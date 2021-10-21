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

	public status: any = Status;

	public allTasks: any[] = [];
	public tasks: any[] = [];
	public subscription: any;

	public loading: boolean = true;

	public trello: any = [];
	public todo: any[] = [];
	public wip: any[] = [];
	public done: any[] = [];
	public allLists: any[] = [];

	public activitiesSelect: any[] | null = null;
	public projectsSelect: any[] | null = null;
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
		this.loading = true;
		this.tasks = this.allTasks;
		if (this.project_id) {
			this.tasks = this.tasks.filter(t => t.project_id == this.project_id);
		}
		if (this.activity_id) {
			this.tasks = this.tasks.filter(a => a.activity_id == this.activity_id);
		}
		this.taskStatus();
	}
	private getTasksWithId(id: number) {
		this.trello[id] = this.tasks.filter(t => t.status_id == id);
		this.allLists.push('list-'+id);
	}
	private taskStatus(): void {
		this.allLists = [];
		this.getTasksWithId(this.status['todo'].id);
		this.getTasksWithId(this.status['wip'].id);
		this.getTasksWithId(this.status['done'].id);
		this.loading = false;
	}

	public moveTaskAround(data: any) {
		const fromStatus = data.from;
		const toStatus = data.to;
		let task = data.task;
		task.loading = true;
		// remove from one list:
		this.trello[fromStatus.id] = this.trello[fromStatus.id].filter((t: any) => t.id != task.id);
		// and another to other:
		this.trello[toStatus.id].push(task);
		this.Service.changeStatus(task.id, toStatus.id)
			.then(data => {
				console.info('ok!');
				task.loading = false;
			});
	}

	public refresh(): void {
		this.loading = true;
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
