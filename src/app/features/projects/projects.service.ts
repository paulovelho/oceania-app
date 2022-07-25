import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { ProjectsApi } from './projects.api';
import { Toaster } from '@services/toaster/toaster.service';
import { Store } from '@services/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

	public projects: any[] = [];

	constructor(
		private ApiService: ProjectsApi,
		private Toaster: Toaster,
		private Store: Store,
	) { }

	@Output() onRefresh = new Subject<any[]>();

	public refreshList() {
		this.getAll()
			.then(data => {
				this.setProjectList(data);
				this.onRefresh.next(data);
			});
	}

	public setProjectList(ps: any[]): any[] {
		this.projects = [];
		ps.map(p => this.projects[p.id] = {
			id: p.id,
			name: p.name,
		});
		return this.projects;
	}
	public async getProjectList(): Promise<any> {
		if(this.projects.length > 0) return this.projects;
		let projs = await this.getAll();
		return this.setProjectList(projs);
	}

	public async getAll(): Promise<any> {
		return this.ApiService
			.GetProjects()
			.toPromise()
			.then(rs => {
				if(rs.success) return rs.data;
			});
	}

	public save(data: any): Promise<any> {
		data.active = data.active == true ? 1 : 0;
		if (data.id) {
			return this.update(data);
		} else {
			return this.create(data);
		}
	}

	public create(data: any): Promise<any> {
		return this.ApiService
			.CreateProject(data)
			.toPromise()
			.then(rs => {
				console.info('ApiService-create', rs);
				this.refreshList();
				return rs;
			});
	}

	public update(data: any): Promise<any> {
		const id = data.id;
		if(!id) return Promise.reject('invalid id');
		return this.ApiService
			.UpdateProject(id, data)
			.toPromise()
			.then(rs => {
				console.info('ApiService-update', rs);
				this.refreshList();
				return rs;
			});
	}

	public storeProject(data: any): Promise<any> {
		return this.Store.set('main-project', { 
			id: data.id,
			name: data.name || '...',
		});
	}
	public getStoredProject(): Promise<any> {
		return this.Store.get('main-project');
	}
	public clearStoredProject(): void {
		this.Store.remove('main-project');
	}

}