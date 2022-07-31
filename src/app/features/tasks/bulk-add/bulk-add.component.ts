import { Component, OnInit, Input } from '@angular/core';

import { Toaster } from '@services/toaster/toaster.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TasksService } from '../tasks.service';
import { ActivitiesService } from '@app/features/activities/activities.service';

@Component({
	selector: 'app-bulk-add',
	templateUrl: './bulk-add.component.html',
	styleUrls: ['./bulk-add.component.scss']
})
export class BulkAddComponent implements OnInit {

	@Input() modal: boolean = true;
	@Input() project: any;
	@Input() activity_id: any;

	public activities: any[] = [];
	public tasks: string = "";

	public loading: boolean = false;
	public hideSyntax: boolean = true;

	constructor(
		private activeModal: NgbActiveModal,
		private Toaster: Toaster,
		private ActivitiesService: ActivitiesService,
		private Service: TasksService,
	) { }

	ngOnInit(): void {
		this.loadActivities();
	}

	private loadActivities(): void {
		this.ActivitiesService.getAllList()
			.then(data => {
				this.activities = data.filter((a: any) => a != null);
				if(!this.activity_id) {
					this.ActivitiesService
						.getStoredActivity()
						.then(a => this.activity_id = a.id);
				}
			});
	}

	public addBulk() {
		this.Service
			.addBulk(this.project.id, this.activity_id, this.tasks)
			.then(tasks => {
				console.info('added', tasks);
				tasks.map((t: any) => {
					this.Toaster.success(t.task + ' ['+t.hours_estimation+' h]');
					this.close();
				});
			});
	}

	public close() {
		this.activeModal.close();
	}

}
