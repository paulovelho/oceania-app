import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Toaster } from '@services/toaster/toaster.service';
import { NavigationService } from '@services/navigation/navigation.service';
import { ProjectsService } from '../projects.service';

import { ProjectFormComponent } from '../project-form/project-form.component';
import { BulkAddComponent } from '@app/features/tasks/bulk-add/bulk-add.component';

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

	public list: Array<any> = [];
	public loading: boolean = true;
	private subscription: any;

	constructor(
		private Modal: NgbModal,
		private Navigation: NavigationService,
		private Toaster: Toaster,
		private Service: ProjectsService,
	){
		this.subscription = this.Service
			.onRefresh
			.subscribe((data: any) => {
				this.loading = false;
				this.list = data;
			});
	}

	ngOnInit(): void {
		this.LoadList();
	}
	ngOnDestroy() {
		if(!this.subscription) return;
		this.subscription.unsubscribe();
	}

	private LoadList(): void {
		this.Service.refreshList();
	}

	public bulkAdd(project: any): void {
		console.info('bulk add for ', project);
		let modalRef = this.Modal.open(BulkAddComponent, { windowClass: 'modal-large' });
		let { id, name } = project;
		modalRef.componentInstance.project = { id, name };		
	}

	public reload() {
		this.loading = true;
		this.Service.refreshList();
	}

	public create() {
		this.Modal
			.open(ProjectFormComponent)
			.result
			.then((data) => {
				this.reload();
			});
	}

	public openItem(p: any) {
		let modalRef = this.Modal.open(ProjectFormComponent);
		modalRef.componentInstance.project = p;
	}

}
