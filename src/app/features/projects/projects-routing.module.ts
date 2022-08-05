import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsHomeComponent } from './projects-home/projects-home.component';

const routes: Routes = [
	{
		path: '',
		component: ProjectsHomeComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
