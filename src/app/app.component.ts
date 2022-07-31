import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { AppConfig } from './app.config';

import { Store } from './services/store/store.service';
import { Toaster } from './services/toaster/toaster.service';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template:`<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit { 

	constructor(
		private Config: AppConfig,
		private Store: Store,
		private Toaster: Toaster
	) {
		this.loadConfig();
	}
	
	ngAfterViewInit(): void {
		this.hideLoading();
	}

	private hideLoading(): void {
		const loader = document.getElementById('preloader');
		if(!loader) return;
		loader.style['display'] = 'none';
	}

	private loadConfig(): void {
		this.Config.load();
	}

}
