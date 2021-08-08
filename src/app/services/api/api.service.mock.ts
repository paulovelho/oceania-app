import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

class ApiCall {
	public url: string;
	public callType: string;
	public payload: any = null;

	constructor (url: string, callType: string, payload?: any) {
		this.url = url;
		this.callType = callType;
		this.payload = payload || null;
	}
}


@Injectable()
export class ApiServiceMock {

	constructor(
	) {}

	public dataForCall: Array<any> = [];
	public data: any = {};
	public callCount: number = 0;
	public calls: Array<ApiCall> = [];
	public lastCall: ApiCall = null;

	private apiResponse: Observable<any> = Observable.create(observer => {
		let call = this.lastCall.callType + "-" + this.lastCall.url;
		if(this.dataForCall[call]) {
			let response = this.dataForCall[call];
			console.info("mocking special response for "+call);
			observer.next(response);
		} else {
			observer.next(this.data);
		}
		observer.complete();
	});

	public reset(): void {
		this.dataForCall = [];
		this.callCount = 0;
		this.calls = [];
		this.lastCall = null;
	}

	public setData(data: any): this {
		this.data = data;
		return this;
	}
	public setDataForCall(data: any, url: string, method: string): this {
		this.dataForCall[method + "-" + url] = data;
		return this;
	}

	public getApi(url: string, params?: any): Observable<any | null> {
		url = this.removeBaseUrl(url);
		this.lastCall = new ApiCall(url, "GET", params);
		this.calls.push(this.lastCall);
		this.callCount++;
		return this.apiResponse;
	}

	public postApi(url: string, payload: any): Observable<any | null> {
		url = this.removeBaseUrl(url);
		this.lastCall = new ApiCall(url, "POST", payload);
		this.calls.push(this.lastCall);
		this.callCount++;
		return this.apiResponse;
	}

	public putApi(url: string, payload: any): Observable<any | null> {
		url = this.removeBaseUrl(url);
		this.lastCall = new ApiCall(url, "PUT", payload);
		this.calls.push(this.lastCall);
		this.callCount++;
		return this.apiResponse;
	}

	public deleteApi(url: string): Observable<any | null> {
		url = this.removeBaseUrl(url);
		this.lastCall = new ApiCall(url, "DELETE");
		this.calls.push(this.lastCall);
		this.callCount++;
		return this.apiResponse;
	}

	private removeBaseUrl(url: string): string {
		return url.replace("http://api.malte.localhost.com", "");
	}
}
