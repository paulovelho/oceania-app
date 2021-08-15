import { Injectable, Injector } from "@angular/core";
import { Observable } from 'rxjs';

import { AppConfig } from "@app/app.config"
import { ApiService } from "@services/api/api.service";


class UrlBuilder {
	private base: string = "";
	private endpoint: string;
	private url: string;

	constructor(base: string, endpoint: string) {
		this.base = base;
		this.endpoint = endpoint;
		this.url = this.base + endpoint;
	}

	private replaceUrlParams(url: string, key: string, value: string): string {
		return url.replace(new RegExp(':' + key, 'g'), value );
	}

	public params(data: any): this {
		for(let key in data) {
			let v = data[key];
			this.url = this.replaceUrlParams(this.url, key, v);
		}
		return this;
	}

	public queryParams(data: any): this {
		let query = [];
		for(let key in data) {
			query.push(key+"="+data[key]);
		}
		this.url += "?" + query.join("&");
		return this;		
	}

	public get(): string { return this.url; }
	public toString(): string { return this.url; }

}


@Injectable()
export class BaseApi {

	protected Config: AppConfig;
	protected ApiService: ApiService;
	protected base: string = "";

	constructor(
		injector: Injector
	) {
		this.Config = injector.get(AppConfig);
		this.ApiService = injector.get(ApiService);
	}

	public setBase(url: string) {
		this.base = url;
	}

	public url(endpoint: string): UrlBuilder {
		let urlB = new UrlBuilder(this.base, endpoint);
		return urlB;
	}
	public createUrl(url: string): UrlBuilder {
		return new UrlBuilder("", url);
	}

	protected get(url: UrlBuilder): Observable<any> {
		return this.ApiService
			.getApi(url.get());
	}
	protected post(url: UrlBuilder, data: any): Observable<any> {
		return this.ApiService
			.postApi(url.get(), data);
	}
	protected put(url: UrlBuilder, data:any): Observable<any> {
		return this.ApiService
			.putApi(url.get(), data);
	}
	protected del(url: UrlBuilder): Observable<any> {
		return this.ApiService
			.deleteApi(url.get());
	}
	protected upload(url: UrlBuilder, payload: any): Observable<any> {
		return this.ApiService
			.uploadApi(url.get(), payload);
	}


}