import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { ActivitiesApi } from './activities.api';
import { Toaster } from '@services/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

	constructor(
		private ApiService: ActivitiesApi,
	) { }

	@Output() onRefresh = new Subject<any[]>();

	public refreshList() {
		this.getAll()
			.then(data => {
				this.onRefresh.next(data);
			});
	}

	public getAll(): Promise<any> {
		return this.ApiService
			.GetAll()
			.toPromise()
			.then(rs => {
				console.info('got: ', rs);
				if(rs.success) return rs.data;
			});
	}

	public save(data: any): Promise<any> {
		if (data.id) {
			return this.update(data);
		} else {
			return this.create(data);
		}
	}

	public create(data: any): Promise<any> {
		return this.ApiService
			.Create(data)
			.toPromise()
			.then(rs => {
				this.refreshList();
				return rs;
			});
	}

	public update(data: any): Promise<any> {
		const id = data.id;
		if(!id) return Promise.reject('invalid id');
		return this.ApiService
			.Update(id, data)
			.toPromise()
			.then(rs => {
				this.refreshList();
				return rs;
			});
	}


}
