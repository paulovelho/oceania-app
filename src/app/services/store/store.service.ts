import { Injectable, Output, EventEmitter } from "@angular/core";

interface User {
	email: string,
	name: string,
	role: string,
	id: string,
};


@Injectable()
export class Store {

	constructor(
	) {
		this.init();
	}

	private init(): void {
	}


	public set(key, value): void {
		localStorage.setItem(key, value);
	}
	public get(key): any {
		return localStorage.getItem(key);
	}
	public getBool(key): boolean {
		let b = localStorage.getItem(key);
		if(b == null) return null;
		return b === 'true';
	}

	public isDark(): boolean {
		return this.getBool("dark-mode");
	}



	public setToken(token: string): void {
		localStorage.setItem("token", token);
	}
	public getToken(): string {
		return localStorage.getItem("token") || null;
	}

	public setExpiration(expire: number): void {
		localStorage.setItem("expires", expire.toString());
	}
	public isExpired(): boolean {
		var ts = Math. round((new Date()). getTime() / 1000);
		let expires = localStorage.getItem("expires");
		return (+expires <= ts);
	}

	/* USER STORE */
	private user: User = null;
	public setUser(u: User): void {
		this.user = u;
		localStorage.setItem("user", JSON.stringify(u))
	}
	public getUser(): any {
		return this.user;
	}

	public isLogged(): boolean {
		let token = this.getToken();
		if(!token) return false; else return true;
	}

	public clean(): void {
		localStorage.removeItem("token");
	}


}
