import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared.module';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientHomeComponent } from './client-home/client-home.component';

import { ClientsApi } from './clients.api';

@NgModule({
	imports: [
		CommonModule,
		ClientsRoutingModule,
		SharedModule,
	],
	declarations: [
		ClientFormComponent,
		ClientListComponent,
		ClientHomeComponent,
	],
	providers: [
		ClientsApi,
	],
})
export class ClientsModule { }
