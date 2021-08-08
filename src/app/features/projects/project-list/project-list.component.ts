import { Component, OnInit } from '@angular/core';

import { ProjectsService } from '../projects.service';

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {

	public projects: Array<any> = [];
	public loading: boolean = false;

	constructor(
		private Service: ProjectsService,
	) { }

	ngOnInit() {
		this.loading = true;
		this.Service.onRefresh.subscribe(data => {
				console.info('got', data);
			this.loading = false;
			this.projects = data;
		});
		this.Service.refreshList();
	}

}
