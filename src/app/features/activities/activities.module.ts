import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SharedModule } from '@app/shared.module';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesHomeComponent } from './activities-home/activities-home.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ActivitiesFormComponent } from './activities-form/activities-form.component';

import { ActivitiesApi } from './activities.api';
import { ActivitiesService } from './activities.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MatFormFieldModule,
		MatButtonModule,
		MatInputModule,
		MatCheckboxModule,

		ActivitiesRoutingModule,
		SharedModule,
	],
	declarations: [
		ActivitiesHomeComponent,
		ActivitiesListComponent,
		ActivitiesFormComponent,
	],
	providers: [
		ActivitiesApi,
		ActivitiesService,
	],
	exports: [],
	entryComponents: [
		ActivitiesFormComponent,
	],
})
export class ActivitiesModule { }
