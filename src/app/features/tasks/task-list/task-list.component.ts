import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

	@Input() statusIcon: string = "tasks";
	@Input() status: any = null;
	@Input() showAdd: boolean = false;
	@Input() tasks: any[] = [];

	constructor(
		private Modal: NgbModal,
	) { }


  ngOnInit(): void {
  }

  public create(): void {
		let modalRef = this.Modal.open(TaskFormComponent);
		modalRef.componentInstance.status = this.status;
		modalRef.result.then((data: any) => {
			console.info('modal result: ', data);
		});
  }

}
