import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@services/store/store.service';
import { AppConfig } from '@app/app.config';

@Injectable()
export class NavigationService {

	private pagesUrl: string = "app";

	constructor(
    private router: Router,
		private AppConfig: AppConfig,
		private Store: Store,
	) { }

	private replaceUrlParams(url: string, key: string, value: string): string {
		return url.replace(new RegExp(':' + key, 'g'), value );
	}
	private buildUrl(url: string, params: any): string {
		for(let key in params) {
			let v = params[key];
			url = this.replaceUrlParams(url, key, v);
		}
		return url;
	}

	public getUrl(url: string, params?: any): string {
		if(params) url = this.buildUrl(url, params);
		return url;
	}
	public navigateTo(destination: string, params?: any): void {
		this.router.navigate([...this.getUrl(destination, params).split("/")]);
	}
	public changeUrl(destination: string, params?: any): void {
    window.history.replaceState({}, '', this.pagesUrl + "/" + this.getUrl(destination, params));
	}


	public goToLogin(): void {
		let currentRoute = this.router.url;
		this.Store.clean();
		let queryParams = {};
		if(!currentRoute.startsWith("/login/entrance")) {
			queryParams = { redirect: currentRoute };
		}
		this.router.navigate(["login"], { queryParams });
	}
	public goHome(): void {
		this.navigateTo("app");
	}

}
