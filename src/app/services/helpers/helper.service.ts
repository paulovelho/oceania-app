import { Injectable } from "@angular/core";

@Injectable()
export class Helper {

	constructor(
	) {}

	private makeString(size: number = 32): string {
		let outString: string = '';
		let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < size; i++) {
			outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
		}
		return outString;
	}

	public RandomString(size?: number): string {
		return this.makeString(size);
	}

}
