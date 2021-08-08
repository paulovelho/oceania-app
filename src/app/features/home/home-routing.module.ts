import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
  	RouterModule.forChild(routes),
  	SharedModule,
  ],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
