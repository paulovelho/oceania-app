import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Toaster } from '@services/toaster/toaster.service';
import { NavigationService } from '@services/navigation/navigation.service';
import { ProjectsService } from '../projects.service';

import { ProjectFormComponent } from '../project-form/project-form.component';

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
				console.info('got', data);
				this.loading = false;
				this.list = data;
			});
	}

	ngOnInit(): void {
		this.LoadList();
	}
	ngOnDestroy() {
		console.info('destroying subs');
		if(!this.subscription) return;
		this.subscription.unsubscribe();
	}

	private LoadList(): void {
		this.Service.refreshList();
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
