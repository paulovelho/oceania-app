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

	public GetByStatus(status_id: number): Observable<any> {
		return this.get(this.url("/status/:status_id/tasks").params({ status_id }));
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

	public addBulk(project_id: number, activity_id: number, tasks: string): Observable<any> {
		let url = this.url('/tasks/:project_id/bulk-add').params({ project_id });
		return this.post(url, { tasks, activity: activity_id });
	}

}
