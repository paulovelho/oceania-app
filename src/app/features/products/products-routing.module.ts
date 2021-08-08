import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';
import { ProductsTableComponent } from './products-table/products-table.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
		children: [
			{
				path: '',
				component: ProductsTableComponent,
			}
		]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
