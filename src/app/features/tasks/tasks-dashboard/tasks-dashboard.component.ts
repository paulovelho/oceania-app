import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TasksService } from '../tasks.service';
import { ActivitiesService } from '@app/features/activities/activities.service';
import { ProjectsService } from '@app/features/projects/projects.service';
import Status from '@app/status-list';

import { BulkAddComponent } from '../bulk-add/bulk-add.component';

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
	public project: any = null;
	public activity_id: any = null;
	public showBulkTasks: boolean = false;

	constructor(
		private Modal: NgbModal,
		private ActivitiesService: ActivitiesService,
		private ProjectsService: ProjectsService,
		private Service: TasksService,
	) {
		this.subscription = this.Service
			.tasksLoaded
			.subscribe((data: any) => {
//				console.info('loaded tasks got response: ', data);
				this.allTasks = data;
				this.filterTasks();
			});
	}

	ngOnInit(): void {
		this.buildFilters();
		this.refresh();
	}

	public addBulkTasks(): void {
		console.info('bulktask');
		let modalRef = this.Modal.open(BulkAddComponent, { windowClass: 'modal-large' });
		modalRef.componentInstance.project = this.project;
		modalRef.componentInstance.activity_id = this.activity_id;
	}

	public filterTasks(): void {
		this.loading = true;
		this.tasks = this.allTasks;
		this.showBulkTasks = false;
		if (this.project) {
			this.showBulkTasks = true;
			this.ProjectsService.storeProject({ id: this.project.id, name: this.project.name });
			this.tasks = this.tasks.filter(t => t.project_id == this.project.id);
		}
		if (this.activity_id) {
			this.ActivitiesService.storeActivity({ id: this.activity_id });
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
				this.ActivitiesService.getStoredActivity()
					.then(a => this.activity_id = a.id);
			});
		this.ProjectsService.getProjectList()
			.then(data => {
				this.projectsSelect = data.filter((p: any) => p!= null);
				this.ProjectsService.getStoredProject()
					.then(p => {
						this.project = { id: p?.id, name: p?.name };
					});
			});
	}
	public compareProjects(o1: any, o2: any): boolean {
		return o1.id === o2.id;
	}
	public clearFilters(): void {
		this.project = null;
		this.activity_id = null;
		this.ProjectsService.clearStoredProject();
		this.ActivitiesService.clearStoredActivity();
		this.filterTasks();
	}

}
