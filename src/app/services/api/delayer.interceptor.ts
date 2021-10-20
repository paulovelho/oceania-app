import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { timeout, delay } from 'rxjs/operators';

import { AppConfig } from "@app/app.config";
import { ApiManager } from './api-manager.service';
import { Store } from '@services/store/store.service';

@Injectable()
export class ApiDelayerInterceptor implements HttpInterceptor {

	private on: boolean = true;
	private maxDelay:number = 5000;
	private minDelay:number = 1000;

	constructor(
		private Config: AppConfig,
		private Store: Store,
	){ }

	private DelayThis(url: string): boolean {
		if(!this.on) return false;
		let addTo: string = this.Config.get("api");
		return url.startsWith(addTo);
	}

	private getDelayTime(): number {
		return Math.floor(Math.random() * (this.maxDelay - this.minDelay)) + this.minDelay;
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let request = req;
		if(this.DelayThis(req.url)) {
			const delayFor = this.getDelayTime();
			console.info("delaying request for " + delayFor);
			return next.handle(request).pipe(delay(delayFor));
		}
		return next.handle(request);
	}
}
