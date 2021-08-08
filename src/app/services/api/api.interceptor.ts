import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { timeout } from 'rxjs/operators';

import { AppConfig } from "@app/app.config";
import { ApiManager } from './api-manager.service';
import { Store } from '@services/store/store.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

	private timeout = 5000 // in ms

	constructor(
		private Manager: ApiManager,
		private Config: AppConfig,
		private Store: Store,
	){ }

	private SetHeaders(req: HttpRequest<any>): HttpRequest<any> {
		let headers = {};
		let token = this.Store.getToken();
		if(token != null) {
			headers["Authorization"] = "Bearer " + token;
		}
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
		console.error("sending error: ", err);
		this.Manager.ErrorManager(err);
		let error = err.error 
								? err.error.data ? err.error.data : err.error
								: err.error;
		return Observable.throw(error);
	}

	private EligibleUrl(url: string): boolean {
		let addTo: string = this.Config.get("api");
		return url.startsWith(addTo);
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let request = req;
		if(this.EligibleUrl(req.url)) {
/*
			if(this.Store.isExpired()) {
				this.Manager.Expired(this.Store.getExpiration());
				return null;
			}
*/
			request = this.SetHeaders(req);
		}
		return next.handle(request)
			.pipe(timeout(this.timeout))
			.map((ev) => this.GetResponse(ev))
			.catch((err) => this.CatchError(err));
	}
}
