import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '@app/shared/shared.module';

import { ProjectsPageRoutingModule } from './projects-routing.module';
import { ProjectsService } from './projects.service';
import { ProjectsPage } from './projects.page';

import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ProjectsPageRoutingModule,
		SharedModule,
	],
	providers: [
		ProjectsService
	],
	declarations: [
		ProjectsPage,
		ProjectListComponent,
		ProjectFormComponent,
	]
})
export class ProjectsPageModule {}
