import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
	selector: 'platypus-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit { 

	@Input() type: string | null = null;
	@Input() caption: string | null = null;
	@Input() subcaption: string | null = null;
	@Input() icon: string = "";
	@Input() extraClass: any;
	@Output() action = new EventEmitter<any>();

	public btclass: string[] = [];

	constructor() {
	}

	ngOnInit() {
		this.Initialize();
	}

	private applyCustomClass(): void {
		if(this.extraClass) {
			this.btclass = [].concat( this.extraClass );
		}
	}

	private preFab(): void {
		switch (this.type) {
			case "save":
				this.btclass.push('btn-outline-success');
				this.icon = 'fa-save';
				this.caption = 'Salvar';
				break;
			case "cancel":
				this.btclass.push('btn-outline-danger');
				this.icon = 'fa-times-circle';
				this.caption = 'Cancelar';
				break;
			case "load-more":
				this.caption = 'Carregar mais';
				this.icon = 'fa-plus-square';
				this.btclass.push('btn-outline-primary');
				break;
			case "search":
				this.caption = 'Buscar';
				this.icon = 'fa-search';
				this.btclass.push('btn-secondary');
				this.btclass.push('btn-rounded');
				break;

			// styles:
			case "primary":
				this.btclass.push('btn-primary');
				break;
			case "outline-primary":
				this.btclass.push('btn-outline-primary');
				break;
			case "success":
				this.btclass.push('btn-outline-success');
				break;
			case "danger":
				this.btclass.push('btn-outline-danger');
				break;
			case "primary-outline":
				this.btclass.push('btn-outline-primary');
				break;
			default:
				this.btclass.push('btn-outline-secondary');
				break;
		}
	}

	private Initialize(): void {
		this.applyCustomClass();
		this.preFab();
	}

	public doAction(): void {
		this.action.next();
	}

}
