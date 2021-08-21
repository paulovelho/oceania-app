import { Component, Input, OnInit } from '@angular/core';

import { ProjectsService } from '../projects.service';
import { Toaster } from '@services/toaster/toaster.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

	@Input() modal: boolean = true;
	@Input() project: any = { active: true };

	public title: string = "New Project";
	public loading: boolean = false;
	public name: string = '';

	constructor(
		private activeModal: NgbActiveModal,
		private Toaster: Toaster,
		private Service: ProjectsService,
	) { }

	ngOnInit(): void {
		if (this.project.id) {
			this.title = "Edit Project";
		}
	}

	public async save() {
		this.loading = true;
		this.Service.save(this.project)
			.then(rs => {
				this.loading = false;
				if (rs.success) {
					this.close();
				} else {
					const data = rs.data;
					this.Toaster.error(data.msg);
				}
			})
			.catch(err => {
				console.error("err: ", err);
			});
	}

	public close() {
		this.activeModal.close();
	}

}
