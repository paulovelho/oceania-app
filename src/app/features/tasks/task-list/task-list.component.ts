import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

	@Input() loading: boolean = false;
	@Input() statusIcon: string = "tasks";
	@Input() status: any = null;
	@Input() showAdd: boolean = false;
	@Input() allLists = [];
	@Input() tasks: any[] = [];
	@Output() taskChange: EventEmitter<any> = new EventEmitter();

	constructor(
		private Modal: NgbModal,
	) { }

	ngOnInit(): void {
	}

	public drop(el: any): void {
		console.info('dropped on: ' + this.status.name, el);
		const task = el.item.data;
		const listFrom = el.previousContainer.data;
		const listTo = this.status;
		if(listFrom.id == listTo.id) return;
		this.taskChange.emit({
			from: listFrom,
			to: listTo,
			task,
		});
	}

	public create(): void {
		let modalRef = this.Modal.open(TaskFormComponent);
		modalRef.componentInstance.status = this.status;
		modalRef.result.then((data: any) => {
			console.info('modal result: ', data);
		});
	}

}
