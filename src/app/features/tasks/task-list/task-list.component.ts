import { Component, Input, EventEmitter, OnInit, OnChanges, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

import { TaskFormComponent } from '../task-form/task-form.component';
import { TrelloService } from '../trello.service';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

	@Input() loading: boolean = false;
	@Input() status: any = null;
	@Input() showAdd: boolean = false;

	@Input() tasks: any[] = [];

	constructor(
		private Modal: NgbModal,
		public Trello: TrelloService,
	) { }

	ngOnInit(): void {
	}

	public drop(event: CdkDragDrop<any>): void {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
			return;
		}
		const task = event.item.data;
		transferArrayItem (
			event.previousContainer.data,
			event.container.data,
			event.previousIndex,
			event.currentIndex,
		);
		this.Trello.moveTaskAround({
			newStatus: this.status,
			task,
		}).then((data: any) => {
			console.info('task moved ', data);
		});
	}

	public create(): void {
		let modalRef = this.Modal.open(TaskFormComponent, { windowClass: 'modal-large' });
		modalRef.componentInstance.status = this.status;
		modalRef.result?.then((data: any) => {
			console.info('modal result: ', data);
		});
	}

}
