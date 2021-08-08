import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/projects.module').then( m => m.ProjectsPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.module').then( m => m.UsersPageModule)
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
