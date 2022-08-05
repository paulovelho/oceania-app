import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { AppState } from '@app/app.state';
import { FilterData } from './filters/filters.component';

import { ProjectsService } from '@app/features/projects/projects.service';
import { ActivitiesService } from '@app/features/activities/activities.service';
import { TasksApi } from './tasks.api';
import { Toaster } from '@services/toaster/toaster.service';

import Status from '@app/status-list';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

	public status: any[] = [];

	constructor(
		private AppState: AppState,
		private ApiService: TasksApi,
		private Activities: ActivitiesService,
		private Projects: ProjectsService,
	) {}

	public refreshTasks() {
		this.getAll()
			.then(data => {
				this.AppState.emit("tasks", data);
			});
	}

	public filterTasks(filter: FilterData, allTasks: any[]): any[] {
		let tasks = allTasks;
		if (filter.project_id) {
			tasks = tasks.filter(t => t.project_id == filter.project_id);
		}
		if (filter.activity_id) {
			tasks = tasks.filter(a => a.activity_id == filter.activity_id);
		}
		return tasks;
	}

	public async getAll(): Promise<any> {
		await this.loadStatus();
		let projects = await this.Projects.getProjectList();
		let activities = await this.Activities.getAllList();
		return this.ApiService
			.GetAll()
			.toPromise()
			.then(rs => {
				if(rs.success) {
					let tasks = rs.data;
					return tasks.map((t: any) => {
						t['status_name'] = this.status[t.status_id];
						t['project_name'] = projects[t.project_id] ? projects[t.project_id].name : '[project '+t.project_id+']';
						t['activity'] = activities[t.activity_id] ? activities[t.activity_id] : '???';
						return t;
					});
				}
			});
	}
	public async GetByStatus(status: any): Promise<any> {
		let projects = await this.Projects.getProjectList();
		let activities = await this.Activities.getAllList();
		return this.ApiService
			.GetByStatus(status.id)
			.toPromise()
			.then(rs => {
				if(rs.success) {
					let data = rs.data;
					let tasks = data.map((t: any) => {
						t['status_name'] = status.name;
						t['project_name'] = projects[t.project_id] ? projects[t.project_id].name : '[project '+t.project_id+']';
						t['activity'] = activities[t.activity_id] ? activities[t.activity_id] : '???';
						return t;
					});
					return tasks;
				}
			});
	}
	public GetBacklog(): Promise<any> {
		return this.GetByStatus(Status.backlog);
	}

	public save(data: any): Promise<any> {
		if (data.id) {
			return this.update(data);
		} else {
			return this.create(data);
		}
	}

	public create(data: any): Promise<any> {
		return this.ApiService
			.Create(data)
			.toPromise()
			.then(rs => {
				this.refreshTasks();
				return rs;
			});
	}

	public update(data: any): Promise<any> {
		const id = data.id;
		if(!id) return Promise.reject('invalid id');
		return this.ApiService
			.Update(id, data)
			.toPromise()
			.then(rs => {
				this.refreshTasks();
				return rs;
			});
	}

	public changeStatus(task_id: number, status_id: number): Promise<any> {
		return this.ApiService
			.UpdateStatus(task_id, status_id)
			.then(rs => {
				return rs;
			});
	}

	public async loadStatus() {
		if(this.status.length > 0) return this.status;
		this.status = [];
		Object.values(Status).map(s => {
			this.status[s.id] = s.name;
		});
		return this.status;
	}

	public addBulk(project_id: number, activity_id: number, tasks: string): Promise<any> {
		return this.ApiService	
			.addBulk(project_id, activity_id, tasks)
			.toPromise()
			.then(rs => {
				this.refreshTasks();
				return rs.data;
			});
	}

}
