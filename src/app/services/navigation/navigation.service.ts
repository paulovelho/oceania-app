import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {

	private pagesUrl: string = "app";

	constructor(
    private router: Router
	) { }

	public customerNew(): void {
		this.router.navigate([this.pagesUrl, 'customer', 'new']);
	}
	public customerEdit(id: string): void {
		this.router.navigate([this.pagesUrl, 'customer', id, 'edit']);
	}

	public productNew(): void {
		this.router.navigate([this.pagesUrl, 'product', 'new']);
	}
	public productOpen(id: string): void {
		this.router.navigate([this.pagesUrl, 'product', id, 'view']);
	}

	public supplierNew(): void {
		this.router.navigate([this.pagesUrl, 'supplier', 'new']);
	}
	public supplierOpen(id: string): void {
		this.router.navigate([this.pagesUrl, 'supplier', id, 'view']);
	}

}
