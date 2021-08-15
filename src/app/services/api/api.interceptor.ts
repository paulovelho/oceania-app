import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { timeout } from 'rxjs/operators';

import { ApiManager } from './api-manager.service';
import { Store } from '@services/store/store.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

	private timeout = 5000 // in ms

	constructor(
		private Manager: ApiManager,
		private Store: Store
	){ }

	private SetHeaders(req: HttpRequest<any>): HttpRequest<any> {
		let headers = {};
		let token = this.Store.getToken();
		if(token != null)
			headers["Authorization"] = "Bearer " + token;
//    console.info("setting headers to request: ", headers);

		return req.clone({
			setHeaders: headers
		});
	}

	private GetResponse(event: HttpEvent<any>): HttpEvent<any> {
		if(event instanceof HttpResponse) {
			this.Manager.StatusManage(event);
		}
		return event;
	}

	private CatchError(err: any) {
		this.Manager.ErrorManager(err);
		let error = err.error 
								? err.error.data ? err.error.data : err.error
								: err.error;
		return Observable.throw(error);
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let request = this.SetHeaders(req);
		return next.handle(request)
			.pipe(timeout(this.timeout))
			.map((ev) => this.GetResponse(ev))
			.catch((err) => this.CatchError(err));
	}
}
