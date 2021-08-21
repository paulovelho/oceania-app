import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { ProjectsApi } from './projects.api';
import { Toaster } from '@services/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

	constructor(
		private ApiService: ProjectsApi,
	) { }

	@Output() onRefresh = new Subject<any[]>();

	public refreshList() {
		this.getAll()
			.then(data => {
				console.info('refresh list', data);
				this.onRefresh.next(data);
			});
	}

	public getAll(): Promise<any> {
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

}