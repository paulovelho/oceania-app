import { Component, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnChanges { 

	@Input() status: boolean = true;
	@Input() showText: boolean = true;
	@Input() text: string = "";

	public icon: string = "fa-circle";
	public st: string = "";
	public txt: string = "";
	public caption: string = "";

	constructor() {
	}

	private defineStClass(): void {
		if(this.status == undefined || this.status == null) this.st = "undefined";
		else this.st = (this.status ==  true) ? "active" : "inactive";
	}

	private defineText(): void {
		if(this.text) this.txt = this.text;
		else {
			if(this.status == undefined || this.status == null) this.txt = "Inválido";
			else this.txt = (this.status ==  true) ? "Active" : "Inactive";
		}
		if(this.showText == true) this.caption = this.txt; else this.caption = "";
	}

	private Initialize(): void {
		this.defineStClass();
		this.defineText();
	}

	ngOnChanges() {
		this.Initialize();
	}

}
