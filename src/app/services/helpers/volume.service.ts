import { Injectable } from "@angular/core";

@Injectable()
export class VolumeService {

	constructor(
	) {}

	public toLiter(literStr): number {
		if(!literStr) return 0;
		literStr = literStr.replace(",", ".").toLowerCase();
		var liter = parseFloat(literStr);
		var l = (literStr.match(/l/g) || []).length;
		var d = (literStr.match(/d/g) || []).length;
		var c = (literStr.match(/c/g) || []).length;
		var m = (literStr.match(/m/g) || []).length;
		if(d > 0) liter = liter * 0.1;
		if(c > 0) liter = liter * 0.01;
		if(m > 0) liter = liter * 0.001;
		if( isNaN(liter) ) return 0;
		return Math.round(liter * 1000) / 1000;
	}

	public toRead(literVal): string {
		if ( isNaN(literVal) || literVal == 0 ) return "-";
		if ( literVal > 1 ) {
			return literVal + " l";
		}
		literVal = literVal*10*100;
		literVal = Math.round(literVal);
		if(literVal % 1000 === 0) {
			return literVal/1000 + " l";
		} else {
			return literVal + " ml";
		}
	}

}
