import { Injectable, Injector } from "@angular/core";
import { Observable } from 'rxjs';

import { BaseApi } from '@services/api/base.api';

@Injectable()
export class ClientsApi extends BaseApi {

	constructor(
		injector: Injector
	) {
		super(injector);
		this.base = this.Config.get("api");
	}


	public GetClients(): Observable<any> {
		let url = this.url("/clients");
		return this.get(url);
	}

	public GetClient(id: string): Observable<any> {
		let url = this.url("/client/:id").params({ id: id });
		return this.get(url);
	}

	public CreateClient(data: any): Observable<any> {
		let url = this.url("/clients");
		return this.post(url, data);
	}

	public UpdateClient(id: string, data: any): Observable<any> {
		let url = this.url("/client/:id").params({ id: id });
		return this.put(url, data);
	}

}
