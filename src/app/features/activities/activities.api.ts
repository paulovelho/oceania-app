import { Injectable, Injector } from "@angular/core";
import { Observable } from 'rxjs';

import { BaseApi } from '@services/api/base.api';

@Injectable()
export class ActivitiesApi extends BaseApi {

	constructor(
		injector: Injector
	) {
		super(injector);
		this.base = this.Config.get("api");
	}

	public GetAll(queryStr?: any): Observable<any> {
		let url = this.url("/activities");
		return this.get(url);
	}

	public GetOne(id: string): Observable<any> {
		let url = this.url("/activities/:id").params({ id: id });
		return this.get(url);
	}

	public Create(data: any): Observable<any> {
		let url = this.url("/activities");
		return this.post(url, data);
	}

	public Update(id: string, data: any): Observable<any> {
		let url = this.url("/activity/:id").params({ id: id });
		return this.put(url, data);
	}


}
