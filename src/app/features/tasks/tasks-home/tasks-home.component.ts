import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
	selector: 'app-tasks-home',
	templateUrl: './tasks-home.component.html',
	styleUrls: ['./tasks-home.component.scss']
})
export class TasksHomeComponent implements OnInit {

	constructor(
		private Modal: NgbModal,
	) { }

	ngOnInit(): void {
	}

	public addTask(): void {
		this.Modal
			.open(TaskFormComponent)
			.result
			.then((data: any) => {
				console.info('modal result: ', data);
			});
	}

}
