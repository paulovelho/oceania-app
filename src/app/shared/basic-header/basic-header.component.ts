import { Component, Input, OnInit } from '@angular/core';

import ThemeService from '@app/services/theme.service';

@Component({
	selector: 'app-basic-header',
	templateUrl: './basic-header.component.html',
	styleUrls: ['./basic-header.component.scss'],
})
export class BasicHeaderComponent implements OnInit {

	@Input() title: string;
	@Input() menuBtn: boolean = true;
	@Input() extraClass: Array<string> = [];
	public logo: string;

	constructor(
		private Theme: ThemeService,
	) { }

	ngOnInit() {
		this.logo = this.Theme.logo;
		this.Theme.changeTheme.subscribe(data => this.logo = data.logo);
	}

}
