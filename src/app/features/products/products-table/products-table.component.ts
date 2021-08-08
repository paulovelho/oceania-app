import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../service';
import { ApiService } from "@app/services/api/api.service";

@Component({
	selector: 'app-products-table',
	templateUrl: './products-table.component.html',
	styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {

	constructor(
		private Service: ProductsService,
	) { }

	ngOnInit() {
		this.loadProducts();
	}

	private loadProducts() {
		this.Service.GetAll()
			.then(data => {
				console.info(data);
			});
	}

}
