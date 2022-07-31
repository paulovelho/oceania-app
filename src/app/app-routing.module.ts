import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './shared/layout/main.component';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ 
		path: 'login', 
		loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
	},
	{
		path: 'app',
		component: MainComponent,
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full'
			},
			{
				path: 'activities',
				loadChildren: () => import('./features/activities/activities.module').then(m => m.ActivitiesModule),
			},
			{
				path: 'clients',
				loadChildren: () => import('./features/clients/clients.module').then(m => m.ClientsModule),
			},
			{
				path: 'home',
				loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
			},
			{
				path: 'projects',
				loadChildren: () => import('./features/projects/projects.module').then(m => m.ProjectsModule),
			},
			{
				path: 'tasks',
				loadChildren: () => import('./features/tasks/tasks.module').then(m => m.TasksModule),
			}
		],
	},
	{ path: '**', component: ErrorComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
