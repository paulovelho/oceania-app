import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from '@app/app.state';

import { Store } from '@services/store/store.service';

@Component({
	selector: 'app-navbar',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent {

	public isMenuCollapsed: boolean = false;
	public role: string = "";

	constructor(
		private _state:AppState, 
		private router: Router,
		private Store: Store
	) {
		this.Initialize();
	}

	private Initialize() {
		this.isMenuCollapsed = this._state.getState('menu.isCollapsed');
		this._state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
			this.isMenuCollapsed = isCollapsed;
		});

		this.Store.newLogin.subscribe((u) => {
			this.loadUser(u);
		});
		this.loadUser(this.Store.getLoggedUser());
	}

	private loadUser(user: any): void {
		if(!user) return;
	}

	public closeSubMenus(){
		 /* when using <az-sidebar> instead of <az-menu> uncomment this line */
		// this._sidebarService.closeAllSubMenus();
	}

	public toggleMenu() {
		this.isMenuCollapsed = !this.isMenuCollapsed; 
		this._state.emit('menu.isCollapsed', this.isMenuCollapsed);
	}

	public logout() {
		this.Store.clean();
		this.router.navigate(["login"]);
	}

}
