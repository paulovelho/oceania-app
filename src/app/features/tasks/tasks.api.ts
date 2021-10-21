import { Injectable, Injector } from "@angular/core";
import { Observable } from 'rxjs';

import { BaseApi } from '@services/api/base.api';

@Injectable()
export class TasksApi extends BaseApi {

	constructor(
		injector: Injector
	) {
		super(injector);
		this.base = this.Config.get("api");
	}

	public GetAll(queryStr?: any): Observable<any> {
		let url = this.url("/tasks");
		return this.get(url);
	}

	public GetOne(id: string): Observable<any> {
		let url = this.url("/task/:id").params({ id: id });
		return this.get(url);
	}

	public Create(data: any): Observable<any> {
		let url = this.url("/tasks");
		return this.post(url, data);
	}

	public Update(id: string, data: any): Observable<any> {
		let url = this.url("/task/:id").params({ id: id });
		return this.put(url, data);
	}

	public GetStatus(): Promise<any> {
		let url = this.url('/statuses');
		return this.get(url).toPromise();
	}

	public UpdateStatus(task: number, status: number): Promise<any> {
		let url = this.url('/task/:task/move-to/:status').params({ task, status });
		return this.post(url, null).toPromise();
	}

}
