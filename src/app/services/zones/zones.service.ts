import { Injectable } from "@angular/core";

@Injectable()
export class Zones {

	constructor(
	) {}

	public GetArray(): Array<string> {
		return ["NORTE", "SUL", "LESTE", "OESTE", "CENTRO", "INTERIOR", "ABC"];
	}

}
