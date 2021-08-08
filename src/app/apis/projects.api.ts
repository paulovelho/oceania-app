import { Injectable, Injector } from "@angular/core";
import { Observable } from 'rxjs';

import { BaseApi } from './api';

@Injectable()
export class ProjectsApi extends BaseApi {

	constructor(
		injector: Injector
	) {
		super(injector);
		this.base = this.Config.get("api");
		console.info('products base ', this.base);
	}


	public GetProjects(queryStr?: any): Observable<any> {
		let url = this.url("/projects");
		return this.get(url);
	}

	public GetProject(id: string): Observable<any> {
		let url = this.url("/project/:id").params({ id: id });
		return this.get(url);
	}

	public CreateProject(data: any): Observable<any> {
		let url = this.url("/projects");
		return this.post(url, data);
	}

	public UpdateProject(id: string, data: any): Observable<any> {
		let url = this.url("/project/:id").params({ id: id });
		return this.put(url, data);
	}


	// INACTIVE EXAMPLE ENDPOINTS:
	public SearchProjects(queryStr?: any): Observable<any> {
		let url = this.url("/projects/all");
		if(queryStr) url.queryParams(queryStr);
		return this.get(url);
	}

}
