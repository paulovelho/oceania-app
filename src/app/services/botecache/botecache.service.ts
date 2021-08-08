import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export default class Botecache {

	private data = {};
	private functions = {};
	private calls = {};

	constructor(
	) {}

	private init(): void { }

	public debug(key:string = null) {
		if(key) {
			console.info("botecache data for " + key, {
				data: this.data[key],
				functions: this.functions[key],
				calls: this.calls[key],
			});
		} else {
			console.info("botecache data", {
				data: this.data,
				functions: this.functions,
				calls: this.calls,
			});
		}
	}

	public async cache(key, fn): Promise<any> {
		if(!this.calls[key]) {
			let response = await fn();
			this.calls[key] = new Date().getTime();
			this.functions[key] = fn;
			this.data[key] = response;
		}
		return this.data[key];
	}

	public get(key) {
		return {
			time: this.calls[key],
			data: this.data[key],
		};
	}

	public clear(key) {
		this.calls[key] = 0;
		this.functions[key] = null;
		this.data[key] = null;
	}

	public async refresh(key): Promise<any> {
		if(this.functions[key]) {
			return this.cache(key, this.functions[key]);
		}
		return false;
	}

}
