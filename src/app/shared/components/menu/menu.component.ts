import { Component, OnInit, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute , NavigationEnd } from '@angular/router';
import * as jQuery from 'jquery';
import { MenuService } from './menu.service';
import { AppState } from '@app/app.state';

@Component({
	selector: 'app-menu',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	providers: [ MenuService ]
})

export class MenuComponent implements OnInit {
	public menuItems: Array<any>;
	public isMenuCollapsed: boolean = false;
	public isMenuShouldCollapsed: boolean = true;
	public menuHeight: number = 100;
	public showHoverElem: boolean = true;
	public hoverElemHeight: number = 0;
	public hoverElemTop: number = 0;

	constructor(
		private _elementRef:ElementRef,
		private _router:Router,
		private _activatedRoute:ActivatedRoute,
		private _state: AppState,
		private _menuService:MenuService,
	) {
		
		this.menuItems = _menuService.getMenuItems();
		this._state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
			console.info('menu.isCollapsed', isCollapsed);
			this.isMenuCollapsed = isCollapsed;
		}, this.isMenuCollapsed);

		this._router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
				if(width <= 768){
					this._state.emit('menu.isCollapsed', true);
				}
				window.scrollTo(0, 0);         
			}                
		});      
	}

	public ngOnInit(): void {
		if (this._shouldMenuCollapse()) {
			this.menuCollapse();
		}
		this.updateSidebarHeight();
	}

	@HostListener('window:resize')
	public onWindowResize(): void {
		var isMenuShouldCollapsed = this._shouldMenuCollapse();

		if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
			this.menuCollapseStateChange(isMenuShouldCollapsed);
		}
		this.isMenuShouldCollapsed = isMenuShouldCollapsed;
		this.updateSidebarHeight();
	}

	private _shouldMenuCollapse(): boolean {
		return window.innerWidth <= 768;
	}

	public menuCollapse(): void {
		this.menuCollapseStateChange(true);
	}

	public menuCollapseStateChange(isCollapsed: boolean): void {
		console.info('collapsing menu', isCollapsed);
		this.isMenuCollapsed = isCollapsed;
		this._state.emit('menu.isCollapsed', this.isMenuCollapsed);
	}

	public menuExpand(): void {
		this.menuCollapseStateChange(false);
	}

	public updateSidebarHeight(): void {
	   this.menuHeight =  this._elementRef.nativeElement.children[0].clientHeight - 84;
	}

	public hoverItem($event: any): void {
		this.showHoverElem = true;
		this.hoverElemHeight = $event.currentTarget.clientHeight;
		this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 60;
	}

	public collapseMenu($event: any, item: any): boolean{ 
		var link = jQuery($event.currentTarget); 
		if (this.isMenuCollapsed) {
			this.isMenuCollapsed = false; 
			this._state.emit('menu.isCollapsed', this.isMenuCollapsed);
			if (link.parent().hasClass('sidebar-item-expanded')) {
				return false;
			}
			else{
				link.parent().parent().find('li').removeClass('sidebar-item-expanded');
				link.parent().parent().find('li .sidebar-sublist').slideUp(250);
				link.parent().addClass('sidebar-item-expanded');
				setTimeout(function() {
					link.next().css('display','block');
				},250); 
				link.next().slideDown(250);
			}         
		} else {
			if (link.parent().hasClass('sidebar-item-expanded')) {
				link.parent().removeClass('sidebar-item-expanded');
				link.next().slideUp(250);   
			} else {                     
				link.parent().parent().find('li').removeClass('sidebar-item-expanded');
				link.parent().parent().find('li .sidebar-sublist').slideUp(250);
				link.parent().addClass('sidebar-item-expanded');
				link.next().slideDown(250);
			} 
		}
		return false;
	}

}
