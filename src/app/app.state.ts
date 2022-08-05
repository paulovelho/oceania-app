import { Injectable, EventEmitter } from '@angular/core'

// STATES:
// - filter-updated
// - filter-refresh


@Injectable()
export class AppState {

	private debugOn: boolean = true;

	private _states: any = {};
	private _events: any = {};

	constructor() {
	}

	private debug(str: string, data?: any): void {
		if(!this.debugOn) return;
		console.info('app.state: ' + str, data);
	}

	public emit(event: string, value: any): void {
		this._states[event] = value;
		if(this._events[event]) {
			this.debug('emitting to ' + event, value);
			(<EventEmitter<any>>this._events[event]).emit(value);
		}
	}

	public subscribe(event: string, callback: Function, defaultValue?: any): void {
		this.debug('subscribing to ' + event);
		if (!this._events[event]) {
			this.debug('creating event ' + event);
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
	public getState(event: string): any {
		return this._states[event];
	}
	public getStates() {
		return this._states;
	}


}
