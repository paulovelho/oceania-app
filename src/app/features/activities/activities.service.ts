import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { ActivitiesApi } from './activities.api';
import { Toaster } from '@services/toaster/toaster.service';
import { Store } from '@services/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

	private activities: any[] = [];

	constructor(
		private ApiService: ActivitiesApi,
		private Store: Store,
	) { }

	@Output() onRefresh = new Subject<any[]>();

	public refreshList() {
		this.getAll()
			.then(data => {
				this.onRefresh.next(data);
			});
	}

	public setActivitiesList(acts: any[]): any[] {
		this.activities = [];
		acts.map(act => this.activities[act.id] = {
			id: act.id,
			name: act.name,
			value: act.value,
			fixed: act.fixed == 1,
		});
		return this.activities;
	}
	public async getAllList(): Promise<any> {
		if (this.activities.length > 0) return this.activities;
		let acts = await this.getAll();
		return this.setActivitiesList(acts);
	}

	public async getAll(): Promise<any> {
		return this.ApiService
			.GetAll()
			.toPromise()
			.then(rs => {
				if(rs.success) {
					this.activities = rs.data;
					return rs.data;
				}
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
				this.activities = [];
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
				this.activities = [];
				this.refreshList();
				return rs;
			});
	}

	public storeActivity(data: any): Promise<any> {
		return this.Store.set('main-activity', { 
			id: data.id,
			name: data.name || '...',
		});
	}
	public getStoredActivity(): Promise<any> {
		return this.Store.get('main-activity');
	}
	public clearStoredActivity(): void {
		this.Store.remove('main-activity');
	}

}
