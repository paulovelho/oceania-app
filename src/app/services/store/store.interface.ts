export interface IStore {
	set(key: string, value: any): Promise<any>;
	get(key: string): Promise<any>;
	remove(key: string): Promise<any>;
	clean(): Promise<any> | void;

	setToken(token: string): any;
	getToken(): Promise<any | string>;
	setExpiration(expire: number): Promise<any> | void;
	isExpired(): Promise<boolean>;
}


export interface User {
	email: string,
	name: string,
	role: string,
	id: string,
};

