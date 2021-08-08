import { Component, OnInit } from '@angular/core';

import { ProjectsService } from '../projects.service';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {

	public project: any = {};

	constructor(
		private Service: ProjectsService,
	) { }

	ngOnInit() {}

	public save() {
		if(!this.project.name) {
			return;
		}
		console.info("saving", this.project);
		this.Service.create(this.project);
	}

}
