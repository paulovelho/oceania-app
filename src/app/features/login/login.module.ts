import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared.module';

import { LoginComponent } from './login.component';

export const routes = [
	{ path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		SharedModule,
	],
	providers: [
	],
	declarations: [ LoginComponent ]
})

export class LoginModule { }
