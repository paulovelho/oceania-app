import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

	@Input() task: any;

	public showHours: boolean = false;

	constructor(
		private Modal: NgbModal,
	) { }

	ngOnInit(): void {
		this.Initialize();
	}

	public Initialize() {
		this.showHours = !(this.task?.activity?.fixed);
	}

	public editTask(): void {
		let modalRef = this.Modal.open(TaskFormComponent, { windowClass: 'modal-large' });
		modalRef.componentInstance.task = this.task;
		modalRef.result?.then((t: any) => {
			if(t) {
				this.task = t;
				this.Initialize();
			}
		});
	}

}
