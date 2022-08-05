import { Injectable } from '@angular/core';

import { TasksService } from './tasks.service';
import { AppState } from '@app/app.state';

@Injectable({
	providedIn: 'root'
})
export class TrelloService {

	public allLists: any = {};
	public trello: any = [];

	constructor(
		private AppState: AppState,
		private Service: TasksService,
	) { }

	public Init(): void {
	}

	public moveTaskAround(data: any): Promise<any> {
		const toStatus = data.newStatus;
		let task = data.task;
		task.loading = true;
		return this.Service.changeStatus(task.id, toStatus.id)
			.then((data: any) => {
				task.loading = false;
				return data;
			});
	}


}
