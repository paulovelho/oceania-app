import { Injectable, Output, EventEmitter } from "@angular/core";

import { AppConfig } from "@app/app.config"
import { ProductsApi } from "@app/apis/products.api";
import { Store } from '@app/services/store/store.service';

import { Packing } from './packing.enum';

@Injectable()
export class ProductsService {

	constructor(
		private ApiService: ProductsApi,
		private Config: AppConfig
	) { }

	public GetPackings(): any {
		return Packing;
	}

	public GetSuppliers(): Promise<any> {
		return this.ApiService
			.GetSuppliers()
			.toPromise()
			.then(rs => rs.data);
	}

	public GetAll(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.ApiService
				.GetActiveProducts()
					.toPromise()
					.then(result => {
						console.info(result);
						if(result.success) {
							let items = result.data;
							resolve(items);
						}
					})
					.catch(err => reject(err));
		});
	}

	public GetById(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.ApiService
				.GetProduct(id)
					.toPromise()
					.then(result => {
						if(result.success) {
							resolve(result.data);
						}
					})
					.catch(err => reject(err));
		});
	}

}
