import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Toaster } from '@services/toaster/toaster.service';
import { NavigationService } from '@services/navigation/navigation.service';
import { ActivitiesService } from '../activities.service';

import { ActivitiesFormComponent } from '../activities-form/activities-form.component';

@Component({
	selector: 'app-activities-list',
	templateUrl: './activities-list.component.html',
	styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {

	public list: Array<any> = [];
	public loading: boolean = true;
	private subscription: any;

	constructor(
		private Modal: NgbModal,
		private Navigation: NavigationService,
		private Toaster: Toaster,
		private Service: ActivitiesService,
	) {
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
	ngOnDestroy(): void {
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
			.open(ActivitiesFormComponent)
			.result
			.then((data) => {
				this.reload();
			});
	}

	public openItem(m: any) {
		let modalRef = this.Modal.open(ActivitiesFormComponent);
		modalRef.componentInstance.activity = m;
	}

}
