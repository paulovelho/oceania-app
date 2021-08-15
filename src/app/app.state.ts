import { Injectable, EventEmitter } from '@angular/core'

@Injectable()
export class AppState {

	private _states: any = {};
	private _events: any = {};

	constructor() {
	}

	private debug(str: string, data?: any) {
		console.info(str, data);
	}

	public emit(event: string, value: any): void {
		this._states[event] = value;
		if(this._events[event]) {
			this.debug('emitting to ' + event, value);
			(<EventEmitter<any>>this._events[event]).emit(value);
		}
	}

	public subscribe(event: string, callback: Function, defaultValue?: any): void {
		this.debug('creating event ' + event);
		if (!this._events[event]) {
			this._events[event] = new EventEmitter<any>();
			this._states[event] = null;
		}
		this._events[event].subscribe(callback);
		if (defaultValue) {
			this.emit(event, defaultValue);
		}
	}

	public getEvents() {
		return this._events;
	}
	public getState(event: string) {
		return this._states[event];
	}
	public getStates() {
		return this._states;
	}


}
