import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared.module';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsHomeComponent } from './projects-home/projects-home.component';

import { ProjectsApi } from './projects.api';
import { ProjectsService } from './projects.service';
import { ClientsService } from '../clients/clients.service';

@NgModule({
	imports: [
		CommonModule,

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
		ClientsService,
	],
	exports: [
	],
	entryComponents: [
		ProjectFormComponent,
	]
})
export class ProjectsModule { }
