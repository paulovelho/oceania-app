import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SharedModule } from '@app/shared.module';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsHomeComponent } from './projects-home/projects-home.component';

import { ProjectsApi } from './projects.api';
import { ProjectsService } from './projects.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,

		ProjectsRoutingModule,
		SharedModule,
	],
	declarations: [
		ProjectListComponent,
		ProjectFormComponent,
		ProjectsHomeComponent
	],
	providers: [
		ProjectsApi,
		ProjectsService,
	],
	exports: [
	],
	entryComponents: [
		ProjectFormComponent,
	]
})
export class ProjectsModule { }
