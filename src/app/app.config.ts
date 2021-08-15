import { Injectable } from '@angular/core';

import { Store } from '@app/services/store/store.service';
import { EnvironmentConfig } from '../environments/interface';
import { environment } from '../environments/environment';

@Injectable()
export class AppConfig {

  private envName: string;
  private env: EnvironmentConfig | any;

	config:any;

	constructor(
    private Store: Store
	){
    this.env = <EnvironmentConfig> environment;
    this.envName = this.env.envName;
		this.config = this.getMainConfig();
	}

	getMainConfig(): any {
		return {
			name: 'Oceania',
			title: 'Task Controller',
			pageTitle: "Oceania Task Controller",
			version: '1.0.0',
		};
	}

	public getEnv(): string {
	  return this.envName;
	}
	public get(key: string): any {
	  return this.env[key];
	}

	public load(): AppConfig {
		if(!environment) {
			throw new Error("Environment not available ");
		}
		return this;
	}

	public getTitle(): string {
		return this.getMainConfig().title;
	}


	private replaceUrlParams(url: string, key: string, value: string): string {
		return url.replace(new RegExp(':' + key, 'g'), value );
	}
	public getApi(key: string, param?: any): string {
		let endpoint = this.env.api;
		if(param) {
			for(let key in param) {
				let v = param[key];
				endpoint = this.replaceUrlParams(endpoint, key, v);
			}
		}
		return this.get("api") + endpoint;
	}

}
