import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProductsService } from './service';

import { SharedModule } from '@app/shared/shared.module';

import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductsPage } from './products.page';
import { ProductsTableComponent } from './products-table/products-table.component';
import { SelectSupplierComponent } from './select-supplier/select-supplier.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ProductsPageRoutingModule,

		SharedModule,
	],
	declarations: [
		ProductsPage,
		ProductsTableComponent,
		SelectSupplierComponent,
	],
	providers: [
		ProductsService,
	],
})
export class ProductsPageModule {}
