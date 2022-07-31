import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { ClientsApi } from './clients.api';
import { Toaster } from '@services/toaster/toaster.service';
import { Store } from '@services/store/store.service';

@Injectable({
	providedIn: 'root'
})
export class ClientsService {

	constructor(
		private ApiService: ClientsApi,
		private Toaster: Toaster,
		private Store: Store,
	) { }

	public getAll(): Promise<any> {
		return this.ApiService
			.GetClients()
			.toPromise()
			.then(rs => {
				if(rs.success) return rs.data;
			});
	}

	public getById(id: string): Promise<any> {
		return this.ApiService
			.GetClient(id)
			.toPromise()
			.then(rs => {
				if(rs.success) return rs.data;
			});
	}

	public save(data: any): Promise<any> {
		data.active = data.active == true ? 1 : 0;
		if (data.id) {
			return this.update(data);
		} else {
			return this.create(data);
		}
	}

	public create(data: any): Promise<any> {
		return this.ApiService
			.CreateClient(data)
			.toPromise()
			.then(rs => {
				return rs;
			});
	}

	public update(data: any): Promise<any> {
		const id = data.id;
		if(!id) return Promise.reject('invalid id');
		return this.ApiService
			.UpdateClient(id, data)
			.toPromise()
			.then(rs => {
				return rs;
			});
	}

}
