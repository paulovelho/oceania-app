import { Component, Input, OnInit } from '@angular/core';

import { ActivitiesService } from '../activities.service';

import { Toaster } from '@services/toaster/toaster.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-activities-form',
	templateUrl: './activities-form.component.html',
	styleUrls: ['./activities-form.component.scss']
})
export class ActivitiesFormComponent implements OnInit {

	@Input() modal: boolean = true;
	@Input() activity: any = { hour: true };

	public title: string = "New Activity";
	public loading: boolean = false;

	constructor(
		private activeModal: NgbActiveModal,
		private Toaster: Toaster,
		private Service: ActivitiesService,
	) { }

	ngOnInit(): void {
		if (this.activity.id) {
			this.title = "Edit Activity";
			this.activity.hour = this.activity.fixed == 0;
		}
	}

	public async save() {
		this.loading = true;
		this.activity.fixed = this.activity.hour ? 0 : 1;
		this.Service.save(this.activity)
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
