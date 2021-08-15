import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import * as jQuery from 'jquery';

import { Location } from '@angular/common';
import { AppState } from '@app/app.state';

@Component({
	selector: 'app-layout-main',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

	public isMenuCollapsed:boolean = true;

	constructor(
		private _state: AppState,
		private _location: Location
	) {
		this.isMenuCollapsed = this._state.getState('menu.isCollapsed');
		this._state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
			this.isMenuCollapsed = isCollapsed;
		});
	}

	ngOnInit() {
		this.getCurrentPageName();
	}

	public getCurrentPageName():void{       
		let url = this._location.path();
		let hash = (window.location.hash) ? '#' : '';    
		setTimeout(function(){
			let subMenu = jQuery('a[href="'+ hash + url + '"]').closest("li").closest("ul");            
			window.scrollTo(0, 0);
			subMenu.closest("li").addClass("sidebar-item-expanded"); 
			subMenu.slideDown(250);    
		});
	}

	public hideMenu():void{
		this._state.emit('menu.isCollapsed', true);    
	}

	public ngAfterViewInit(): void {
	}

}
