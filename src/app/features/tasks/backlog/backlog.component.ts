import { Component, OnInit } from '@angular/core';

import { TasksService } from '../tasks.service';
import { FilterData } from '../filters/filters.component';

import Status from '@app/status-list';

@Component({
	selector: 'app-backlog',
	templateUrl: './backlog.component.html',
	styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

	public status = Status;
	public loading: boolean = true;

	constructor(
	) {
	}

	ngOnInit(): void {
	}

}
