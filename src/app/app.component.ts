import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { AppConfig } from './app.config';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template:`<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit { 

	constructor(
		private Config: AppConfig,
	) {
		this.loadConfig();
	}
	
	ngAfterViewInit(): void {
	}

	private loadConfig(): void {
		this.Config.load();
	}

}
