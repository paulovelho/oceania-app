import { Injectable, EventEmitter, Output } from '@angular/core';

import { ProjectsApi } from '@app/apis/projects.api';
import { Toaster } from '@services/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

	constructor(
		private ApiService: ProjectsApi,
	) { }

	@Output() onRefresh = new EventEmitter<Array<any>>();


	public refreshList() {
		this.getAll()
			.then(data => {
				this.onRefresh.emit(data);
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

	public create(data): Promise<any> {
		return this.ApiService
			.CreateProject(data)
			.toPromise()
			.then(rs => {
				console.info('ApiService-create', rs);
				this.refreshList();
				if(rs.success) return rs.data;
			});
	}

}
