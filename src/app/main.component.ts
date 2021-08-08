import { Component } from '@angular/core';

import { NavigationService } from '@app/services/navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss'],
})
export class MainComponent {
	public appPages = [];
	constructor(
		private Navigate: NavigationService,
	) {
		this.Initialize();
	}

	public Initialize() {
		this.appPages = [
			{ title: 'Projects', url: '/app/projects', icon: 'rocket' },
		];
	}

}
