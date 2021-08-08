import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { BasicHeaderComponent } from './basic-header/basic-header.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		BasicHeaderComponent,
		HeaderComponent,
		LoadingComponent,
	],
	providers: [
	],
	exports: [
		BasicHeaderComponent,
		HeaderComponent,
		LoadingComponent,
	]
})
export class SharedModule { }
